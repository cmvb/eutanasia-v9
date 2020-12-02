package com.eutanasia.eutanasia.dao.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.eutanasia.eutanasia.dao.AbstractDao;
import com.eutanasia.eutanasia.dao.IUsuariosDao;
import com.eutanasia.eutanasia.model.UsuarioAutorTB;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;

@Repository
public class UsuariosDaoImpl extends AbstractDao<UsuarioAutorTB> implements IUsuariosDao {

	@PersistenceContext(unitName = "default")
	private EntityManager em;

	@Override
	public List<UsuarioAutorTB> consultarUsuariosPorUsuario(String usuario) {
		// PARAMETROS
		Map<String, Object> pamameters = new HashMap<>();

		// QUERY
		StringBuilder JPQL = new StringBuilder("SELECT t FROM UsuarioAutorTB t WHERE 1 = 1 ");
		// WHERE
		if (!StringUtils.isBlank(usuario)) {
			JPQL.append("AND t.usuario = :USUARIO ");
			pamameters.put("USUARIO", usuario);
		}
		// Q. Order By
		JPQL.append(" ORDER BY t.id");
		// END QUERY

		TypedQuery<UsuarioAutorTB> query = em.createQuery(JPQL.toString(), UsuarioAutorTB.class);
		pamameters.forEach((k, v) -> query.setParameter(k, v));

		return query.getResultList();
	}

	@Override
	public UsuarioAutorTB crearUsuario(UsuarioAutorTB usuarioAutor) {
		usuarioAutor = colocarValoresDefecto(usuarioAutor, ConstantesValidaciones.PHASE_CREATE);
		super.create(usuarioAutor);
		return usuarioAutor;
	}

	@Override
	public UsuarioAutorTB modificarUsuario(UsuarioAutorTB usuarioAutor) {
		usuarioAutor = colocarValoresDefecto(usuarioAutor, ConstantesValidaciones.PHASE_UPDATE);
		super.update(usuarioAutor);
		return usuarioAutor;
	}

	@Override
	public void eliminarUsuario(long idUsuario) {
		super.deleteById(idUsuario);
	}

	private UsuarioAutorTB colocarValoresDefecto(UsuarioAutorTB usuarioAutor, String fase) {
		if (ConstantesValidaciones.PHASE_CREATE.equalsIgnoreCase(fase)) {
			usuarioAutor.setFechaCreacion(new Date());
			usuarioAutor.setUsuarioCreacion("SYSTEM");
		}
		usuarioAutor.setFechaActualizacion(new Date());
		usuarioAutor.setUsuarioActualizacion("SYSTEM");
		return usuarioAutor;
	}

}
