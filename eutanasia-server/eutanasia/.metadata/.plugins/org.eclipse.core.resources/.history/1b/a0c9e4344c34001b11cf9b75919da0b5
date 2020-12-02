package com.eutanasia.eutanasia.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name = "eu_me_gusta_tb")
public class MeGustaTB extends BaseEntidadTB implements Serializable {
	private static final long serialVersionUID = 4663312086764973066L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
	@Column(name = "emg_id", nullable = false, length = 19)
	private long id;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "eua_id")
	private UsuarioAutorTB usuarioAutorTB;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "epo_id")
	private PostTB postTB;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public UsuarioAutorTB getUsuarioAutorTB() {
		return usuarioAutorTB;
	}

	public void setUsuarioAutorTB(UsuarioAutorTB usuarioAutorTB) {
		this.usuarioAutorTB = usuarioAutorTB;
	}

	public PostTB getPostTB() {
		return postTB;
	}

	public void setPostTB(PostTB postTB) {
		this.postTB = postTB;
	}

}
