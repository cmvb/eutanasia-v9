package com.eutanasia.eutanasia.dao.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.eutanasia.eutanasia.dao.AbstractDao;
import com.eutanasia.eutanasia.dao.IComentariosDao;
import com.eutanasia.eutanasia.model.ComentarioTB;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;

@Repository
public class ComentariosDaoImpl extends AbstractDao<ComentarioTB> implements IComentariosDao {

	@PersistenceContext(unitName = "default")
	private EntityManager em;

	@Override
	public List<ComentarioTB> consultarComentariosPorIdPost(long idPost) {
		// PARAMETROS
		Map<String, Object> pamameters = new HashMap<>();

		// QUERY
		StringBuilder JPQL = new StringBuilder("SELECT t FROM ComentarioTB t WHERE 1 = 1 ");
		// WHERE
		if (idPost > 0) {
			JPQL.append("AND t.idPost = :ID_POST ");
			pamameters.put("ID_POST", idPost);
		}
		// Q. Order By
		JPQL.append(" ORDER BY t.id");
		// END QUERY

		TypedQuery<ComentarioTB> query = em.createQuery(JPQL.toString(), ComentarioTB.class);
		pamameters.forEach((k, v) -> query.setParameter(k, v));

		return query.getResultList();
	}

	@Override
	public ComentarioTB crearComentario(ComentarioTB comentario) {
		comentario = colocarValoresDefecto(comentario, ConstantesValidaciones.PHASE_CREATE);
		super.create(comentario);
		return comentario;
	}

	@Override
	public ComentarioTB modificarComentario(ComentarioTB comentario) {
		comentario = colocarValoresDefecto(comentario, ConstantesValidaciones.PHASE_UPDATE);
		super.update(comentario);
		return comentario;
	}

	@Override
	public void eliminarComentario(long idComentario) {
		super.deleteById(idComentario);
	}

	private ComentarioTB colocarValoresDefecto(ComentarioTB comentario, String fase) {
		if (ConstantesValidaciones.PHASE_CREATE.equalsIgnoreCase(fase)) {
			comentario.setFechaCreacion(new Date());
			comentario.setUsuarioCreacion("SYSTEM");
		}
		comentario.setFechaActualizacion(new Date());
		comentario.setUsuarioActualizacion("SYSTEM");
		return comentario;
	}

}
