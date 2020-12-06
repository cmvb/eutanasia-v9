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
  styleUrls: ['./post.component.scss']
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
  mapaArchivosUser: any;
  activeIndex: number;
  onlyConsulta: boolean;

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();
  enums: any;
  selectedState: any;
  listaCabeceras = [
    { 'campoLista': 'titulo', 'nombreCabecera': 'Nombre Post' },
    { 'campoLista': 'subtitulo', 'nombreCabecera': 'Subtítulo Post' }
  ];

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, private sanitizer: DomSanitizer, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
    this.enums = enumerados.getEnumerados();
  }

  ngOnInit() {
    console.clear();
    this.activeIndex = 0;
    this.onlyConsulta = true;
    if (!this.esUsuarioLogueadoActivo()) {
      
      this.router.navigate(['home/']);
    }
    if (this.sesionService.mapaArchivosUser === undefined || this.sesionService.mapaArchivosUser === null || this.sesionService.mapaArchivosUser.size === 0) {
      this.sesionService.mapaArchivosUser = new Map();
      this.obtenerArchivos();
    }
    this.archivosTemporales = [];
    this.crearPost = true;
    this.postFiltroTB = this.objectModelInitializer.getDataPostModel();
    this.postTB = null;
    this.cargarPost();
  }

  // Otras Funciones
  irCrear() {
    this.onlyConsulta = false;
    this.activeIndex = 1;
    this.mostrarImagenPost = false;
    this.postTB = this.objectModelInitializer.getDataPostModel();
    this.postTB.usuarioAutorTB = this.sesionService.getUsuarioSesionActual();
    this.crearPost = true;
  }

  esUsuarioLogueadoActivo() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    let valorEstadoActivo = this.util.getValorEnumerado(this.enums.estadoUsuario.valores, 1);
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.estado === valorEstadoActivo.value) {
      result = true;
    }

    return result;
  }

  editar(postTB: PostModel) {
    this.onlyConsulta = false;
    this.activeIndex = 1;
    this.mostrarImagenPost = true;
    this.crearPost = false;
    this.postTB = postTB;
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
    if (llaveRuta !== undefined && llaveRuta !== null && this.mapaArchivosUser !== undefined && this.mapaArchivosUser !== null) {
      let archivo = this.mapaArchivosUser.get(llaveRuta);
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

      this.restService.postREST(crear ? this.const.urlCrearPosts : this.const.urlModificarPosts, this.postTB)
        .subscribe(resp => {
          let respuesta: PostModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Ocultar modal de registro y llenar en memoria el usuario en sesion
            this.mostrarImagenPost = true;
            this.cargarPost();
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_info_proceso_completo });
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

  obtenerArchivos() {
    try {
      let archivo = this.objectModelInitializer.getDataArchivoDtoModel();
      archivo.rutaArchivo = '/data/desplieguesQA/EAP-C7/dist-angular/SFTP-Archivos/users/';
      this.restService.postREST(this.const.urlObtenerArchivos, archivo)
        .subscribe(resp => {
          this.mapaArchivosUser = new Map();
          let listaTemporal: ArchivoModel[] = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            listaTemporal.forEach(archivo => {
              if (!this.mapaArchivosUser.has(archivo.rutaArchivo + archivo.nombreArchivo)) {
                this.mapaArchivosUser.set(archivo.rutaArchivo + archivo.nombreArchivo, archivo);
              }
            });
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

}
