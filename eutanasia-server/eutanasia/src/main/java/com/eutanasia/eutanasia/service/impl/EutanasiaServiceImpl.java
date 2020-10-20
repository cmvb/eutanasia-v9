package com.eutanasia.eutanasia.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eutanasia.eutanasia.dao.IComentariosDao;
import com.eutanasia.eutanasia.dao.IPostsDao;
import com.eutanasia.eutanasia.dao.IToquesDao;
import com.eutanasia.eutanasia.dto.CategoriasDTO;
import com.eutanasia.eutanasia.model.ComentarioTB;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.model.ToqueTB;
import com.eutanasia.eutanasia.service.IEutanasiaService;

@Service
public class EutanasiaServiceImpl implements IEutanasiaService {

	@Autowired
	private IToquesDao toquesDAO;

	@Autowired
	private IPostsDao postsDAO;

	@Autowired
	private IComentariosDao comentariosDAO;

	@Override
	public List<ToqueTB> consultarToques() {
		return toquesDAO.consultarToques();
	}

	@Override
	public CategoriasDTO consultarContadorCategoriasPosts() {
		return postsDAO.consultarContadorCategoriasPosts();
	}

	@Override
	public List<PostTB> consultarPosts() {
		return postsDAO.consultarPosts();
	}

	@Override
	public List<PostTB> consultarPostsPorFiltros(PostTB filtroPost) {
		return postsDAO.consultarPostsPorFiltros(filtroPost);
	}

	@Override
	public List<ComentarioTB> consultarComentariosPorIdPost(long idPost) {
		return comentariosDAO.consultarComentariosPorIdPost(idPost);
	}

	@Transactional
	@Override
	public PostTB crearPost(PostTB post) {
		return postsDAO.crearPost(post);
	}

	@Transactional
	@Override
	public ComentarioTB crearComentario(ComentarioTB comentario) {
		return comentariosDAO.crearComentario(comentario);
	}

	@Transactional
	@Override
	public PostTB modificarPost(PostTB post) {
		return postsDAO.modificarPost(post);
	}

	@Transactional
	@Override
	public ComentarioTB modificarComentario(ComentarioTB comentario) {
		return comentariosDAO.modificarComentario(comentario);
	}

	@Transactional
	@Override
	public void eliminarPost(long idPost) {
		postsDAO.eliminarPost(idPost);
	}

	@Transactional
	@Override
	public void eliminarComentario(long idComentario) {
		comentariosDAO.eliminarComentario(idComentario);
	}

}
