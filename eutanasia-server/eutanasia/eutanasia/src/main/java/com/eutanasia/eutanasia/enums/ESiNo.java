package com.eutanasia.eutanasia.enums;

public enum ESiNo {
	NO("NO"), SI("SI");

	private final String nombre;

	private ESiNo(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}
