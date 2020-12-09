package com.eutanasia.eutanasia.enums;

public enum EGenero {
	VACIO("VACIO"), MASCULINO("MASCULINO"), FEMENINO("FEMENINO"), OTRO("OTRO");

	private final String nombre;

	private EGenero(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}
