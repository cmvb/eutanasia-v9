package com.eutanasia.eutanasia.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;

import com.eutanasia.eutanasia.dto.ArchivoDTO;
import com.eutanasia.eutanasia.service.ISFTPServicio;

public abstract class Util {

	public static final Pattern EMAIL_PATTERN = Pattern
			.compile("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
	public static final String VALOR_NULL_OBJETO = PropertiesUtil.getProperty("eutanasia.msg.validate.valor.objeto");
	public static final String VALOR_VACIO = PropertiesUtil.getProperty("eutanasia.msg.validate.valor.vacio");
	public static final String VALOR_INCORRECTO = PropertiesUtil.getProperty("eutanasia.msg.validate.valor.incorrecto");
	public static final String CORREO_NO_VALIDO = PropertiesUtil.getProperty("eutanasia.msg.validate.correoInvalido");
	public static final String SUPERA_LONGITUD = PropertiesUtil
			.getProperty("eutanasia.msg.validate.valor.superaLongitud");
	public static final String RUTA_SFTP_IMAGES_USER = PropertiesUtil.getProperty("eutanasia.ruta.images.user");
	private static final String SEPARADOR = "/";

	public static final String ARCHIVO = PropertiesUtil.getProperty("lbl.archivo.archivo");
	public static final String NOMBRE_ARCHIVO = PropertiesUtil.getProperty("lbl.archivo.nombre");
	public static final String RUTA_ARCHIVO = PropertiesUtil.getProperty("lbl.archivo.ruta");

	public static final int MAX_LENGTH_50 = 50;
	public static final int MAX_LENGTH_30 = 30;

	@Value("${sftp.puerto}")
	private static String PUERTO_SFTP;

	@Value("${sftp.servidor}")
	private static String SERVIDOR_SFTP;

	@Value("${sftp.usuario}")
	private static String USUARIO_SFTP;

	@Value("${sftp.password}")
	private static String CLAVE_SFTP;

	public static boolean esCorreoValido(String email) {
		Matcher mather = EMAIL_PATTERN.matcher(email.toLowerCase());
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
		// TODO CREAR VALIDACIONES

		return errores;
	}

	public static List<String> validarArchivo(ArchivoDTO archivoDto) {
		List<String> errores = new ArrayList<>();

		if (archivoDto != null) {
			if (archivoDto.getArchivo() == null) {
				errores.add(ARCHIVO + VALOR_INCORRECTO);
			}
			if (StringUtils.isBlank(archivoDto.getNombreArchivo())) {
				errores.add(NOMBRE_ARCHIVO + VALOR_VACIO);
			}
			if (StringUtils.isBlank(archivoDto.getRutaArchivo())) {
				errores.add(RUTA_ARCHIVO + VALOR_VACIO);
			}
		} else {
			errores.add(VALOR_NULL_OBJETO);
		}

		return errores;
	}

	public static ArchivoDTO subirArchivoSFTP(ArchivoDTO archivo, ISFTPServicio sftpServicio) {
		ArchivoDTO archivoRespuesta = new ArchivoDTO();
		boolean sftpConectado = false;

		try {
			String rutaSFTP = archivo.getRutaArchivo();

			// Abrir conexion a servidor sftp
			sftpConectado = sftpServicio.conectarServidor(SERVIDOR_SFTP, Integer.parseInt(PUERTO_SFTP), USUARIO_SFTP,
					CLAVE_SFTP);

			// validar conexion a servidor
			if (sftpConectado) {
				boolean rutaExiste = false;

				// validar que la ruta no este vacia
				if (!StringUtils.isBlank(rutaSFTP)) {
					// validar que la ruta exista en el servidor
					rutaExiste = sftpServicio.esValidaRuta(rutaSFTP);
					if (rutaExiste) {
						rutaExiste = false;
						rutaSFTP = rutaSFTP + archivo.getNombreArchivo().split(".")[0];
						rutaExiste = sftpServicio.esValidaRuta(rutaSFTP);

						// validar de que exista la ruta o en su defecto que la cree
						if (!rutaExiste) {
							sftpServicio.crearDirectorio(rutaSFTP);
						}

						// guardar archivos en el servidor que llegan en la lista
						if (archivo.getArchivo() != null && archivo.getArchivo().length > 0) {
							rutaSFTP = rutaSFTP + SEPARADOR + archivo.getNombreArchivo();
							InputStream inputStreamArchivo = new ByteArrayInputStream(archivo.getArchivo());
							sftpServicio.guardarArchivoServidor(inputStreamArchivo, rutaSFTP);
							archivo.setRutaArchivo(rutaSFTP + SEPARADOR + archivo.getNombreArchivo());

							archivoRespuesta = archivo;
						}
					}

				}
			}

			// cerrar conexion con servidor SFTP
			sftpServicio.cerrarConexion();
		} catch (Exception ex) {
			sftpServicio.cerrarConexion();
		}

		return archivoRespuesta;
	}

}