
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { RequestEMailDTOModel } from 'src/app/model/dto/requestEmail-dto';
import { ResponseEMailDTOModel } from 'src/app/model/dto/responseEmail-dto';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

declare var $: any;

@Component({
  selector: 'app-enviar-mail',
  templateUrl: './enviar-mail.component.html',
  styleUrls: ['./enviar-mail.component.scss'],
  providers: [RestService, MessageService]
})
export class EnviarMailComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  activeIndex: number;

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();
  enums: any;
  mailDTO: RequestEMailDTOModel;
  mailResponseDTO: ResponseEMailDTOModel;
  mensaje: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, private sanitizer: DomSanitizer, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
    this.enums = enumerados.getEnumerados();
  }

  ngOnInit() {
    console.clear();
    this.mensaje = '';
    this.mailDTO = this.objectModelInitializer.getDataRequestEmailDtoModel();
    this.mailDTO.para = [];
    this.activeIndex = 0;
    if (!this.esUsuarioLogueadoActivo()) {
      this.router.navigate(['home/']);
    } else if (this.sesionService.getUsuarioSesionActual().rol !== 1) {
      this.router.navigate(['home/']);
    }
  }

  // Otras Funciones
  posicionarArriba() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  esUsuarioLogueadoActivo() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    let valorEstadoActivo = this.util.getValorEnumerado(this.enums.estadoUsuario.valores, 1);
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.estado === valorEstadoActivo.value && usuarioSession.id > 0) {
      result = true;
    }

    return result;
  }

  // Servicios Web
  enviarEmail() {
    try {
      let flagError = false;
      if (this.mensaje === undefined || this.mensaje === null || this.mensaje === '') {
        flagError = true;
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mtto_email_mensaje + ": " + this.sesionService.msg.lbl_mensaje_vacio });
      }

      if (!flagError) {
        // Conversiones de datos
        this.mailDTO.desde = this.const.correoRemitente;
        this.mailDTO.parametros = [];
        this.mailDTO.parametros.push('asunto|' + this.mailDTO.asunto);
        this.mailDTO.parametros.push('remite|' + this.const.nombreBanda);
        this.mailDTO.parametros.push('emailRemite|' + this.const.correoRemitente);
        this.mailDTO.parametros.push('mensaje|' + this.mensaje);

        this.restService.postREST(this.const.urlEnviarEmail, this.mailDTO)
          .subscribe(resp => {
            let respuesta: ResponseEMailDTOModel = JSON.parse(JSON.stringify(resp));
            if (respuesta !== null) {
              // Mostrar mensaje de envios de correos exitoso o no
              this.messageService.clear();
              this.messageService.add({ severity: respuesta.exitoso ? this.const.severity[1] : this.const.severity[3], summary: respuesta.exitoso ? this.sesionService.msg.lbl_summary_succes : this.sesionService.msg.lbl_summary_danger, detail: respuesta.mensaje });
              this.posicionarArriba();
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

}

