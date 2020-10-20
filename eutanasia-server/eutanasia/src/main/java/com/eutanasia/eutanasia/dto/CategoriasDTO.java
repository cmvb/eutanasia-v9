package com.eutanasia.eutanasia.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

//@XmlRootElement
@Getter
@Setter
public class UbicacionDTO implements Serializable {
	private static final long serialVersionUID = 1512069790193136335L;

	private long idUbicacion;
	private String codigoCiudad;
	private String nombreCiudad;
	private String codigoDepartamento;
	private String nombreDepartamento;
	private String codigoPais;
	private String nombrePais;
	private int tipoUbicacion;
}
