import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RestService } from '../../services/rest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { Enumerados } from 'src/app/config/Enumerados';
import { SesionService } from 'src/app/services/sesionService/sesion.service';
import { PostModel } from 'src/app/model/post-model';
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { FileUpload } from 'primeng/fileupload';

declare var $: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [RestService, MessageService]
})
export class TimelineComponent implements OnInit {
  @ViewChild('fileInputRegister') fileInputRegister: FileUpload;

  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  usuarioAutorTBLogin: UsuarioAutorModel;
  listadoPostsCompleto: any;
  listaPosts: PostModel[];
  listaPostsMenosPopulares: PostModel[];

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enums: Enumerados, public sesionService: SesionService, private messageService: MessageService, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
  }
  
  ngOnInit() {
    console.clear();
    this.listaPosts = [];
    this.listaPostsMenosPopulares = [];
    if (this.sesionService.existeSession()) {
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
    } else {
      this.sesionService.tomarSessionDeStorage();
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
      if (this.usuarioAutorTBLogin === null) {
        this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
      }
    }
    this.cargarPost();
    this.buscarPostsMenosPopulares();
  }

  // Otras Funciones
  convertirFecha(fechaString) {
    let fechaFormateada = '';
    if (fechaString !== undefined && fechaString !== null && fechaString.length > 0) {
      let fecha = new Date(fechaString);
      fechaFormateada = fecha.getDate() + " " + this.objectModelInitializer.getLocaleESForCalendar().monthNamesShort[fecha.getMonth()] + " | " + fecha.getHours() + ":" + fecha.getMinutes();;
    }

    return fechaFormateada;
  }

  posicionarArriba() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  obtenerCategoria(valorCategoria) {
    try {
      return this.util.getValorEnumerado(this.enums.getEnumerados().categoriaPost.valores, valorCategoria).label;
    } catch (e) {
      console.log(e);
    }
  }

  simularClickPorId(id) {
    $('#' + id)[0].click();
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

  verPost(post: PostModel) {
    if (this.esUsuarioLogueadoActivo()) {
      this.eutanasiaService.post = post;
      this.router.navigate(['blog/' + post.id]);
    } else {
      this.messageService.clear();
      this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mensaje_debe_ser_usuario_logueado });
    }
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

  // Modales

  // Servicios Web
  cargarPost() {
    this.listadoPostsCompleto = 0;
    let obj = this.objectModelInitializer.getDataPostModel();
    try {
      this.restService.postREST(this.const.urlConsultarPostsPorFiltros, obj)
        .subscribe(resp => {
          let listaTemporal: PostModel[] = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            this.listaPosts = listaTemporal;
            this.listadoPostsCompleto = listaTemporal.length;
            this.posicionarArriba();
          }
        },
          error => {
            console.log(error, "error");
            this.router.navigate(['home']);
          })
    } catch (e) {
      console.log(e);
    }
  }

  buscarPostsMenosPopulares() {
    try {
      this.restService.getREST(this.const.urlConsultarPostsPopulares)
        .subscribe(resp => {
          let listaTemporal = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            this.listaPostsMenosPopulares = listaTemporal.length > 3 ? listaTemporal.slice(listaTemporal.length - 3) : listaTemporal;
          }
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

}
