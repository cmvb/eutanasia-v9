package com.eutanasia.eutanasia.util;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import com.eutanasia.eutanasia.model.PostTB;

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

	public static List<String> validaDatos(PostTB contact) {
		List<String> errores = new ArrayList<>();

		// Validaciones nombre
		if (StringUtils.isBlank(contact.getName())) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_nombre") + VALOR_VACIO);
		} else if (!Util.tieneCantidadCharPermitida(contact.getName(), MAX_LENGTH_50)) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_nombre") + SUPERA_LONGITUD);
		}

		// Validaciones correo
		if (StringUtils.isBlank(contact.getEmail())) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_email") + VALOR_VACIO);
		} else if (!Util.esCorreoValido(contact.getEmail())) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_email") + CORREO_NO_VALIDO);
		} else if (!Util.tieneCantidadCharPermitida(contact.getEmail(), MAX_LENGTH_30)) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_email") + SUPERA_LONGITUD);
		}

		// Validaciones departamento
		if (StringUtils.isBlank(contact.getState())) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_departamento") + VALOR_VACIO);
		} else if (!Util.tieneCantidadCharPermitida(contact.getState(), MAX_LENGTH_30)) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_departamento") + SUPERA_LONGITUD);
		}

		// Validaciones ciudad
		if (StringUtils.isBlank(contact.getCity())) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_ciudad") + VALOR_VACIO);
		} else if (!Util.tieneCantidadCharPermitida(contact.getCity(), MAX_LENGTH_50)) {
			errores.add(PropertiesUtil.getProperty("lbl_mtto_contact_ciudad") + SUPERA_LONGITUD);
		}

		return errores;
	}

}