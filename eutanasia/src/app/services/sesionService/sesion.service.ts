import { Injectable } from '@angular/core';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { ObjServiceSessionDTOModel } from 'src/app/model/dto/objServiceSession-dto';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  // Fases
  objServiceSesion: ObjServiceSessionDTOModel;

  constructor(public objectModelInitializer: ObjectModelInitializer) {
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
