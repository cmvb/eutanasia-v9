import { UsuarioAutorModel } from '../usuarioAutor-model';

export interface ObjServiceSessionDTOModel {
    phase;
    usuarioSesion: UsuarioAutorModel;
    tokenSesion;
    decodedToken;
    expirationDate;
    mensajeError403;
    mensajeError404;
    mensajeError500;
    mensajeConfirmacion;
    idioma;
}