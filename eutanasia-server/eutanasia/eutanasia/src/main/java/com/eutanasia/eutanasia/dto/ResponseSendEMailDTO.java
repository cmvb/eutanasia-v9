package com.eutanasia.eutanasia.dto;

import java.io.Serializable;
import java.util.List;

public class ResponseSendEMailDTO implements Serializable {

	private static final long serialVersionUID = -6507754974560455103L;

	private boolean exitoso;

	private String mensaje;

	private List<String> correosEnviados;

	private List<String> correosNoEnviados;

	public boolean isExitoso() {
		return exitoso;
	}

	public void setExitoso(boolean exitoso) {
		this.exitoso = exitoso;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public List<String> getCorreosEnviados() {
		return correosEnviados;
	}

	public void setCorreosEnviados(List<String> correosEnviados) {
		this.correosEnviados = correosEnviados;
	}

	public List<String> getCorreosNoEnviados() {
		return correosNoEnviados;
	}

	public void setCorreosNoEnviados(List<String> correosNoEnviados) {
		this.correosNoEnviados = correosNoEnviados;
	}

}
