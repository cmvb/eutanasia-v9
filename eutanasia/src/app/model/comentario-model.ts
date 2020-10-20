export interface ComentarioModel {
    id;
    idPost;
    idComentarioRespuesta;
    autor;
    correoAutor;
    comentario;

    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}