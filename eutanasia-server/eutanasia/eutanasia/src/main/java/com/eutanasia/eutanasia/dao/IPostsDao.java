package com.eutanasia.eutanasia.dao;

import java.util.List;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.eutanasia.eutanasia.dto.CategoriasDTO;
import com.eutanasia.eutanasia.model.PostTB;

@EnableTransactionManagement
public interface IPostsDao {

	/*
	 * Método para consultar posts
	 */
	List<PostTB> consultarPosts();

	/*
	 * Método para consultar posts
	 */
	CategoriasDTO consultarContadorCategoriasPosts();
	
	/*
	 * Método para consultar los posts por filtros ordenados por más recientes
	 */
	public List<PostTB> consultarPostsPorFiltros(PostTB filtroPost);

	/*
	 * Método para crear post
	 */
	PostTB crearPost(PostTB post);

	/*
	 * Método para modificar post
	 */
	PostTB modificarPost(PostTB post);

	/*
	 * Método para eliminar post
	 */
	void eliminarPost(long idPost);

}
