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
import { ComentarioModel } from 'src/app/model/comentario-model';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { FileUpload } from 'primeng/fileupload';
import { PostMeGustaDTOModel } from 'src/app/model/dto/postMeGusta-dto';
import { MeGustaModel } from 'src/app/model/meGusta-model';

declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [RestService, MessageService]
})
export class BlogComponent implements OnInit {
  @ViewChild('fileInputRegister') fileInputRegister: FileUpload;

  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  post: PostModel;
  listaTags: any[];
  listaComentarios: ComentarioModel[];
  mapaComentarios: any;
  comentarioNuevo: any;
  respuestaNueva: any;
  usuarioAutorTBLogin: UsuarioAutorModel;
  postMeGustaDTO: PostMeGustaDTOModel;
  meGustaTB: MeGustaModel;

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
    this.enums = enumerados.getEnumerados();
  }

  ngOnInit() {
    console.clear();
    if (this.sesionService.existeSession()) {
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
    } else {
      this.sesionService.tomarSessionDeStorage();
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
      if (this.usuarioAutorTBLogin === null) {
        this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
      }
    }
    this.meGustaTB = this.objectModelInitializer.getDataMeGustaModel();
    this.post = this.objectModelInitializer.getDataPostModel();
    this.comentarioNuevo = '';
    this.respuestaNueva = '';
    this.listaComentarios = [];
    this.mapaComentarios = new Map();
    this.cargarPost();
    this.cargarCalificacionMG();
  }

  ngDoCheck(): void {
    if (this.post.id !== this.eutanasiaService.post.id) {
      this.post = this.eutanasiaService.post;
      this.meGustaTB = this.objectModelInitializer.getDataMeGustaModel();
      this.post = this.objectModelInitializer.getDataPostModel();
      this.comentarioNuevo = '';
      this.respuestaNueva = '';
      this.listaComentarios = [];
      this.cargarPost();
      this.cargarCalificacionMG();
    }
  }

  // Otras Funciones
  convertirFechaBlog(fechaString) {
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

  obtenerRespuestas(comentario: ComentarioModel) {
    return this.mapaComentarios.get(comentario.id);
  }

  obtenerCategoria(valorCategoria) {
    try {
      return this.util.getValorEnumerado(this.enums.categoriaPost.valores, valorCategoria).label;
    } catch (e) {
      console.log(e);
    }
  }

  toggleRespuesta(idComentario) {
    $('#comment' + idComentario).toggleClass('displayNone');
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

  seleccionarMeGusta() {
    if (this.postMeGustaDTO !== undefined && this.postMeGustaDTO !== null && this.postMeGustaDTO.listaMeGusta !== undefined && this.postMeGustaDTO.listaMeGusta !== null) {
      this.postMeGustaDTO.listaMeGusta.forEach(meGusta => {
        if (meGusta.usuarioAutorTB.id === this.usuarioAutorTBLogin.id) {
          this.meGustaTB = meGusta;
        }
      });
    }
  }

  // Modales

  // Servicios Web

  cargarComentarios() {
    try {
      this.restService.postREST(this.const.urlConsultarComentariosPorIdPost, this.post)
        .subscribe(resp => {
          let listaTemporal = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            this.listaComentarios = [];
            this.mapaComentarios = new Map();
            listaTemporal.forEach(comentario => {
              if (this.mapaComentarios.size === 0) {
                this.mapaComentarios.set(comentario.id, []);
                this.listaComentarios.push(comentario);
              } else {
                if (comentario.idComentarioRespuesta > 0 && this.mapaComentarios.has(comentario.idComentarioRespuesta)) {
                  this.mapaComentarios.get(comentario.idComentarioRespuesta).push(comentario);
                } else {
                  this.mapaComentarios.set(comentario.id, []);
                  this.listaComentarios.push(comentario);
                }
              }
            });
          }
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  crearComentario() {
    try {
      let comentarioNuevo: ComentarioModel = this.objectModelInitializer.getDataComentarioModel();
      comentarioNuevo.comentario = this.comentarioNuevo;
      comentarioNuevo.postTB = this.post;
      comentarioNuevo.usuarioAutorTB = this.usuarioAutorTBLogin;
      this.restService.postREST(this.const.urlCrearComentario, comentarioNuevo)
        .subscribe(resp => {
          let respuesta: ComentarioModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar comentarios de nuevo
            this.comentarioNuevo = '';
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_info_proceso_completo });

            this.ngOnInit();
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

  responderComentario(idComentario: number) {
    try {
      let comentarioNuevo: ComentarioModel = this.objectModelInitializer.getDataComentarioModel();
      comentarioNuevo.comentario = this.respuestaNueva;
      comentarioNuevo.postTB = this.post;
      comentarioNuevo.usuarioAutorTB = this.usuarioAutorTBLogin;
      comentarioNuevo.idComentarioRespuesta = idComentario;
      this.restService.postREST(this.const.urlCrearComentario, comentarioNuevo)
        .subscribe(resp => {
          let respuesta: ComentarioModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso y consultar comentarios de nuevo
            this.respuestaNueva = '';
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_info_proceso_completo });

            this.ngOnInit();
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

  cargarPost() {
    let urlSeg = location.href.split("/");
    let urlIdPost = urlSeg[urlSeg.length - 1];
    let idPostDES = this.util.transformarSimboloUri(urlIdPost, this.util.cargarMatrizPorcentajeUri());
    let obj = this.objectModelInitializer.getDataPostModel();
    obj.id = idPostDES;
    try {
      this.restService.postREST(this.const.urlConsultarPostsPorFiltros, obj)
        .subscribe(resp => {
          let listaTemporal: PostModel[] = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            this.eutanasiaService.post = listaTemporal[0];
            this.post = this.eutanasiaService.post;
            this.listaTags = this.post.tags.split(';');
            this.cargarComentarios();
            this.posicionarArriba();
          }
          else {

            this.router.navigate(['timeline']);
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

  cargarCalificacionMG() {
    let urlSeg = location.href.split("/");
    let urlIdPost = urlSeg[urlSeg.length - 1];
    let idPostDES = this.util.transformarSimboloUri(urlIdPost, this.util.cargarMatrizPorcentajeUri());
    let obj = this.objectModelInitializer.getDataPostModel();
    obj.id = idPostDES;
    try {
      this.restService.postREST(this.const.urlConsultarCalificacionMG, obj)
        .subscribe(resp => {
          let respuesta: PostMeGustaDTOModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== undefined && respuesta !== null) {
            this.postMeGustaDTO = respuesta;
            this.seleccionarMeGusta();
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

  calificarMG(event) {
    let flagCrear = this.meGustaTB.id === 0;
    if (flagCrear) {
      this.meGustaTB.postTB = this.post
      this.meGustaTB.usuarioAutorTB = this.usuarioAutorTBLogin;
    }
    try {
      this.restService.postREST(flagCrear ? this.const.urlCrearMeGusta : this.const.urlModificarMeGusta, this.meGustaTB)
        .subscribe(resp => {
          let respuesta: MeGustaModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== undefined && respuesta !== null) {
            this.ngOnInit();
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
