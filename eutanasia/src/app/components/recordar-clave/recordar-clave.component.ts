import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-recordar-clave',
  templateUrl: './recordar-clave.component.html',
  styleUrls: ['./recordar-clave.component.scss']
})
export class RecordarClaveComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  usuarioAutorTBNuevo: UsuarioAutorModel;
  mensajeMostrar: any;
  repeatPassword: any;

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, private sanitization: DomSanitizer, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
    this.enums = enumerados.getEnumerados();
  }

  ngOnInit() {
    console.clear();
    this.usuarioAutorTBNuevo = this.objectModelInitializer.getDataUsuarioAutorModel();
    let urlSeg = location.href.split("/");
    let token = urlSeg[urlSeg.length - 1];
    let userDES = this.util.transformarSimboloUri(token, this.util.cargarMatrizPorcentajeUri());
    this.usuarioAutorTBNuevo.usuario = userDES + "=";

    this.consultarUsuarioEncriptado();
  }

  consultarUsuarioEncriptado() {
    try {
      this.restService.postREST(this.const.urlConsultarUsuarioEncriptado, this.usuarioAutorTBNuevo)
        .subscribe(resp => {
          let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));

          if (respuesta !== null) {
            this.usuarioAutorTBNuevo = respuesta;
            // Mostrar mensaje exitoso
            this.mensajeMostrar = this.sesionService.msg.lbl_mensaje_digite_nueva_clave;
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_info_proceso_completo });
          } else {
            this.mensajeMostrar = this.sesionService.msg.lbl_mensaje_usuario_no_encontrado;
          }
        },
          error => {
            this.mensajeMostrar = this.sesionService.msg.lbl_mensaje_usuario_no_encontrado;
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

  modificarUsuario() {
    try {
      if (this.repeatPassword === undefined || this.repeatPassword === null) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mensaje_password_confirmar });
      } else if (this.repeatPassword !== this.usuarioAutorTBNuevo.password) {
        this.messageService.clear();
        this.messageService.add({ severity: this.const.severity[3], summary: this.sesionService.msg.lbl_summary_danger, detail: this.sesionService.msg.lbl_mensaje_password_no_coincide });
      } else {
        this.restService.postREST(this.const.urlModificarUsuario, this.usuarioAutorTBNuevo)
          .subscribe(resp => {
            let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));

            if (respuesta !== null) {
              this.usuarioAutorTBNuevo = respuesta;
              this.usuarioAutorTBNuevo.password = '';
              this.repeatPassword = '';

              // Mostrar mensaje exitoso
              this.mensajeMostrar = this.sesionService.msg.lbl_mensaje_clave_actualizada_ok;
              this.messageService.clear();
              this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_info_proceso_completo });
            }
          },
            error => {
              this.mensajeMostrar = this.sesionService.msg.lbl_mensaje_usuario_no_encontrado;
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
