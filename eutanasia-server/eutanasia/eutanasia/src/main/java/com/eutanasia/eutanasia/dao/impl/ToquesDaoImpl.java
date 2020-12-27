package com.eutanasia.eutanasia.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.eutanasia.eutanasia.dao.AbstractDao;
import com.eutanasia.eutanasia.dao.IToquesDao;
import com.eutanasia.eutanasia.model.ToqueTB;

@Repository
public class ToquesDaoImpl extends AbstractDao<ToqueTB> implements IToquesDao {

	@PersistenceContext(unitName = "default")
	private EntityManager em;

	@Override
	public List<ToqueTB> consultarToques() {
		// PARAMETROS
		Map<String, Object> pamameters = new HashMap<>();

		// QUERY
		StringBuilder JPQL = new StringBuilder("SELECT t FROM ToqueTB t WHERE 1 = 1 ");
		// Q. Order By
		JPQL.append(" ORDER BY t.descripcion");
		// END QUERY

		TypedQuery<ToqueTB> query = em.createQuery(JPQL.toString(), ToqueTB.class);
		pamameters.forEach((k, v) -> query.setParameter(k, v));

		return query.getResultList();
	}

}
