package com.eutanasia.eutanasia.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sun.istack.NotNull;

@Entity
@Table(name = "eu_comentario_tb")
public class ComentarioTB extends BaseEntidadTB implements Serializable {
	private static final long serialVersionUID = -1787166402117947907L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
	@Column(name = "eco_id", nullable = false, length = 19)
	private long id;

	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "eua_id")
	private UsuarioAutorTB usuarioAutorTB;

	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "epo_id")
	private PostTB postTB;

	@Column(name = "eco_id_comentario_respuesta", nullable = false, length = 19)
	private long idComentarioRespuesta;

	@NotNull
	@Column(name = "eco_comentario", nullable = false, length = 1000)
	private String comentario;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public PostTB getPostTB() {
		return postTB;
	}

	public void setPostTB(PostTB postTB) {
		this.postTB = postTB;
	}

	public UsuarioAutorTB getUsuarioAutorTB() {
		return usuarioAutorTB;
	}

	public void setUsuarioAutorTB(UsuarioAutorTB usuarioAutorTB) {
		this.usuarioAutorTB = usuarioAutorTB;
	}

	public long getIdComentarioRespuesta() {
		return idComentarioRespuesta;
	}

	public void setIdComentarioRespuesta(long idComentarioRespuesta) {
		this.idComentarioRespuesta = idComentarioRespuesta;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

}
