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
import com.eutanasia.eutanasia.dao.IMeGustaDao;
import com.eutanasia.eutanasia.dto.PostMeGustaDTO;
import com.eutanasia.eutanasia.model.MeGustaTB;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;

@Repository
public class MeGustaDaoImpl extends AbstractDao<MeGustaTB> implements IMeGustaDao {

	@PersistenceContext(unitName = "default")
	private EntityManager em;

	@Override
	public PostMeGustaDTO consultarCalificacionMG(PostTB filtroPost) {
		PostMeGustaDTO result = new PostMeGustaDTO();

		// PARAMETROS
		Map<String, Object> pamameters = new HashMap<>();

		// QUERY
		StringBuilder JPQL = new StringBuilder("SELECT t FROM MeGustaTB t WHERE 1 = 1 ");
		// WHERE
		if (filtroPost.getId() > 0) {
			JPQL.append(" AND t.postTB.id = :ID_POST ");
			pamameters.put("ID_POST", filtroPost.getId());
		}
		// Q. Order By
		JPQL.append(" ORDER BY t.id DESC");
		// END QUERY

		TypedQuery<MeGustaTB> query = em.createQuery(JPQL.toString(), MeGustaTB.class);
		pamameters.forEach((k, v) -> query.setParameter(k, v));
		List<MeGustaTB> listaMeGusta = query.getResultList();

		if (listaMeGusta != null && !listaMeGusta.isEmpty()) {
			int sumatoria = 0;
			for (MeGustaTB meGusta : listaMeGusta) {
				sumatoria = sumatoria + meGusta.getCalificacion();
			}
			result.setPromedioCalificacion((double) sumatoria / listaMeGusta.size());
			result.setListaMeGusta(listaMeGusta);
			result.setPostTB(listaMeGusta.get(0).getPostTB());
		}

		return result;
	}

	@Override
	public MeGustaTB crearMeGusta(MeGustaTB meGusta) {
		meGusta = colocarValoresDefecto(meGusta, ConstantesValidaciones.PHASE_CREATE);
		super.create(meGusta);
		return meGusta;
	}

	@Override
	public MeGustaTB modificarMeGusta(MeGustaTB meGusta) {
		meGusta = colocarValoresDefecto(meGusta, ConstantesValidaciones.PHASE_UPDATE);
		super.update(meGusta);
		return meGusta;
	}

	@Override
	public void eliminarMeGusta(long idMeGusta) {
		super.deleteById(idMeGusta);
	}

	private MeGustaTB colocarValoresDefecto(MeGustaTB meGusta, String fase) {
		if (ConstantesValidaciones.PHASE_CREATE.equalsIgnoreCase(fase)) {
			meGusta.setFechaCreacion(new Date());
			meGusta.setUsuarioCreacion("SYSTEM");
		}
		meGusta.setFechaActualizacion(new Date());
		meGusta.setUsuarioActualizacion("SYSTEM");
		return meGusta;
	}

}
