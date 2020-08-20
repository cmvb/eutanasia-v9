package com.eutanasia.eutanasia.dao.impl;

import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.eutanasia.eutanasia.dao.AbstractDao;
import com.eutanasia.eutanasia.dao.IPostsDao;
import com.eutanasia.eutanasia.model.PostTB;

@Repository
public class PostsDaoImpl extends AbstractDao<PostTB> implements IPostsDao {

	@PersistenceContext(unitName = "default")
	private EntityManager em;

	@Override
	public PostTB crear(PostTB ubicacion) {
		ubicacion = colocarValoresDefecto(ubicacion);
		super.create(ubicacion);
		return ubicacion;
	}

	private PostTB colocarValoresDefecto(PostTB contact) {
		contact.setCreated_at(new Date());
		contact.setUpdated_at(new Date());
		return contact;
	}

}
