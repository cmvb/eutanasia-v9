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
@Table(name = "eu_usuario_autor_tb")
public class UsuarioAutorTB extends BaseEntidadTB implements Serializable {
	private static final long serialVersionUID = 423471864659189490L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
	@Column(name = "eua_id", nullable = false, length = 19)
	private long id;

	@NotNull
	@Column(name = "eua_nombres", nullable = false, length = 100)
	private String nombres;

	@NotNull
	@Column(name = "eua_apellidos", nullable = false, length = 1000)
	private String apellidos;

	@NotNull
	@Column(name = "eua_usuario", nullable = false, length = 1000)
	private String usuario;

	@NotNull
	@Column(name = "eua_password", nullable = false, length = 1000)
	private String password;

	@NotNull
	@Column(name = "eua_rol", nullable = false)
	private int rol;

	@NotNull
	@Column(name = "eua_correo", nullable = false, length = 100)
	private String correo;

	@NotNull
	@Column(name = "eua_fecha_nacimiento", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date fechaNacimiento;

	@NotNull
	@Column(name = "eua_url_imagen", nullable = false, length = 100)
	private String urlImagen;

	@NotNull
	@Column(name = "eua_resena", nullable = false, length = 500)
	private String resena;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getRol() {
		return rol;
	}

	public void setRol(int rol) {
		this.rol = rol;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getUrlImagen() {
		return urlImagen;
	}

	public void setUrlImagen(String urlImagen) {
		this.urlImagen = urlImagen;
	}

	public String getResena() {
		return resena;
	}

	public void setResena(String resena) {
		this.resena = resena;
	}

}
