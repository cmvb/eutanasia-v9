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
import { ArchivoModel } from 'src/app/model/archivo-model';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { FileUpload } from 'primeng/fileupload';

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
  usuarioAutorTBRegister: UsuarioAutorModel;
  archivosTemporales: any[];
  archivoImagenRegister: ArchivoModel;
  showMenuMovil: boolean;
  disModLogin: boolean;
  disModRegistrar: boolean;
  repeatPassword: any;
  mostrarImagenRegister: boolean;
  srcImagenRegister: any;
  loginRestaurar: boolean;
  mapaArchivosUser: any;
  esRegistro: boolean;

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
    this.mapaArchivosUser = new Map();
    this.obtenerArchivos();
    this.archivosTemporales = [];
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    if (this.sesionService.existeSession()) {
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
    } else {
      this.sesionService.tomarSessionDeStorage();
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
      if (this.usuarioAutorTBLogin === null) {
        this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
      }
    }
    console.log("ESTO: " + JSON.stringify(this.usuarioAutorTBLogin));
    if (!this.esUsuarioLogueadoActivoBlog()) {
      this.abrirModalLogin();
    }
    this.post = this.objectModelInitializer.getDataPostModel();
    this.comentarioNuevo = '';
    this.respuestaNueva = '';
    this.listaComentarios = [];
    this.cargarPost();
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

  redirigirBlogsBlog() {
    this.router.navigate(['blogs']);
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

  mostrarOcultarMenuBlog() {
    this.showMenuMovil = !this.showMenuMovil;
  }

  esUsuarioLogueadoActivoBlog() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    let valorEstadoActivo = this.util.getValorEnumerado(this.enums.estadoUsuario.valores, 1);
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.estado === valorEstadoActivo.value) {
      result = true;
    }

    return result;
  }

  cerrarSesionBlog() {
    this.limpiarModales(null);
    this.sesionService.cerrarSession();
    this.sesionService.objServiceSesion = this.objectModelInitializer.getDataServiceSesion();
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.router.navigate(['home']);
  }

  limpiarModales(event) {
    this.disModLogin = false;
    this.disModRegistrar = false;
  }

  toggleRespuesta(idComentario) {
    $('#comment' + idComentario).toggleClass('displayNone');
  }

  simularClickPorId(id) {
    $('#' + id)[0].click();
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
    this.archivoImagenRegister = this.objectModelInitializer.getDataArchivoDtoModel();
    let reader = new FileReader();
    reader.readAsDataURL(archivoTemp);
    reader.onloadend = () => {
      // base64data      
      this.archivoImagenRegister.archivo = reader.result.toString().split('base64,')[1];
      this.archivoImagenRegister.nombreArchivo = archivoTemp.name;
      this.subirImagen(this.archivoImagenRegister);
    }
  }

  limpiarAdjuntos(event) {
    this.mostrarImagenRegister = false;
    this.fileInputRegister.clear();
    this.archivoImagenRegister = this.objectModelInitializer.getDataArchivoDtoModel();
    this.archivosTemporales = [];
  }

  sanitizarUrlImgCargada(bytesArray: any, tipoArchivo) {
    if (tipoArchivo === 'svg') {
      this.srcImagenRegister = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + bytesArray);
    } else {
      tipoArchivo = tipoArchivo + ';base64,';
      this.srcImagenRegister = 'data:image/' + tipoArchivo + bytesArray;
    }
  }

  // Modales

  abrirModalUpdateUserBlog() {
    //this.disModUpdateUser = true;
  }

  abrirModalLogin() {
    this.messageService.clear();
    this.disModLogin = true;
  }

  toggleRestaurarLogin() {
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.loginRestaurar = !this.loginRestaurar;
  }

  abrirModalRegister() {
    this.esRegistro = true;
    this.messageService.clear();
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.disModRegistrar = true;
  }

  abrirModalUpdateUser() {
    this.esRegistro = false;
    this.messageService.clear();
    this.srcImagenRegister = '';
    this.usuarioAutorTBRegister = this.usuarioAutorTBLogin;
    this.usuarioAutorTBRegister.password = '';
    this.usuarioAutorTBRegister.fechaNacimiento = new Date(this.usuarioAutorTBRegister.fechaNacimiento);
    this.disModRegistrar = true;
    this.mostrarImagenRegister = true;
  }

  // Servicios Web

  cargarComentarios() {
    this.listaComentarios = [];
    this.mapaComentarios = new Map();
    try {
      this.restService.postREST(this.const.urlConsultarComentariosPorIdPost, this.post)
        .subscribe(resp => {
          let listaTemporal = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
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
            this.cargarComentarios();
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
            this.cargarComentarios();
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

  cargarPost() {
    let listaPosts = [];
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
            // TODO: redirección a timeline
            this.router.navigate(['home']);
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

  subirImagen(fileGuardar: ArchivoModel) {
    try {
      this.limpiarAdjuntos(null);
      this.restService.postREST(this.const.urlSubirImagen, fileGuardar)
        .subscribe(resp => {
          let respuesta: ArchivoModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Cargar Modal exitoso
            this.mostrarImagenRegister = true;
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_mensaje_archivo_subido });
            this.archivoImagenRegister = respuesta;
            this.sanitizarUrlImgCargada(this.archivoImagenRegister.archivo, this.archivoImagenRegister.nombreArchivo.split(".")[1]);
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

  crearActualizarUsuarioEutanasico(crear: boolean) {
    sessionStorage.clear();
    try {
      if (this.repeatPassword === undefined || this.repeatPassword === null) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mensaje_password_confirmar });
      } else if (this.repeatPassword !== this.usuarioAutorTBRegister.password) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mensaje_password_no_coincide });
      } else {
        this.usuarioAutorTBRegister.urlImagen = this.archivoImagenRegister.rutaArchivo;
        this.restService.postREST(crear ? this.const.urlCrearUsuario : this.const.urlModificarUsuario, this.usuarioAutorTBRegister)
          .subscribe(resp => {
            let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));
            if (respuesta !== null) {
              // Ocultar modal de registro y llenar en memoria el usuario en sesion
              this.disModRegistrar = false;
              this.mostrarImagenRegister = false;
              this.repeatPassword = '';
              this.sesionService.objServiceSesion = this.objectModelInitializer.getDataServiceSesion();
              this.sesionService.objServiceSesion.usuarioSesion = respuesta;
              this.usuarioAutorTBLogin = respuesta;
              if (crear) {
                this.usuarioAutorTBLogin.urlImagen = this.srcImagenRegister;
                this.usuarioAutorTBRegister.urlImagen = this.srcImagenRegister;
              }
              sessionStorage.setItem('objServiceSesion', JSON.stringify(this.sesionService.objServiceSesion));
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
      }
    } catch (e) {
      console.log(e);
    }
  }

  login() {
    sessionStorage.clear();
    try {
      this.restService.postREST(this.const.urlLogin, this.usuarioAutorTBLogin)
        .subscribe(resp => {
          let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Ocultar modal de login y llenar en memoria el usuario en sesion protegiendo la clave
            this.disModLogin = false;
            this.sesionService.objServiceSesion = this.objectModelInitializer.getDataServiceSesion();
            this.sesionService.objServiceSesion.usuarioSesion = respuesta;
            this.usuarioAutorTBLogin = respuesta;
            sessionStorage.setItem('objServiceSesion', JSON.stringify(this.sesionService.objServiceSesion));
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

  restaurarClave() {
    sessionStorage.clear();
    try {
      this.restService.postREST(this.const.urlRestaurarClave, this.usuarioAutorTBLogin)
        .subscribe(resp => {
          let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Ocultar modal de login y llenar en memoria el usuario en sesion protegiendo la clave
            this.disModLogin = false;
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

}
