import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ArchivoModel } from 'src/app/model/archivo-model';
import { PostModel } from 'src/app/model/post-model';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [RestService, MessageService]
})
export class PostComponent implements OnInit {
  @ViewChild('fileInputPost') fileInputPost: FileUpload;

  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  listPostTB: PostModel[];
  postTB: PostModel;
  postFiltroTB: PostModel;
  tagsEdicion: string[];
  archivosTemporales: any[];
  archivoImagenPost: ArchivoModel;
  mostrarImagenPost: boolean;
  srcImagenPost: any;
  crearPost: boolean;
  activeIndex: number;
  onlyConsulta: boolean;

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();
  enumCategoria: any[];
  listaCabeceras = [
    { 'campoLista': 'titulo', 'nombreCabecera': 'Nombre Post' },
    { 'campoLista': 'subtitulo', 'nombreCabecera': 'Subtítulo Post' }
  ];

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enums: Enumerados, public sesionService: SesionService, private messageService: MessageService, private sanitizer: DomSanitizer, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
  }

  ngOnInit() {
    console.clear();
    this.cargarEnumerados();
    this.activeIndex = 0;
    this.onlyConsulta = true;
    if (!this.esUsuarioLogueadoActivo()) {
      this.router.navigate(['home/']);
    } else if (this.sesionService.getUsuarioSesionActual().rol !== 1) {
      this.router.navigate(['home/']);
    }
    this.archivosTemporales = [];
    this.crearPost = true;
    this.postFiltroTB = this.objectModelInitializer.getDataPostModel();
    this.postTB = null;
    this.cargarPost();
  }

  // Otras Funciones
  cargarEnumerados() {
    let enums = this.enums.getEnumerados();
    this.enumCategoria = enums.categoriaPost.valores;
  }

  posicionarArriba() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  irCrear() {
    this.onlyConsulta = false;
    this.activeIndex = 1;
    this.mostrarImagenPost = false;
    this.postTB = this.objectModelInitializer.getDataPostModel();
    this.postTB.usuarioAutorTB = this.sesionService.getUsuarioSesionActual();
    this.postTB.categoria = { value: 0, label: this.sesionService.msg.lbl_enum_generico_valor_vacio };
    this.crearPost = true;
  }

  esUsuarioLogueadoActivo() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    let valorEstadoActivo = this.util.getValorEnumerado(this.enums.getEnumerados().estadoUsuario.valores, 1);
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.estado === valorEstadoActivo.value && usuarioSession.id > 0) {
      result = true;
    }

    return result;
  }

  editar(postTB: PostModel) {
    this.onlyConsulta = false;
    this.activeIndex = 1;
    this.mostrarImagenPost = true;
    this.srcImagenPost = '';
    this.crearPost = false;
    this.postTB = postTB;
    this.postTB.categoria = this.util.getValorEnumerado(this.enumCategoria, this.postTB.categoria);
    this.tagsEdicion = this.postTB.tags.split(";");
  }

  startUpload() {
    $('input[type=file]').click();
  }

  handlerUpload(event) {
    //event.files == files to upload
    for (let file of event.files) {
      this.archivosTemporales.push(file);
    }

    let archivoTemp = this.archivosTemporales[0];
    this.archivoImagenPost = this.objectModelInitializer.getDataArchivoDtoModel();
    let reader = new FileReader();
    reader.readAsDataURL(archivoTemp);
    reader.onloadend = () => {
      // base64data      
      this.archivoImagenPost.archivo = reader.result.toString().split('base64,')[1];
      this.archivoImagenPost.nombreArchivo = archivoTemp.name;
      this.subirImagen(this.archivoImagenPost);
    }
  }

  limpiarAdjuntos(event) {
    this.mostrarImagenPost = false;
    this.fileInputPost.clear();
    this.archivoImagenPost = this.objectModelInitializer.getDataArchivoDtoModel();
    this.archivosTemporales = [];
  }

  sanitizarUrlImgCargada(bytesArray: any, tipoArchivo) {
    if (tipoArchivo === 'svg') {
      this.srcImagenPost = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + bytesArray);
    } else {
      tipoArchivo = tipoArchivo + ';base64,';
      this.srcImagenPost = 'data:image/' + tipoArchivo + bytesArray;
    }
  }

  obtenerArchivoSanitizadoDeMapa(llaveRuta) {
    let srcResponse = null;
    if (llaveRuta !== undefined && llaveRuta !== null && this.sesionService.mapaArchivosUser !== undefined && this.sesionService.mapaArchivosUser !== null) {
      let archivo = this.sesionService.mapaArchivosUser.get(llaveRuta);
      if (archivo !== undefined && archivo !== null) {
        let tipoArchivo = archivo.nombreArchivo.split(".")[1];
        if (tipoArchivo === 'svg') {
          srcResponse = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + archivo.archivo);
        } else {
          tipoArchivo = tipoArchivo + ';base64,';
          srcResponse = 'data:image/' + tipoArchivo + archivo.archivo;
        }
      }
    }

    return srcResponse;
  }

  // Servicios Web
  cargarPost() {
    this.listPostTB = [];
    try {
      this.restService.postREST(this.const.urlConsultarPostsPorFiltros, this.postFiltroTB)
        .subscribe(resp => {
          let listaTemporal: PostModel[] = JSON.parse(JSON.stringify(resp));
          this.listPostTB = listaTemporal;
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  subirImagen(fileGuardar: ArchivoModel) {
    try {
      this.limpiarAdjuntos(null);
      fileGuardar.destinoArchivo = 1;
      this.restService.postREST(this.const.urlSubirImagen, fileGuardar)
        .subscribe(resp => {
          let respuesta: ArchivoModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Cargar Modal exitoso
            this.mostrarImagenPost = true;
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_mensaje_archivo_subido });
            this.archivoImagenPost = respuesta;
            this.sanitizarUrlImgCargada(this.archivoImagenPost.archivo, this.archivoImagenPost.nombreArchivo.split(".")[1]);

            // Volver a cargar mapa de imágenes
            this.sesionService.obtenerArchivos();
          }
        },
          error => {
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.sesionService.msg.lbl_summary_danger);
            this.messageService.clear();
            listaMensajes.forEach(mensaje => {
              this.messageService.add(mensaje);
            });

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  crearActualizarPost(crear: boolean) {
    try {
      // Conversiones de datos
      if (this.tagsEdicion !== undefined && this.tagsEdicion !== null && this.tagsEdicion.length > 0) {
        this.tagsEdicion.forEach(tag => {
          this.postTB.tags = this.postTB.tags + tag + ";";
        });
      }
      if (this.archivoImagenPost !== undefined && this.archivoImagenPost !== null && this.archivoImagenPost.rutaArchivo !== undefined && this.archivoImagenPost.rutaArchivo !== null) {
        this.postTB.urlImagen = this.archivoImagenPost.rutaArchivo;
      } else {
        this.postTB.urlImagen = '';
      }
      this.postTB.categoria = this.postTB.categoria.value;
      this.restService.postREST(crear ? this.const.urlCrearPosts : this.const.urlModificarPosts, this.postTB)
        .subscribe(resp => {
          let respuesta: PostModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Recargar página y enviar a crear post
            this.mostrarImagenPost = true;
            this.cargarPost();
            this.irCrear();
            this.posicionarArriba();
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_info_proceso_completo });
          }
        },
          error => {
            this.postTB.categoria = this.util.getValorEnumerado(this.enumCategoria, this.postTB.categoria);
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.sesionService.msg.lbl_summary_danger);
            this.messageService.clear();
            listaMensajes.forEach(mensaje => {
              this.messageService.add(mensaje);
            });

            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

}
