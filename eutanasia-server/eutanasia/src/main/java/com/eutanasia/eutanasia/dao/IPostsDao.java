package com.eutanasia.eutanasia.dao;

import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.eutanasia.eutanasia.model.PostTB;

@EnableTransactionManagement
public interface IPostsDao {

	/*
	 * Metodo para crear contact
	 */
	PostTB crear(PostTB contact);

}
