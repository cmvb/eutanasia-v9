package com.eutanasia.eutanasia.dao;

import java.util.List;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.eutanasia.eutanasia.model.UsuarioAutorTB;

@EnableTransactionManagement
public interface IUsuariosDao {

	/*
	 * Método para consultar usuarios
	 */
	List<UsuarioAutorTB> consultarUsuariosPorUsuario(String usuario);

	/*
	 * Método para crear usuario
	 */
	UsuarioAutorTB crearUsuario(UsuarioAutorTB usuarioAutor);

	/*
	 * Método para modificar usuario
	 */
	UsuarioAutorTB modificarUsuario(UsuarioAutorTB usuarioAutor);

	/*
	 * Método para eliminar usuario
	 */
	void eliminarUsuario(long idUsuario);

}