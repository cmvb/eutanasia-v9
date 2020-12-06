import { Injectable } from '@angular/core';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { ObjServiceSessionDTOModel } from 'src/app/model/dto/objServiceSession-dto';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  // Fases
  objServiceSesion: ObjServiceSessionDTOModel;
  msg: any;
  mapaArchivosUser: any;

  constructor(public textProperties: TextProperties, public objectModelInitializer: ObjectModelInitializer) {
    this.inicializar();
    if (!this.existeSession()) {
      this.tomarSessionDeStorage();
    }
  }

  inicializar() {
    this.objServiceSesion = this.objectModelInitializer.getDataServiceSesion();
    this.objServiceSesion.phase = undefined;
    this.objServiceSesion.usuarioSesion = undefined;
    this.objServiceSesion.tokenSesion = undefined;
    this.objServiceSesion.decodedToken = undefined;
    this.objServiceSesion.expirationDate = undefined;
    this.objServiceSesion.mensajeError403 = undefined;
    this.objServiceSesion.mensajeError404 = undefined;
    this.objServiceSesion.mensajeError500 = undefined;
    this.objServiceSesion.mensajeConfirmacion = undefined;
    this.objServiceSesion.idioma = this.objectModelInitializer.getConst().idiomaEs;
    this.msg = this.textProperties.getProperties(this.objServiceSesion.idioma);
  }

  cambiarIdioma(idioma: number) {
    this.msg = this.textProperties.getProperties(idioma);
    this.cambiarIdiomaWPP(idioma);
  }

  cambiarIdiomaWPP(idioma) {
    var WAButton = document.getElementById("WAButton");
    while (WAButton.firstChild) {
      WAButton.removeChild(WAButton.firstChild);
    }
    $('#WAButton').floatingWhatsApp({
      phone: '+573219315302', //WhatsApp Business phone number
      headerTitle: idioma == 0 ? '¡Chatea con la banda por Whatsapp!' : 'Chat with the band on WhatsApp!', //Popup Title
      popupMessage: idioma == 0 ? 'Hola, ¿En qué te ayudo?' : 'Hello, how can we help you?', //Popup Message
      showPopup: true, //Enables popup display
      buttonImage: '<img src="assets/images/wpp.png" />', //Button Image
      //headerColor: 'crimson', //Custom header color
      //backgroundColor: 'crimson', //Custom background button color
      position: "right" //Position: left | right
    });
  }

  getUsuarioSesionActual() {
    let result = null;
    if (this.objServiceSesion !== undefined && this.objServiceSesion !== null && this.objServiceSesion.usuarioSesion !== undefined && this.objServiceSesion.usuarioSesion !== null) {
      result = this.objServiceSesion.usuarioSesion;
    }
    return result;
  }

  existeSession() {
    return this.objServiceSesion !== undefined && this.objServiceSesion !== null && this.objServiceSesion.usuarioSesion !== undefined && this.objServiceSesion.usuarioSesion !== null;
  }

  cerrarSession() {
    sessionStorage.clear();
    this.objServiceSesion = undefined;
  }

  tomarSessionDeStorage() {
    let objServiceSesion = sessionStorage.getItem('objServiceSesion');
    if (objServiceSesion !== undefined && objServiceSesion !== null) {
      this.objServiceSesion = JSON.parse(objServiceSesion);
    }
  }

  tienePermisos(URLactual: String) {
    let resultTienePermisos = false;

    return resultTienePermisos;
  }
}
