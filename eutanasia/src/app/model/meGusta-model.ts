import { PostModel } from './post-model';
import { UsuarioAutorModel } from './usuarioAutor-model';

export interface MeGustaModel {
    id;
    usuarioAutorTB: UsuarioAutorModel;
    postTB: PostModel;
    calificacion;

    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}