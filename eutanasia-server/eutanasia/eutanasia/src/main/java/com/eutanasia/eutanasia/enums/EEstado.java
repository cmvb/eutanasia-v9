package com.eutanasia.eutanasia.enums;

public enum EEstado {
	INACTIVO("I"), ACTIVO("A"), RECHAZADO("R");

	private final String nombre;

	private EEstado(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}
