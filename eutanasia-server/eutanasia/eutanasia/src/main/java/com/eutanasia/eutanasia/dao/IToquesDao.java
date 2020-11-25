package com.eutanasia.eutanasia.dao;

import java.util.List;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.eutanasia.eutanasia.model.ToqueTB;

@EnableTransactionManagement
public interface IToquesDao {

	/*
	 * Método para consultar toques
	 */
	List<ToqueTB> consultarToques();

}
