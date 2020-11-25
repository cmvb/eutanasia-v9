package com.eutanasia.eutanasia.enums;

public enum ECategoriaPost {
	INVITACION_EVENTO("IE"), AGRADECIMIENTOS_SALUDOS("AS"), CRITICAS("C"), FRENETICO_ROCK_N_ROLL("FRR"),
	NOTICIAS_MUNDIALES("NM");

	private final String nombre;

	private ECategoriaPost(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

}
