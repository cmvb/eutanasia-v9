package com.eutanasia.eutanasia.util;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;

import org.apache.commons.lang3.StringUtils;

import com.eutanasia.eutanasia.dto.ArchivoDTO;
import com.eutanasia.eutanasia.model.ComentarioTB;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.model.UsuarioAutorTB;

public abstract class Util {

	public static boolean esCorreoValido(String email) {
		Matcher mather = ConstantesValidaciones.EMAIL_PATTERN.matcher(email.toLowerCase());
		return mather.find();
	}

	public static boolean tieneCantidadCharPermitida(String cadenaValidar, int cantidadChar) {
		boolean result = false;
		if (!StringUtils.isBlank(cadenaValidar)) {
			result = cadenaValidar.length() <= cantidadChar;
		}
		return result;
	}

	public static List<String> validaDatos(String tabla, Object entidadTB) {
		List<String> errores = new ArrayList<>();
		// TODO CREAR VALIDACIONES FALTANTES
		if (!StringUtils.isBlank(tabla)) {
			switch (tabla) {
			case ConstantesTablasNombre.MRA_TOQUE_TB:
				break;
			case ConstantesTablasNombre.MRA_COMENTARIO_TB:
				errores = validarComentario((ComentarioTB) entidadTB);
				break;
			case ConstantesTablasNombre.MRA_POST_TB:
				errores = validarPost((PostTB) entidadTB);
				break;
			case ConstantesTablasNombre.MRA_USUARIO_AUTOR_TB:
				errores = validarUsuarioAutor((UsuarioAutorTB) entidadTB);
				break;
			}
		} else {
			errores.add(ConstantesValidaciones.TABLA_NO_ESTABLECIDA_VALIDACIONES);
		}

		return errores;
	}

	public static List<String> validarPost(PostTB postTB) {
		List<String> errores = new ArrayList<>();

		if (StringUtils.isBlank(postTB.getTitulo())) {
			errores.add(ConstantesValidaciones.TITULO_POST + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(postTB.getSubtitulo())) {
			errores.add(ConstantesValidaciones.SUBTITULO_POST + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(postTB.getArticulo())) {
			errores.add(ConstantesValidaciones.ARTICULO_POST + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(postTB.getTags())) {
			errores.add(ConstantesValidaciones.TAGS_POST + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(postTB.getUrlImagen())) {
			errores.add(ConstantesValidaciones.IMAGEN_POST + ConstantesValidaciones.VALOR_VACIO);
		}
		if (postTB.getCategoria() <= 0) {
			errores.add(ConstantesValidaciones.CATEGORIA_POST + ConstantesValidaciones.VALOR_VACIO);
		}
		if (postTB.getUsuarioAutorTB() == null) {
			errores.add(ConstantesValidaciones.USUARIO_AUTOR_POST + ConstantesValidaciones.VALOR_VACIO);
		}

		return errores;
	}

	public static List<String> validarComentario(ComentarioTB comentarioTB) {
		List<String> errores = new ArrayList<>();

		if (StringUtils.isBlank(comentarioTB.getComentario())) {
			errores.add(ConstantesValidaciones.COMENTARIO + ConstantesValidaciones.VALOR_VACIO);
		}
		if (comentarioTB.getUsuarioAutorTB() == null) {
			errores.add(ConstantesValidaciones.USUARIO_AUTOR_COMENTARIO + ConstantesValidaciones.VALOR_VACIO);
		}
		if (comentarioTB.getPostTB() == null) {
			errores.add(ConstantesValidaciones.POST_COMENTARIO + ConstantesValidaciones.VALOR_VACIO);
		}

		return errores;
	}

	public static List<String> validarUsuarioAutor(UsuarioAutorTB usuarioAutorTB) {
		List<String> errores = new ArrayList<>();

		if (StringUtils.isBlank(usuarioAutorTB.getNombres())) {
			errores.add(ConstantesValidaciones.NOMBRES_USUARIO + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(usuarioAutorTB.getApellidos())) {
			errores.add(ConstantesValidaciones.APELLIDOS_USUARIO + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(usuarioAutorTB.getResena())) {
			errores.add(ConstantesValidaciones.RESENA_USUARIO + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(usuarioAutorTB.getUsuario())) {
			errores.add(ConstantesValidaciones.USUARIO + ConstantesValidaciones.VALOR_VACIO);
		}
		if (StringUtils.isBlank(usuarioAutorTB.getCorreo())) {
			errores.add(ConstantesValidaciones.CORREO_USUARIO + ConstantesValidaciones.VALOR_VACIO);
		} else if (!Util.esCorreoValido(usuarioAutorTB.getCorreo())) {
			errores.add(ConstantesValidaciones.CORREO_USUARIO + ConstantesValidaciones.VALOR_INCORRECTO);
		}
		if (StringUtils.isBlank(usuarioAutorTB.getUrlImagen())) {
			errores.add(ConstantesValidaciones.IMAGEN_USUARIO + ConstantesValidaciones.VALOR_VACIO);
		}
		if (usuarioAutorTB.getFechaNacimiento() == null) {
			errores.add(ConstantesValidaciones.FECHA_NACIMIENTO_USUARIO + ConstantesValidaciones.VALOR_VACIO);
		} else if (usuarioAutorTB.getFechaNacimiento().after(new Date())) {
			errores.add(ConstantesValidaciones.FECHA_NACIMIENTO_USUARIO + ConstantesValidaciones.VALOR_INCORRECTO);
		}
		if (StringUtils.isBlank(usuarioAutorTB.getPassword())) {
			errores.add(ConstantesValidaciones.CLAVE_USUARIO + ConstantesValidaciones.VALOR_VACIO);
		}

		return errores;
	}

	public static List<String> validarArchivo(ArchivoDTO archivoDto) {
		List<String> errores = new ArrayList<>();

		if (archivoDto != null) {
			if (archivoDto.getArchivo() == null) {
				errores.add(ConstantesValidaciones.ARCHIVO + ConstantesValidaciones.VALOR_INCORRECTO);
			}
			if (StringUtils.isBlank(archivoDto.getNombreArchivo())) {
				errores.add(ConstantesValidaciones.NOMBRE_ARCHIVO + ConstantesValidaciones.VALOR_VACIO);
			}
			if (StringUtils.isBlank(archivoDto.getRutaArchivo())) {
				errores.add(ConstantesValidaciones.RUTA_ARCHIVO + ConstantesValidaciones.VALOR_VACIO);
			}
		} else {
			errores.add(ConstantesValidaciones.VALOR_NULL_OBJETO);
		}

		return errores;
	}

	public static String generarToken(String usuario) {
		char[] SYM_USUARIO = usuario.toCharArray();
		char[] BUF_USUARIO = new char[ConstantesValidaciones.TAMANO_TOKEN];
		SecureRandom random = new SecureRandom();
		for (int i = 0; i < ConstantesValidaciones.BUFFER.length; i++) {
			ConstantesValidaciones.BUFFER[i] = ConstantesValidaciones.SIMBOLOS[random
					.nextInt(ConstantesValidaciones.SIMBOLOS.length)];
		}
		for (int i = 0; i < BUF_USUARIO.length; i++) {
			BUF_USUARIO[i] = SYM_USUARIO[random.nextInt(SYM_USUARIO.length)];
		}
		String result = new String(ConstantesValidaciones.BUFFER) + new String(BUF_USUARIO);

		return result.substring(5, 15);
	}

	public static String encriptarPassword(String password) {
		String salt = PasswordUtil.getSalt(ConstantesValidaciones.SALT_ENCRIPTAR_CLAVE, password);
		return PasswordUtil.generateSecurePassword(password, salt);
	}

}