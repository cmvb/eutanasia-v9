import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ArchivoModel } from 'src/app/model/archivo-model';
import { ObjServiceSessionDTOModel } from 'src/app/model/dto/objServiceSession-dto';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';
import { RestService } from '../rest.service';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  // Fases
  objServiceSesion: ObjServiceSessionDTOModel;
  msg: any;
  mapaArchivosUser: any;
  const: any;

  constructor(public textProperties: TextProperties, private messageService: MessageService, public objectModelInitializer: ObjectModelInitializer, public restService: RestService) {
    this.const = this.objectModelInitializer.getConst();
    this.inicializar();
    if (!this.existeSession()) {
      this.tomarSessionDeStorage();
    }
  }

  inicializar() {
    this.mapaArchivosUser = new Map();
    this.obtenerArchivos();
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
    let result: UsuarioAutorModel = null;
    if (this.objServiceSesion !== undefined && this.objServiceSesion !== null && this.objServiceSesion.usuarioSesion !== undefined && this.objServiceSesion.usuarioSesion !== null) {
      result = this.objServiceSesion.usuarioSesion;
    }
    return result;
  }

  existeSession() {
    return this.objServiceSesion !== undefined && this.objServiceSesion !== null && this.objServiceSesion.usuarioSesion !== undefined && this.objServiceSesion.usuarioSesion !== null;
  }

  cerrarSession() {
    localStorage.clear();
    this.objServiceSesion = undefined;
  }

  tomarSessionDeStorage() {
    let objServiceSesion = localStorage.getItem('objServiceSesion');
    if (objServiceSesion !== undefined && objServiceSesion !== null) {
      this.objServiceSesion = JSON.parse(objServiceSesion);
    }
  }

  tienePermisos(URLactual: String) {
    let resultTienePermisos = false;

    return resultTienePermisos;
  }

  obtenerArchivos() {
    try {
      debugger;
      let archivo = this.objectModelInitializer.getDataArchivoDtoModel();
      archivo.rutaArchivo = this.const.urlSFTPArchivos;
      this.restService.postREST(this.const.urlObtenerArchivos, archivo)
        .subscribe(resp => {
          this.mapaArchivosUser = new Map();
          let listaTemporal: ArchivoModel[] = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            listaTemporal.forEach(archivo => {
              if (!this.mapaArchivosUser.has(archivo.rutaArchivo + archivo.nombreArchivo)) {
                this.mapaArchivosUser.set(archivo.rutaArchivo + archivo.nombreArchivo, archivo);
              }
            });
          }
        },
          error => {
            let listaMensajes = this.construirMensajeExcepcion(error.error, this.msg.lbl_summary_danger);
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

  construirMensajeExcepcion(error, summary) {
    let listaMensajes = [];

    if (error !== undefined && error !== null && error.mensaje !== undefined && error.mensaje !== null) {
      // Extraemos por el split de mensajes |
      let listaErrores = error.mensaje.split('|');
      listaErrores.forEach(errorMSG => {
        let mensaje = { severity: '', summary: '', detail: '' };
        Object.assign(this.objectModelInitializer.getDataMessage(), mensaje);
        mensaje.severity = this.const.severity[3];
        mensaje.summary = summary;
        mensaje.detail = errorMSG;
        if (errorMSG.length > 0) {
          listaMensajes.push(mensaje);
        }
      });
    } else {
      let mensaje = { severity: '', summary: '', detail: '' };
      mensaje.severity = this.const.severity[3];
      mensaje.summary = summary;
      mensaje.detail = this.msg.lbl_mensaje_sin_detalles_error;
      listaMensajes.push(mensaje);
    }

    return listaMensajes;
  }

}
