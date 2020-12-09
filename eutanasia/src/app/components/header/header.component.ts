import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../.././services/rest.service';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { SesionService } from 'src/app/services/sesionService/sesion.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { tada, fadeIn } from 'ng-animate';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ArchivoModel } from 'src/app/model/archivo-model';
import { DomSanitizer } from '@angular/platform-browser';
import { Enumerados } from 'src/app/config/Enumerados';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [RestService],
  animations: [
    trigger('fadeIn', [transition('* => open', useAnimation(fadeIn))])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('fileInputRegister') fileInputRegister: FileUpload;

  // Objetos de datos  
  disModLogin: boolean;
  disModRegistrar: boolean;
  usuarioAutorTBLogin: UsuarioAutorModel;
  usuarioAutorTBRegister: UsuarioAutorModel;
  repeatPassword: any;
  archivosTemporales: any[];
  archivoImagenRegister: ArchivoModel;
  mostrarImagenRegister: boolean;
  srcImagenRegister: any;
  showMenuMovil: boolean;
  loginRestaurar: boolean;
  esRegistro: boolean;

  // Objetos de Animaciones
  fadeIn: any;

  // Utilidades
  const: any;
  enumGenero: any[];

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private enums: Enumerados, private messageService: MessageService, public restService: RestService, public textProperties: TextProperties, public objectModelInitializer: ObjectModelInitializer, public sesionService: SesionService, public util: Util) {
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit() {
    console.clear();
    this.cargarEnumerados();
    this.archivosTemporales = [];
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
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
  }

  // Otras Funciones
  cargarEnumerados() {
    let enums = this.enums.getEnumerados();
    this.enumGenero = enums.sexo.valores;
  }

  mostrarTextoHeader(event) {
    setTimeout(() => {
      $('#mostrarTextHeader').fadeIn('slow');
    }, 7000);
  }

  redirigirBlogs() {
    this.router.navigate(['timeline']);
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

  simularClickPorId(id) {
    $('#' + id).click();
  }

  esUsuarioLogueado() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.id > 0) {
      result = true;
    }

    return result;
  }

  esUsuarioLogueadoActivo() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    let valorEstadoActivo = this.util.getValorEnumerado(this.enums.getEnumerados().estadoUsuario.valores, 1);
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.estado === valorEstadoActivo.value) {
      result = true;
    }

    return result;
  }

  cerrarSesion() {
    this.limpiarModales(null);
    this.sesionService.cerrarSession();
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
  }

  limpiarModales(event) {
    this.disModLogin = false;
    this.disModRegistrar = false;
  }

  // Modales
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
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.usuarioAutorTBRegister.genero = { value: 0, label: this.sesionService.msg.lbl_enum_generico_valor_vacio };
    this.disModRegistrar = true;
  }

  abrirModalUpdateUser() {
    this.esRegistro = false;
    this.messageService.clear();
    this.srcImagenRegister = '';
    this.usuarioAutorTBRegister = this.usuarioAutorTBLogin;
    this.usuarioAutorTBRegister.password = '';
    this.usuarioAutorTBRegister.fechaNacimiento = new Date(this.usuarioAutorTBRegister.fechaNacimiento);
    this.usuarioAutorTBRegister.genero = this.util.getValorEnumerado(this.enumGenero, this.usuarioAutorTBRegister.genero);
    this.disModRegistrar = true;
    this.mostrarImagenRegister = true;
  }

  mostrarOcultarMenu() {
    this.showMenuMovil = !this.showMenuMovil;
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

}
