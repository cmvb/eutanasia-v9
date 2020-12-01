package com.eutanasia.eutanasia.enums;

public enum ERolUsuario {
	VACIO("VACIO"), ADMINISTRADOR("AD"), FAN("FA"), CONTACTO_LABORAL("CL");

	private final String nombre;

	private ERolUsuario(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}
