package com.eutanasia.eutanasia.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name = "contacts")
public class ComentarioTB extends BaseEntidadTB implements Serializable {
	private static final long serialVersionUID = 1512069790193136335L;

	@Id
	@NotNull
	@Column(name = "id", nullable = false, length = 10)
	private long id;

	@NotNull
	@Column(name = "name", nullable = false, length = 191)
	private String name;

	@NotNull
	@Column(name = "email", nullable = false, length = 191, unique = true)
	private String email;

	@NotNull
	@Column(name = "state", nullable = false, length = 191)
	private String state;

	@NotNull
	@Column(name = "city", nullable = false, length = 191)
	private String city;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
