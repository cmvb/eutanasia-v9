package com.eutanasia.eutanasia.dao;

import java.util.List;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.eutanasia.eutanasia.model.ComentarioTB;

@EnableTransactionManagement
public interface IComentariosDao {

	/*
	 * Método para consultar comentarios
	 */
	List<ComentarioTB> consultarComentariosPorIdPost(long idPost);

	/*
	 * Método para crear comentario
	 */
	ComentarioTB crearComentario(ComentarioTB comentario);

	/*
	 * Método para modificar comentario
	 */
	ComentarioTB modificarComentario(ComentarioTB comentario);

	/*
	 * Método para eliminar comentario
	 */
	void eliminarComentario(long idComentario);

}
