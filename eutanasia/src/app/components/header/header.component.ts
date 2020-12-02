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

  // Objetos de Animaciones
  fadeIn: any;

  // Utilidades
  const: any;

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private enums: Enumerados, private messageService: MessageService, public restService: RestService, public textProperties: TextProperties, public objectModelInitializer: ObjectModelInitializer, public sesionService: SesionService, public util: Util) {
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit() {
    console.clear();
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
  mostrarTextoHeader(event) {
    setTimeout(() => {
      $('#mostrarTextHeader').fadeIn('slow');
    }, 7000);
  }

  redirigirBlogs() {
    this.router.navigate(['blogs']);
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

  limpiarAdjuntos() {
    this.mostrarImagenRegister = false;
    this.fileInputRegister.clear();
    this.archivoImagenRegister = this.objectModelInitializer.getDataArchivoDtoModel();
    this.archivosTemporales = [];
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

  sanitizarUrlImgCargada(bytesArray: any, tipoArchivo) {
    if (tipoArchivo === 'svg') {
      this.srcImagenRegister = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + bytesArray);
    } else {
      tipoArchivo = tipoArchivo + ';base64,';
      this.srcImagenRegister = 'data:image/' + tipoArchivo + bytesArray;
    }
  }

  cerrarSesion() {
    this.sesionService.cerrarSession();
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
  }

  // Modales
  abrirModalLogin() {
    this.messageService.clear();
    this.disModLogin = true;
  }

  abrirModalRegister() {
    this.messageService.clear();
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.disModRegistrar = true;
  }

  abrirModalUpdateUser() {
    //this.disModUpdateUser = true;
  }

  mostrarOcultarMenu() {
    this.showMenuMovil = !this.showMenuMovil;
  }

  // Servicios Web
  subirImagen(fileGuardar: ArchivoModel) {
    try {
      this.limpiarAdjuntos();
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

  crearUsuarioEutanasico() {
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
        this.restService.postREST(this.const.urlCrearUsuario, this.usuarioAutorTBRegister)
          .subscribe(resp => {
            let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));
            if (respuesta !== null) {
              // Ocultar modal de registro y llenar en memoria el usuario en sesion
              this.disModRegistrar = false;
              this.srcImagenRegister = undefined;
              this.mostrarImagenRegister = false;
              this.repeatPassword = '';
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

}
