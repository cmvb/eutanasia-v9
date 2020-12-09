package com.eutanasia.eutanasia.dao;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.eutanasia.eutanasia.dto.PostMeGustaDTO;
import com.eutanasia.eutanasia.model.MeGustaTB;
import com.eutanasia.eutanasia.model.PostTB;

@EnableTransactionManagement
public interface IMeGustaDao {
	/*
	 * Método para consultar puntaje me gusta con toda la información
	 */
	PostMeGustaDTO consultarCalificacionMG(PostTB filtroPost);

	/*
	 * Método para crear MeGusta
	 */
	MeGustaTB crearMeGusta(MeGustaTB meGusta);

	/*
	 * Método para modificar MeGusta
	 */
	MeGustaTB modificarMeGusta(MeGustaTB meGusta);

	/*
	 * Método para eliminar MeGusta
	 */
	void eliminarMeGusta(long idMeGusta);

}
