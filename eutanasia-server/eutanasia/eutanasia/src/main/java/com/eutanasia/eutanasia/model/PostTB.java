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
@Table(name = "eu_post_tb")
public class PostTB extends BaseEntidadTB implements Serializable {
	private static final long serialVersionUID = 6673309064153377654L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@NotNull
	@Column(name = "epo_id", nullable = false, length = 19)
	private long id;

	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "eua_id")
	private UsuarioAutorTB usuarioAutorTB;

	@NotNull
	@Column(name = "epo_titulo", nullable = false, length = 100)
	private String titulo;

	@NotNull
	@Column(name = "epo_subtitulo", nullable = false, length = 200)
	private String subtitulo;

	@NotNull
	@Column(name = "epo_articulo", nullable = false, length = 1000)
	private String articulo;

	@NotNull
	@Column(name = "epo_url_imagen", nullable = false, length = 1000)
	private String urlImagen;

	@NotNull
	@Column(name = "epo_tags", nullable = false, length = 100)
	private String tags;

	@NotNull
	@Column(name = "epo_categoria", nullable = false)
	private short categoria;

	@NotNull
	@Column(name = "epo_cantidad_comentarios", nullable = false)
	private long cantidadComentarios;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getSubtitulo() {
		return subtitulo;
	}

	public void setSubtitulo(String subtitulo) {
		this.subtitulo = subtitulo;
	}

	public String getArticulo() {
		return articulo;
	}

	public void setArticulo(String articulo) {
		this.articulo = articulo;
	}

	public String getUrlImagen() {
		return urlImagen;
	}

	public void setUrlImagen(String urlImagen) {
		this.urlImagen = urlImagen;
	}

	public UsuarioAutorTB getUsuarioAutorTB() {
		return usuarioAutorTB;
	}

	public void setUsuarioAutorTB(UsuarioAutorTB usuarioAutorTB) {
		this.usuarioAutorTB = usuarioAutorTB;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public short getCategoria() {
		return categoria;
	}

	public void setCategoria(short categoria) {
		this.categoria = categoria;
	}

	public long getCantidadComentarios() {
		return cantidadComentarios;
	}

	public void setCantidadComentarios(long cantidadComentarios) {
		this.cantidadComentarios = cantidadComentarios;
	}

}
