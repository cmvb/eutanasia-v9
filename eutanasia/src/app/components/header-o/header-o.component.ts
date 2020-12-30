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
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';
import { ArchivoModel } from 'src/app/model/archivo-model';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { FileUpload } from 'primeng/fileupload';

declare var $: any;

@Component({
  selector: 'app-header-o',
  templateUrl: './header-o.component.html',
  styleUrls: ['./header-o.component.scss'],
  providers: [RestService, MessageService]
})
export class HeaderOComponent implements OnInit {
  @ViewChild('fileInputRegister') fileInputRegister: FileUpload;

  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
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
  esRegistro: boolean;

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();
  enumGenero: any[];

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enums: Enumerados, public sesionService: SesionService, private messageService: MessageService, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
  }

  ngOnInit() {
    console.clear();
    this.cargarEnumerados();
    this.archivosTemporales = [];
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.archivoImagenRegister = this.objectModelInitializer.getDataArchivoDtoModel();
    if (this.sesionService.existeSession()) {
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
    } else {
      this.sesionService.tomarSessionDeStorage();
      this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
      if (this.usuarioAutorTBLogin === null) {
        this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
      }
    }

    if (!this.esUsuarioLogueadoActivoBlog()) {
      this.abrirModalLogin();
    }
  }

  // Otras Funciones  
  cargarEnumerados() {
    let enums = this.enums.getEnumerados();
    this.enumGenero = enums.sexo.valores;
  }

  posicionarArriba() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  redirigirBlogsBlog() {
    this.router.navigate(['timeline']);
  }

  mostrarOcultarMenuBlog() {
    this.showMenuMovil = !this.showMenuMovil;
  }

  esUsuarioLogueadoActivoBlog() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    let valorEstadoActivo = this.util.getValorEnumerado(this.enums.getEnumerados().estadoUsuario.valores, 1);
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.estado === valorEstadoActivo.value && usuarioSession.id > 0) {
      result = true;
    }

    return result;
  }

  cerrarSesionBlog() {
    this.messageService.clear();
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
    this.esRegistro = false;
    this.messageService.clear();
    this.srcImagenRegister = '';
    this.usuarioAutorTBRegister = this.usuarioAutorTBLogin;
    this.usuarioAutorTBRegister.password = '';
    this.usuarioAutorTBRegister.fechaNacimiento = new Date(this.usuarioAutorTBRegister.fechaNacimiento);
    this.usuarioAutorTBRegister.genero = this.util.getValorEnumerado(this.enumGenero, this.usuarioAutorTBRegister.genero.value !== undefined && this.usuarioAutorTBRegister.genero.value !== null && this.usuarioAutorTBRegister.genero.value > 0 ? this.usuarioAutorTBRegister.genero.value : this.usuarioAutorTBRegister.genero);
    this.archivoImagenRegister.rutaArchivo = this.usuarioAutorTBRegister.urlImagen;
    this.disModRegistrar = true;
    this.mostrarImagenRegister = true;
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
    this.srcImagenRegister = '';
    this.archivoImagenRegister.rutaArchivo = '';
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.usuarioAutorTBRegister.genero = { value: 0, label: this.sesionService.msg.lbl_enum_generico_valor_vacio };
    this.disModRegistrar = true;
  }

  // Servicios Web

  subirImagen(fileGuardar: ArchivoModel) {
    try {
      this.limpiarAdjuntos(null);
      fileGuardar.destinoArchivo = 0;
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
    localStorage.clear();
    try {
      if (this.repeatPassword === undefined || this.repeatPassword === null) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mensaje_password_confirmar });
      } else if (this.repeatPassword !== this.usuarioAutorTBRegister.password) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mensaje_password_no_coincide });
      } else {
        if (this.archivoImagenRegister !== undefined && this.archivoImagenRegister !== null && this.archivoImagenRegister.rutaArchivo !== undefined && this.archivoImagenRegister.rutaArchivo !== null) {
          this.usuarioAutorTBRegister.urlImagen = this.archivoImagenRegister.rutaArchivo;
        } else {
          this.usuarioAutorTBRegister.urlImagen = '';
        }
        this.usuarioAutorTBRegister.genero = this.usuarioAutorTBRegister.genero.value;
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
              this.usuarioAutorTBRegister = respuesta;
              if (crear) {
                this.usuarioAutorTBLogin.urlImagen = this.srcImagenRegister;
                this.usuarioAutorTBRegister.urlImagen = this.srcImagenRegister;
              }
              localStorage.setItem('objServiceSesion', JSON.stringify(this.sesionService.objServiceSesion));
              this.messageService.clear();
              this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: crear ? this.sesionService.msg.lbl_mensaje_usuario_creado : this.sesionService.msg.lbl_mensaje_usuario_modificado });
            }
          },
            error => {
              this.usuarioAutorTBRegister.genero = this.util.getValorEnumerado(this.enumGenero, this.usuarioAutorTBRegister.genero);
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
    localStorage.clear();
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
            this.archivoImagenRegister.rutaArchivo = this.usuarioAutorTBLogin.urlImagen;
            localStorage.setItem('objServiceSesion', JSON.stringify(this.sesionService.objServiceSesion));
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
    localStorage.clear();
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

}

