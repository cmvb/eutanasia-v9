import { PostModel } from './post-model';
import { UsuarioAutorModel } from './usuarioAutor-model';

export interface ComentarioModel {
    id;
    usuarioAutorTB: UsuarioAutorModel;
    postTB: PostModel;
    idComentarioRespuesta;
    comentario;

    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}