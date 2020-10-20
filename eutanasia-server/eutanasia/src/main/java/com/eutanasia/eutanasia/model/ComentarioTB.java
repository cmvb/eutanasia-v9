package com.eutanasia.eutanasia.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	@Column(name = "eco_idPost", nullable = false, length = 10)
	private long idPost;

	@Column(name = "eco_idComentarioRespuesta", nullable = false, length = 10)
	private long idComentarioRespuesta;

	@NotNull
	@Column(name = "eco_autor", nullable = false, length = 100)
	private String autor;

	@NotNull
	@Column(name = "eco_correoAutor", nullable = false, length = 100)
	private String correoAutor;

	@NotNull
	@Column(name = "eco_comentario", nullable = false, length = 1000)
	private String comentario;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getIdPost() {
		return idPost;
	}

	public void setIdPost(long idPost) {
		this.idPost = idPost;
	}

	public long getIdComentarioRespuesta() {
		return idComentarioRespuesta;
	}

	public void setIdComentarioRespuesta(long idComentarioRespuesta) {
		this.idComentarioRespuesta = idComentarioRespuesta;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getCorreoAutor() {
		return correoAutor;
	}

	public void setCorreoAutor(String correoAutor) {
		this.correoAutor = correoAutor;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

}
