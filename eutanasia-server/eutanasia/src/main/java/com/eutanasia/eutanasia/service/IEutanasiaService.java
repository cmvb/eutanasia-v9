package com.eutanasia.eutanasia.service;

import java.util.List;

import com.eutanasia.eutanasia.dto.CategoriasDTO;
import com.eutanasia.eutanasia.model.ComentarioTB;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.model.ToqueTB;

public interface IEutanasiaService {

	/*
	 * Método para consultar toques
	 */
	public List<ToqueTB> consultarToques();

	/*
	 * Método para consultar los contadores de categorías
	 */
	public CategoriasDTO consultarContadorCategoriasPosts();

	/*
	 * Método para consultar los posts por filtros ordenados por más recientes
	 */
	public List<PostTB> consultarPostsPorFiltros(PostTB filtroPost);

	/*
	 * Método para consultar posts
	 */
	public List<PostTB> consultarPosts();

	/*
	 * Método para consultar comentarios por el id del post
	 */
	public List<ComentarioTB> consultarComentariosPorIdPost(long idPost);

	/*
	 * Método para crear post
	 */
	public PostTB crearPost(PostTB post);

	/*
	 * Método para crear comentario
	 */
	public ComentarioTB crearComentario(ComentarioTB comentario);

	/*
	 * Método para modificar post
	 */
	public PostTB modificarPost(PostTB post);

	/*
	 * Método para modificar comentario
	 */
	public ComentarioTB modificarComentario(ComentarioTB comentario);

	/*
	 * Método para eliminar post
	 */
	public void eliminarPost(long idPost);

	/*
	 * Método para eliminar comentario
	 */
	public void eliminarComentario(long idComentario);

}
