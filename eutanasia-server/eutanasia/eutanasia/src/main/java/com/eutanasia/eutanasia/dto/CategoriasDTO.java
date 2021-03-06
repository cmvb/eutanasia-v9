package com.eutanasia.eutanasia.dto;

import java.io.Serializable;

//@XmlRootElement
public class CategoriasDTO implements Serializable {

	private static final long serialVersionUID = 945410922686126463L;

	private long invitacionesEvento;
	private long agradecimientosSaludos;
	private long criticas;
	private long freneticoRockNRoll;
	private long noticiasMundiales;

	public CategoriasDTO(long invitacionesEvento, long agradecimientosSaludos, long criticas, long freneticoRockNRoll,
			long noticiasMundiales) {
		this.invitacionesEvento = invitacionesEvento;
		this.agradecimientosSaludos = agradecimientosSaludos;
		this.criticas = criticas;
		this.freneticoRockNRoll = freneticoRockNRoll;
		this.noticiasMundiales = noticiasMundiales;
	}

	public long getInvitacionesEvento() {
		return invitacionesEvento;
	}

	public void setInvitacionesEvento(long invitacionesEvento) {
		this.invitacionesEvento = invitacionesEvento;
	}

	public long getAgradecimientosSaludos() {
		return agradecimientosSaludos;
	}

	public void setAgradecimientosSaludos(long agradecimientosSaludos) {
		this.agradecimientosSaludos = agradecimientosSaludos;
	}

	public long getCriticas() {
		return criticas;
	}

	public void setCriticas(long criticas) {
		this.criticas = criticas;
	}

	public long getFreneticoRockNRoll() {
		return freneticoRockNRoll;
	}

	public void setFreneticoRockNRoll(long freneticoRockNRoll) {
		this.freneticoRockNRoll = freneticoRockNRoll;
	}

	public long getNoticiasMundiales() {
		return noticiasMundiales;
	}

	public void setNoticiasMundiales(long noticiasMundiales) {
		this.noticiasMundiales = noticiasMundiales;
	}

}
