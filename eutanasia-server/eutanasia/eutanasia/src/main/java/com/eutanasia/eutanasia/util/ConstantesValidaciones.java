package com.eutanasia.eutanasia.util;

import java.util.regex.Pattern;

public final class ConstantesValidaciones {

	// Expresiones regulares y cadenas
	public static final String EXPRESION_REGULAR_DE_TEXTO_INGRESADO = "[a-zA-Z0-9- äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ//\\.]*";
	public static final String EXPRESION_REGULAR_DE_DIRECCIONES = "[a-zA-Z0-9- äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ//\\.]*#[a-zA-Z0-9- äÄëËïÏöÖüÜáéíóúáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ//\\.]*";
	public static final String EXPRESION_REGULAR_DE_EMAILS = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
	public static final Pattern EMAIL_PATTERN = Pattern
			.compile("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
	public static final String CARACTERES = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	// Rutas Útiles
	public static final String RUTA_JASPER_REPORTS = PropertiesUtil.getProperty("eutanasia.ruta.jasper.reports");
	public static final String RUTA_SFTP_IMAGES_USUARIO = PropertiesUtil.getProperty("eutanasia.ruta.images.user");

	// Simbolos y constantes
	public static final String COMODIN_BD = "%";
	public static final String SEPARADOR_TAGS = ";";
	public static final String SEPARADOR_SLASH = "/";
	public static final String PHASE_CREATE = "C";
	public static final String PHASE_UPDATE = "U";
	public static final int TAMANO_TOKEN = 11;
	public static final int MAX_LENGTH_50 = 50;
	public static final int MAX_LENGTH_30 = 30;
	public static final int ITERATIONS = 10000;
	public static final int KEY_LENGTH = 256;
	public static final int SALT_ENCRIPTAR_CLAVE = 28;
	public static final char[] SIMBOLOS = CARACTERES.toCharArray();
	public static final char[] BUFFER = new char[TAMANO_TOKEN];

	// Mensajes
	public static final String ERROR_LOGIN_DATOS_INCORRECTOS_INACTIVOS = PropertiesUtil
			.getProperty("eutanasia.msg.login.datos.incorrectos");
	public static final String ERROR_LOGIN_DATOS_INSUFICIENTES = PropertiesUtil
			.getProperty("eutanasia.msg.login.datos.insuficientes");
	public static final String LLAVE_ENCRIPTAR = PropertiesUtil.getProperty("eutanasia.key.encrypt");
	public static final String VALOR_NULL_OBJETO = PropertiesUtil.getProperty("eutanasia.msg.validate.valor.objeto");
	public static final String VALOR_VACIO = PropertiesUtil.getProperty("eutanasia.msg.validate.valor.vacio");
	public static final String VALOR_INCORRECTO = PropertiesUtil.getProperty("eutanasia.msg.validate.valor.incorrecto");
	public static final String CORREO_NO_VALIDO = PropertiesUtil.getProperty("eutanasia.msg.validate.correoInvalido");
	public static final String TABLA_NO_ESTABLECIDA_VALIDACIONES = PropertiesUtil
			.getProperty("eutanasia.msg.validate.tabla.no.establecida");
	public static final String SUPERA_LONGITUD = PropertiesUtil
			.getProperty("eutanasia.msg.validate.valor.superaLongitud");
	public static final String MSG_USUARIO_REPETIDO = PropertiesUtil.getProperty("eutanasia.msg.validate.usuarioRepetido");
	

	// Labels
	public static final String ARCHIVO = PropertiesUtil.getProperty("lbl.archivo.archivo");
	public static final String NOMBRE_ARCHIVO = PropertiesUtil.getProperty("lbl.archivo.nombre");
	public static final String RUTA_ARCHIVO = PropertiesUtil.getProperty("lbl.archivo.ruta");

	public static final String USUARIO = PropertiesUtil.getProperty("lbl.usuario.usuario");
	public static final String NOMBRES_USUARIO = PropertiesUtil.getProperty("lbl.usuario.nombres");
	public static final String APELLIDOS_USUARIO = PropertiesUtil.getProperty("lbl.usuario.apellidos");
	public static final String RESENA_USUARIO = PropertiesUtil.getProperty("lbl.usuario.resena");
	public static final String CORREO_USUARIO = PropertiesUtil.getProperty("lbl.usuario.correo");
	public static final String FECHA_NACIMIENTO_USUARIO = PropertiesUtil.getProperty("lbl.usuario.fecha.nacimiento");
	public static final String CLAVE_USUARIO = PropertiesUtil.getProperty("lbl.usuario.clave");
	public static final String IMAGEN_USUARIO = PropertiesUtil.getProperty("lbl.usuario.imagen");

}
