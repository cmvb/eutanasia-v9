package com.eutanasia.eutanasia.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

public abstract class Util {

	public static final Pattern EMAIL_PATTERN = Pattern
			.compile("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
	public static final String VALOR_VACIO = PropertiesUtil.getProperty("sigmatest.msg.validate.valor.vacio");
	public static final String CORREO_NO_VALIDO = PropertiesUtil.getProperty("sigmatest.msg.validate.correoInvalido");
	public static final String SUPERA_LONGITUD = PropertiesUtil
			.getProperty("sigmatest.msg.validate.valor.superaLongitud");
	public static final int MAX_LENGTH_50 = 50;
	public static final int MAX_LENGTH_30 = 30;

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

		return errores;
	}

}