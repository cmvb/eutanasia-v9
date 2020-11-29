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

  // Objetos de Animaciones
  fadeIn: any;

  // Utilidades
  msg: any;
  const: any;

  constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private messageService: MessageService, public restService: RestService, public textProperties: TextProperties, public objectModelInitializer: ObjectModelInitializer, public sesionService: SesionService, public util: Util) {
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit() {
    this.archivosTemporales = [];
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    let userLogin = sessionStorage.getItem('userLogin');
    if (userLogin !== undefined && userLogin !== null) {
      this.usuarioAutorTBLogin = JSON.parse(userLogin);
    }
  }

  mostrarTextoHeader(event) {
    setTimeout(() => {
      $('#mostrarTextHeader').fadeIn('slow');
    }, 7000);
  }

  redirigirBlogs() {
    this.router.navigate(['blogs']);
  }

  abrirModalLogin() {
    this.disModLogin = true;
  }

  abrirModalRegister() {
    this.usuarioAutorTBRegister = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.disModRegistrar = true;
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
            this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_mensaje_archivo_subido });
            this.archivoImagenRegister = respuesta;
            this.sanitizarUrlImgCargada(this.archivoImagenRegister.archivo, this.archivoImagenRegister.nombreArchivo.split(".")[1]);
          }
        },
          error => {
            let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
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

  limpiarAdjuntos() {
    this.mostrarImagenRegister = false;
    this.fileInputRegister.clear();
    this.archivoImagenRegister = this.objectModelInitializer.getDataArchivoDtoModel();
    this.archivosTemporales = [];
  }

  simularClickPorId(id) {
    $('#' + id).click();
  }

  crearUsuarioEutanasico() {
    try {
      if (this.repeatPassword === undefined || this.repeatPassword === null) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_mensaje_password_confirmar });
      } else if (this.repeatPassword !== this.usuarioAutorTBRegister.password) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_mensaje_password_no_coincide });
      } else {
        this.usuarioAutorTBRegister.urlImagen = this.archivoImagenRegister.rutaArchivo;
        this.restService.postREST(this.const.urlCrearUsuario, this.usuarioAutorTBRegister)
          .subscribe(resp => {
            let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));
            if (respuesta !== null) {
              // Ocultar modal de registro y llenar en memoria el usuario en sesion
              this.disModRegistrar = false;
              sessionStorage.setItem('userLogin', JSON.stringify(respuesta));
              this.messageService.clear();
              this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo });
            }
          },
            error => {
              let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
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

  sanitizarUrlImgCargada(bytesArray: any, tipoArchivo) {
    if (tipoArchivo === 'svg') {
      this.srcImagenRegister = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + bytesArray);
    } else {
      tipoArchivo = tipoArchivo + ';base64,';
      this.srcImagenRegister = 'data:image/' + tipoArchivo + bytesArray;
    }
  }

  login() {
    try {
      if (this.repeatPassword === undefined || this.repeatPassword === null) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_mensaje_password_confirmar });
      } else if (this.repeatPassword !== this.usuarioAutorTBRegister.password) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.msg.lbl_summary_danger, detail: this.msg.lbl_mensaje_password_no_coincide });
      } else {
        this.restService.postREST(this.const.urlLogin, this.usuarioAutorTBRegister)
          .subscribe(resp => {
            let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));
            if (respuesta !== null) {
              // Ocultar modal de registro y llenar en memoria el usuario en sesion protegiendo la clave
              this.disModRegistrar = false;
              sessionStorage.setItem('userLogin', JSON.stringify(respuesta));
              this.messageService.clear();
              this.messageService.add({ severity: this.const.severity[1], summary: this.msg.lbl_summary_succes, detail: this.msg.lbl_info_proceso_completo });
            }
          },
            error => {
              let listaMensajes = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
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

}
