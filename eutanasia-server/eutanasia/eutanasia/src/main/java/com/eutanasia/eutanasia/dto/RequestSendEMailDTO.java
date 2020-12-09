package com.eutanasia.eutanasia.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class RequestSendEMailDTO implements Serializable {

	private static final long serialVersionUID = -7979403290212524827L;

	private String desde;

	private List<String> para;

	private String asunto;

	private Map<String, String> parametros;

	public String getDesde() {
		return desde;
	}

	public void setDesde(String desde) {
		this.desde = desde;
	}

	public List<String> getPara() {
		return para;
	}

	public void setPara(List<String> para) {
		this.para = para;
	}

	public String getAsunto() {
		return asunto;
	}

	public void setAsunto(String asunto) {
		this.asunto = asunto;
	}

	public Map<String, String> getParametros() {
		return parametros;
	}

	public void setParametros(Map<String, String> parametros) {
		this.parametros = parametros;
	}
}
