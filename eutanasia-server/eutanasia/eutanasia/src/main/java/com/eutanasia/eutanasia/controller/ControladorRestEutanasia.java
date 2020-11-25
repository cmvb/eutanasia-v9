package com.eutanasia.eutanasia.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eutanasia.eutanasia.dto.CategoriasDTO;
import com.eutanasia.eutanasia.exception.ModelNotFoundException;
import com.eutanasia.eutanasia.model.ComentarioTB;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.model.ToqueTB;
import com.eutanasia.eutanasia.service.IEutanasiaService;
import com.eutanasia.eutanasia.util.ConstantesTablasNombre;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;
import com.eutanasia.eutanasia.util.PropertiesUtil;
import com.eutanasia.eutanasia.util.Util;

@RestController
@RequestMapping("/eutanasia/paratodos")
public class ControladorRestEutanasia {

	@Autowired
	IEutanasiaService eutanasiaService;

	// Consultar

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/consultarToques")
	public ResponseEntity<List<ToqueTB>> consultarToques() {
		try {
			List<ToqueTB> listaToques = eutanasiaService.consultarToques();
			return new ResponseEntity<List<ToqueTB>>(listaToques, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/consultarTags")
	public ResponseEntity<List<String>> consultarTags() {
		try {
			List<String> listaTags = new ArrayList<>();
			List<PostTB> listaPosts = eutanasiaService.consultarPosts();
			if (listaPosts != null && !listaPosts.isEmpty()) {
				Set<String> tempListsetTags = new HashSet<>();
				for (PostTB post : listaPosts) {
					if (!StringUtils.isBlank(post.getTags())) {
						String[] vectorTags = post.getTags().split(ConstantesValidaciones.SEPARADOR_TAGS);
						for (String tag : vectorTags) {
							if (!tempListsetTags.contains(tag)) {
								tempListsetTags.add(tag);
							}
						}
					}
				}
				listaTags.addAll(tempListsetTags);
			}
			return new ResponseEntity<List<String>>(listaTags, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/consultarContadorCategoriasPosts")
	public ResponseEntity<CategoriasDTO> consultarContadorCategoriasPosts() {
		try {
			CategoriasDTO contadorCategoriasDto = eutanasiaService.consultarContadorCategoriasPosts();
			return new ResponseEntity<CategoriasDTO>(contadorCategoriasDto, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/consultarPosts")
	public ResponseEntity<List<PostTB>> consultarPosts() {
		try {
			List<PostTB> listaPosts = eutanasiaService.consultarPosts();
			return new ResponseEntity<List<PostTB>>(listaPosts, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/consultarPostsPorFiltros")
	public ResponseEntity<List<PostTB>> consultarPostsPorFiltros(PostTB filtroPost) {
		try {
			List<PostTB> listaPosts = eutanasiaService.consultarPostsPorFiltros(filtroPost);
			return new ResponseEntity<List<PostTB>>(listaPosts, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/consultarComentariosPorIdPost")
	public ResponseEntity<List<ComentarioTB>> consultarComentariosPorIdPost(@RequestBody PostTB post) {
		try {
			List<ComentarioTB> listaComentarios = new ArrayList<>();
			if (post != null) {
				listaComentarios = eutanasiaService.consultarComentariosPorIdPost(post.getId());
			}

			return new ResponseEntity<List<ComentarioTB>>(listaComentarios, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	// Crear

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/crearPost")
	public ResponseEntity<PostTB> crearPost(@RequestBody PostTB post) {
		List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_POST_TB, post);
		PostTB newPost = new PostTB();
		if (errores.isEmpty()) {
			newPost = eutanasiaService.crearPost(post);
		} else {
			StringBuilder mensajeErrores = new StringBuilder();

			for (String error : errores) {
				mensajeErrores.append(error);
			}

			throw new ModelNotFoundException(mensajeErrores.toString());
		}

		return new ResponseEntity<PostTB>(newPost, HttpStatus.OK);
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/crearComentario")
	public ResponseEntity<ComentarioTB> crearComentario(@RequestBody ComentarioTB comentario) {
		List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_COMENTARIO_TB, comentario);
		ComentarioTB newComentario = new ComentarioTB();
		if (errores.isEmpty()) {
			newComentario = eutanasiaService.crearComentario(comentario);
		} else {
			StringBuilder mensajeErrores = new StringBuilder();

			for (String error : errores) {
				mensajeErrores.append(error);
			}

			throw new ModelNotFoundException(mensajeErrores.toString());
		}

		return new ResponseEntity<ComentarioTB>(newComentario, HttpStatus.OK);
	}

	// Modificar

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/modificarPost")
	public ResponseEntity<PostTB> modificarPost(@RequestBody PostTB post) {
		List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_POST_TB, post);
		PostTB postNuevo = new PostTB();
		if (errores.isEmpty()) {
			postNuevo = new PostTB();
			postNuevo = eutanasiaService.modificarPost(post);
		} else {
			StringBuilder mensajeErrores = new StringBuilder();
			String erroresTitle = PropertiesUtil.getProperty("eutanasia.msg.validate.erroresEncontrados");

			for (String error : errores) {
				mensajeErrores.append(error);
			}

			throw new ModelNotFoundException(erroresTitle + mensajeErrores);
		}

		return new ResponseEntity<PostTB>(postNuevo, HttpStatus.OK);
	}

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/modificarComentario")
	public ResponseEntity<ComentarioTB> modificarComentario(@RequestBody ComentarioTB comentario) {
		List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_COMENTARIO_TB, comentario);
		ComentarioTB comentarioNuevo = new ComentarioTB();
		if (errores.isEmpty()) {
			comentarioNuevo = new ComentarioTB();
			comentarioNuevo = eutanasiaService.modificarComentario(comentario);
		} else {
			StringBuilder mensajeErrores = new StringBuilder();
			String erroresTitle = PropertiesUtil.getProperty("eutanasia.msg.validate.erroresEncontrados");

			for (String error : errores) {
				mensajeErrores.append(error);
			}

			throw new ModelNotFoundException(erroresTitle + mensajeErrores);
		}

		return new ResponseEntity<ComentarioTB>(comentarioNuevo, HttpStatus.OK);
	}

	// Eliminar

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/eliminarPost")
	public void eliminar(@RequestBody PostTB post) {
		try {
			if (post != null) {
				eutanasiaService.eliminarPost(post.getId());
			}
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/eliminarComentario")
	public void eliminar(@RequestBody ComentarioTB comentario) {
		try {
			if (comentario != null) {
				eutanasiaService.eliminarComentario(comentario.getId());
			}
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

}
