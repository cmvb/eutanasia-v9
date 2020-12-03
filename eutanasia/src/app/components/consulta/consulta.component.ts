import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from 'src/app/services/rest.service';
import { tada, fadeIn } from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';

import * as $JQ from 'jquery';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss'],
  providers: [RestService, MessageService],
  animations: [
    trigger('tada', [transition('* => open', useAnimation(tada))]),
    trigger('fadeIn', [transition('* => open', useAnimation(fadeIn))])
  ]
})

export class ConsultaComponent implements OnInit {
  @Input() lista: any[];
  @Input() cabeceras: any[];
  @Input() btnEditar: any[];
  @Input() btnEliminar: any[];
  @Output() enviarObjetoEditar: EventEmitter<any> = new EventEmitter();
  @Output() enviarObjetoEliminar: EventEmitter<any> = new EventEmitter();

  // Objetos de Sesion
  sesion: any;

  // Objetos de Animaciones
  tada: any;
  fadeIn: any;

  // Utilidades
  util: any;
  const: any;
  locale: any;
  minDate = new Date();
  srcImgIconsSvg: any;
  textProperties: any;
  objectModelInitializer: any;
  rows: any;
  enumRows: any;
  cols: any[];
  p: number = 1;

  // Enumerados
  enums: any;
  enumIdioma = [];
  idiomaSeleccionado: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, enums: Enumerados, textProperties: TextProperties, objectModelInitializer: ObjectModelInitializer, util: Util, private messageService: MessageService, private sanitization: DomSanitizer, public sesionService: SesionService) {
    // Objetos inmutables
    this.textProperties = textProperties;
    this.objectModelInitializer = objectModelInitializer;
    this.util = util;
    this.const = objectModelInitializer.getConst();
    this.enums = enums.getEnumerados();
    this.srcImgIconsSvg = 'assets/images/icons/';
    this.enumRows = [5, 10, 15, 20, 50, 100];
    this.rows = this.enumRows[2];

    // Objetos mutables
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
    this.idiomaSeleccionado = this.objectModelInitializer.getDataEnumerado();
    this.idiomaSeleccionado.label = this.sesionService.msg.lbl_idioma_es;
    this.idiomaSeleccionado.value = 1;
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.cols = this.util.armarTabla(this.cabeceras, this.lista);
  }

  editar(obj) {
    this.enviarObjetoEditar.emit(obj);
    return true;
  }

  eliminar(obj) {
    this.enviarObjetoEliminar.emit(obj);
    return true;
  }

  cargarImagen(dato: any, tipoArchivo) {
    if (tipoArchivo === 'svg') {
      return this.sanitization.bypassSecurityTrustResourceUrl('data:image/svg+xml;base64,' + dato);
    } else {
      tipoArchivo = tipoArchivo + ';base64,';
      return 'data:image/' + tipoArchivo + dato;
    }
  }
}