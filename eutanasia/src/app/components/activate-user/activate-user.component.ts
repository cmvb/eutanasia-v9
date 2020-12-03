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
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  usuarioAutorTBNuevo: UsuarioAutorModel;
  mensajeMostrar: any;

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
    this.usuarioAutorTBNuevo.password = userDES + "=";

    this.activarUsuario();
  }

  activarUsuario() {
    try {
      this.restService.postREST(this.const.urlActivarUsuario, this.usuarioAutorTBNuevo)
        .subscribe(resp => {
          let respuesta: UsuarioAutorModel = JSON.parse(JSON.stringify(resp));
          if (respuesta !== null) {
            // Mostrar mensaje exitoso
            this.mensajeMostrar = 'Se ha activado exitosamente el usuario: ' + this.usuarioAutorTBNuevo.usuario;
            this.messageService.clear();
            this.messageService.add({ severity: this.const.severity[1], summary: this.sesionService.msg.lbl_summary_succes, detail: this.sesionService.msg.lbl_info_proceso_completo });
          } else {
            this.mensajeMostrar = 'No se ha encontrado el usuario: ' + this.usuarioAutorTBNuevo.usuario;
          }
        },
          error => {
            this.mensajeMostrar = 'No se pudo activar el usuario: ' + this.usuarioAutorTBNuevo.usuario;
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
