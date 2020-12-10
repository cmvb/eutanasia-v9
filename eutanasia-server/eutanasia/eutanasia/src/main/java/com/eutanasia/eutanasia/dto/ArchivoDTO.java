package com.eutanasia.eutanasia.dto;

import java.io.Serializable;

//@XmlRootElement
public class ArchivoDTO implements Serializable {
	private static final long serialVersionUID = -93749543131258839L;

	String nombreArchivo;
	byte[] archivo;
	String rutaArchivo;
	int destinoArchivo;

	public String getNombreArchivo() {
		return nombreArchivo;
	}

	public void setNombreArchivo(String nombreArchivo) {
		this.nombreArchivo = nombreArchivo;
	}

	public byte[] getArchivo() {
		return archivo;
	}

	public void setArchivo(byte[] archivo) {
		this.archivo = archivo;
	}

	public String getRutaArchivo() {
		return rutaArchivo;
	}

	public void setRutaArchivo(String rutaArchivo) {
		this.rutaArchivo = rutaArchivo;
	}

	public int getDestinoArchivo() {
		return destinoArchivo;
	}

	public void setDestinoArchivo(int destinoArchivo) {
		this.destinoArchivo = destinoArchivo;
	}

}
