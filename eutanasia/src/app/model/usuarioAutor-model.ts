import { PostModel } from './post-model';

export interface UsuarioAutorModel {
    id;
    nombres;
    apellidos;
    usuario;
    password;
    rol;
    genero;
    linkFbook;
	linkInstagram;
	linkGoogle;
	linkTwitter;
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