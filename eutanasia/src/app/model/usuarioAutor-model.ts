import { PostModel } from './post-model';

export interface UsuarioAutorModel {
    id;
    nombres;
    apellidos;
    usuario;
    password;
    rol;
    correo;
    fechaNacimiento;
    urlImagen;
    resena;

    estado;
    fechaCreacion;
    usuarioCreacion;
    fechaActualizacion;
    usuarioActualizacion;
}