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

  // Objetos de Animaciones
  fadeIn: any;

  // Utilidades
  msg: any;
  const: any;

  constructor(private router: Router, private route: ActivatedRoute, private messageService: MessageService, public restService: RestService, public textProperties: TextProperties, public objectModelInitializer: ObjectModelInitializer, public sesionService: SesionService, public util: Util) {
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
    this.limpiarAdjuntos();
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
    let fileGuardar: ArchivoModel = this.objectModelInitializer.getDataArchivoDtoModel();
    this.archivoImagenRegister = this.objectModelInitializer.getDataArchivoDtoModel();
    let reader = new FileReader();
    reader.readAsDataURL(archivoTemp);
    reader.onloadend = function () {
      // base64data      
      fileGuardar.archivo = reader.result.toString().split('base64,')[1];
      fileGuardar.nombreArchivo = archivoTemp.name;
    }
    this.subirImagen(fileGuardar);
  }

  subirImagen(fileGuardar: ArchivoModel) {
    try {
      this.restService.postREST(this.const.urlSubirImagen, fileGuardar)
        .subscribe(resp => {
          let respuesta: ArchivoModel = JSON.parse(JSON.stringify(resp));
          let mensaje = this.util.reportarExcepcionWS(respuesta);
          if (mensaje !== null) {
            this.messageService.clear();
            this.messageService.add(mensaje);
          } else {
            // Cargar Modal exitoso
            this.mostrarImagenRegister = true;
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[0], summary: this.msg.lbl_summary_info, detail: this.msg.lbl_mensaje_archivo_subido });
            this.archivoImagenRegister = fileGuardar;
          }
        },
          error => {
            let mensaje = this.util.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
            this.messageService.clear();
            this.messageService.add(mensaje);

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

  }

}
