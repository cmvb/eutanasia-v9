import { UsuarioAutorModel } from './usuarioAutor-model';

export interface PostModel {
    id;
    usuarioAutorTB: UsuarioAutorModel;
    titulo;
    subtitulo;
    articulo;
    urlImagen;
    correoAutor;
    tags;
    categoria;
    cantidadComentarios;

    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}