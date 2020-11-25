import { PostModel } from './post-model';
import { UsuarioAutorModel } from './usuarioAutor-model';

export interface ComentarioModel {
    id;
    usuarioAutorTB: UsuarioAutorModel;
    postTB: PostModel;
    idComentarioRespuesta;
    correoAutor;
    comentario;

    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}