package com.eutanasia.eutanasia.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.sun.istack.NotNull;

@Entity
@Table(name = "eu_toque_tb")
public class ToqueTB extends BaseEntidadTB implements Serializable {
	private static final long serialVersionUID = 3003078345387807851L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
	@Column(name = "eto_id", nullable = false, length = 19)
	private long id;

	@NotNull
	@Column(name = "eto_nombre", nullable = false, length = 100)
	private String nombre;

	@NotNull
	@Column(name = "eto_descripcion", nullable = false, length = 1000)
	private String descripcion;

	@Column(name = "eto_valor_boleta", nullable = false)
	private double valorBoleta;

	@Column(name = "eto_valor_boleta_promo", nullable = false)
	private double valorBoletaPromo;

	@Column(name = "eto_capacidad", nullable = false)
	private long capacidad;

	@NotNull
	@Column(name = "eto_ciudad", nullable = false, length = 100)
	private String ciudad;

	@NotNull
	@Column(name = "eto_url_poster", nullable = false, length = 1000)
	private String urlPoster;

	@Column(name = "eto_organizador", nullable = false, length = 100)
	private String organizador;

	@NotNull
	@Column(name = "eto_fecha", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date fecha;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public double getValorBoleta() {
		return valorBoleta;
	}

	public void setValorBoleta(double valorBoleta) {
		this.valorBoleta = valorBoleta;
	}

	public double getValorBoletaPromo() {
		return valorBoletaPromo;
	}

	public void setValorBoletaPromo(double valorBoletaPromo) {
		this.valorBoletaPromo = valorBoletaPromo;
	}

	public long getCapacidad() {
		return capacidad;
	}

	public void setCapacidad(long capacidad) {
		this.capacidad = capacidad;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getUrlPoster() {
		return urlPoster;
	}

	public void setUrlPoster(String urlPoster) {
		this.urlPoster = urlPoster;
	}

	public String getOrganizador() {
		return organizador;
	}

	public void setOrganizador(String organizador) {
		this.organizador = organizador;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

}
