import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { tada, fadeIn } from 'ng-animate';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Enumerados } from 'src/app/config/Enumerados';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ArchivoModel } from 'src/app/model/archivo-model';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';
import { RestService } from 'src/app/services/rest.service';
import { SesionService } from 'src/app/services/sesionService/sesion.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
  animations: [
    trigger('tada', [transition('* => *', useAnimation(tada))]),
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class PromoComponent implements OnInit {
  @ViewChild('videoPromocional') videoPromocional: ElementRef;

  // Cuenta regresiva
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;

  // Objetos de Sesion
  sesion: any;

  // Objetos de Animaciones
  tada: any;
  fadeIn: any;

  // Objetos de Datos
  mostrarPromo: boolean;

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
    this.mostrarPromo = false;
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('01/01/2021 00:00');
      //this.end = new Date('15/12/' + (this.now.getFullYear() + 1) + ' 00:00');
      this.showDate();
    });
  }

  showDate() {
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
    if (distance <= 0) {
      this.mostrarPromo = true;
    }
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

}
