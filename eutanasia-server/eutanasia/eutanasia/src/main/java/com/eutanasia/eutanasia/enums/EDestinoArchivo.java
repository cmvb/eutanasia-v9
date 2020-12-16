package com.eutanasia.eutanasia.enums;

public enum EDestinoArchivo {
	USER("USER"), POST("POST");

	private final String nombre;

	private EDestinoArchivo(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}
