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
import com.eutanasia.eutanasia.dao.IPostsDao;
import com.eutanasia.eutanasia.dto.CategoriasDTO;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;

@Repository
public class PostsDaoImpl extends AbstractDao<PostTB> implements IPostsDao {

	@PersistenceContext(unitName = "default")
	private EntityManager em;

	@Override
	public List<PostTB> consultarPosts() {
		// PARAMETROS
		Map<String, Object> pamameters = new HashMap<>();

		// QUERY
		StringBuilder JPQL = new StringBuilder("SELECT t FROM PostTB t WHERE 1 = 1 ");
		// Q. Order By
		JPQL.append(" ORDER BY t.id");
		// END QUERY

		TypedQuery<PostTB> query = em.createQuery(JPQL.toString(), PostTB.class);
		pamameters.forEach((k, v) -> query.setParameter(k, v));

		return query.getResultList();
	}

	@Override
	public List<PostTB> consultarPostsPorFiltros(PostTB filtroPost) {
		// PARAMETROS
		Map<String, Object> pamameters = new HashMap<>();

		// QUERY
		StringBuilder JPQL = new StringBuilder("SELECT t FROM PostTB t WHERE 1 = 1 ");
		// WHERE
		if (filtroPost.getId() > 0) {
			JPQL.append(" AND t.idPost = :ID_POST ");
			pamameters.put("ID_POST", filtroPost.getId());
		}
		if (filtroPost.getUsuarioAutorTB() != null
				&& !StringUtils.isBlank(filtroPost.getUsuarioAutorTB().getNombres())) {
			JPQL.append(" AND UPPERCASE(t.autor) LIKE ").append(ConstantesValidaciones.COMODIN_BD)
					.append("UPPERCASE(:AUTOR_POST)").append(ConstantesValidaciones.COMODIN_BD);
			pamameters.put("AUTOR_POST", filtroPost.getUsuarioAutorTB().getNombres());
		}
		if (!StringUtils.isBlank(filtroPost.getTitulo())) {
			JPQL.append(" AND UPPERCASE(t.titulo) LIKE ").append(ConstantesValidaciones.COMODIN_BD)
					.append("UPPERCASE(:TITULO_POST)").append(ConstantesValidaciones.COMODIN_BD);
			pamameters.put("TITULO_POST", filtroPost.getTitulo());
		}
		if (filtroPost.getCategoria() > 0) {
			JPQL.append(" AND t.categoria = :CATEGORIA_POST ");
			pamameters.put("CATEGORIA_POST", filtroPost.getCategoria());
		}
		if (filtroPost.getEstado() > 0) {
			JPQL.append(" AND t.estado = :ESTADO_POST ");
			pamameters.put("ESTADO_POST", filtroPost.getEstado());
		}
		if (!StringUtils.isBlank(filtroPost.getTags())) {
			JPQL.append(" AND UPPERCASE(t.tags) LIKE ").append(ConstantesValidaciones.COMODIN_BD)
					.append("UPPERCASE(:TAG_POST)").append(ConstantesValidaciones.COMODIN_BD);
			pamameters.put("TAG_POST", filtroPost.getTags());
		}
		// Q. Order By
		JPQL.append(" ORDER BY t.fechaActualizacion DESC");
		// END QUERY

		TypedQuery<PostTB> query = em.createQuery(JPQL.toString(), PostTB.class);
		pamameters.forEach((k, v) -> query.setParameter(k, v));

		return query.getResultList();
	}

	@Override
	public CategoriasDTO consultarContadorCategoriasPosts() {
		CategoriasDTO result = null;

		// PARAMETROS
		Map<String, Object> pamameters = new HashMap<>();

		// QUERY
		StringBuilder JPQL = new StringBuilder("SELECT t FROM PostTB t WHERE 1 = 1 ");
		// Q. Order By
		JPQL.append(" ORDER BY t.id");
		// END QUERY

		TypedQuery<PostTB> query = em.createQuery(JPQL.toString(), PostTB.class);
		pamameters.forEach((k, v) -> query.setParameter(k, v));

		long invitacionesEvento = 0;
		long agradecimientosSaludos = 0;
		long criticas = 0;
		long freneticoRockNRoll = 0;
		long noticiasMundiales = 0;

		List<PostTB> listaPost = query.getResultList();
		for (PostTB postTb : listaPost) {
			switch ((int) postTb.getEstado()) {
			case 0:
				invitacionesEvento++;
				break;
			case 1:
				agradecimientosSaludos++;
				break;
			case 2:
				criticas++;
				break;
			case 3:
				freneticoRockNRoll++;
				break;
			case 4:
				noticiasMundiales++;
				break;
			}
		}

		result = new CategoriasDTO(agradecimientosSaludos, criticas, freneticoRockNRoll, invitacionesEvento,
				noticiasMundiales);
		result.setAgradecimientosSaludos(agradecimientosSaludos);
		result.setCriticas(criticas);
		result.setFreneticoRockNRoll(freneticoRockNRoll);
		result.setInvitacionesEvento(invitacionesEvento);
		result.setNoticiasMundiales(noticiasMundiales);

		return result;
	}

	@Override
	public PostTB crearPost(PostTB post) {
		post = colocarValoresDefecto(post);
		super.create(post);
		return post;
	}

	@Override
	public PostTB modificarPost(PostTB post) {
		post = colocarValoresDefecto(post);
		super.update(post);
		return post;
	}

	@Override
	public void eliminarPost(long idPost) {
		super.deleteById(idPost);
	}

	private PostTB colocarValoresDefecto(PostTB post) {
		if (post.getId() > 0) {
			post.setFechaCreacion(new Date());
		}
		post.setFechaActualizacion(new Date());
		post.setUsuarioCreacion("SYSTEM");
		post.setUsuarioActualizacion("SYSTEM");
		return post;
	}

}
