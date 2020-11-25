package com.eutanasia.eutanasia.dao;

import java.io.Serializable;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class AbstractDao<T extends Serializable> {

	private Class<T> clazz;

	@PersistenceContext
	EntityManager entityManager;

	public final void setClazz(Class<T> clazzToSet) {
		this.clazz = clazzToSet;
	}

	public T findOne(long id) {
		return this.entityManager.find(clazz, id);
	}

	@SuppressWarnings("unchecked")
	public List<T> findAll() {
		return this.entityManager.createQuery("from " + clazz.getName()).getResultList();
	}

	public void create(T entity) {
		this.entityManager.persist(entity);
	}

	public T update(T entity) {
		return this.entityManager.merge(entity);
	}

	public void deleteById(long entityId) {
		T entity = findOne(entityId);
		this.entityManager.remove(entity);
	}

	public void flushCommitEM() {
		this.entityManager.flush();
	}
}