package com.eutanasia.eutanasia.controller;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eutanasia.eutanasia.dto.MailDTO;
import com.eutanasia.eutanasia.exception.ModelNotFoundException;
import com.eutanasia.eutanasia.model.ComentarioTB;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.model.UsuarioAutorTB;
import com.eutanasia.eutanasia.service.IEutanasiaService;
import com.eutanasia.eutanasia.util.ConstantesTablasNombre;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;
import com.eutanasia.eutanasia.util.PropertiesUtil;
import com.eutanasia.eutanasia.util.Util;
import com.eutanasia.eutanasia.util.UtilMail;

@RestController
@RequestMapping("/eutanasia/paratodos")
public class ControladorRestComentarios {

	@Value("${email.servidor}")
	private String EMAIL_SERVIDOR;

	@Value("${ruta.responder.comentario}")
	private String URL_RESPONDER_COMENTARIO;

	@Autowired
	private UtilMail mailUtil;

	@Autowired
	private IEutanasiaService eutanasiaService;

	// SELECT ---------------------
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/consultarComentariosPorIdPost")
	public ResponseEntity<List<ComentarioTB>> consultarComentariosPorIdPost(@RequestBody PostTB post) {
		try {
			List<ComentarioTB> listaComentarios = new ArrayList<>();
			if (post != null) {
				List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_POST_TB, post);
				if (errores != null && !errores.isEmpty()) {
					List<PostTB> listNewPost = eutanasiaService.consultarPostsPorFiltros(post);
					if (listNewPost != null && !listNewPost.isEmpty()) {
						post = listNewPost.get(0);
					} else {
						throw new ModelNotFoundException(ConstantesValidaciones.MSG_NO_POSTS);
					}
				}

				listaComentarios = eutanasiaService.consultarComentariosPorIdPost(post.getId());
				for (ComentarioTB comentario : listaComentarios) {
					comentario.setPostTB(post);
					comentario.setUsuarioAutorTB(comentario.getUsuarioAutorTB());
				}
			}

			return new ResponseEntity<List<ComentarioTB>>(listaComentarios, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	// CREATE ---------------------

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/crearComentario")
	public ResponseEntity<ComentarioTB> crearComentario(@RequestBody ComentarioTB comentario) {
		try {
			List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_COMENTARIO_TB, comentario);
			ComentarioTB newComentario = new ComentarioTB();
			if (errores.isEmpty()) {
				newComentario = eutanasiaService.crearComentario(comentario);
				if (newComentario != null) {
					// Actualizar post con contador de comentarios
					PostTB postComentario = comentario.getPostTB();
					postComentario.setCantidadComentarios(postComentario.getCantidadComentarios() + 1);
					PostTB newPost = eutanasiaService.modificarPost(postComentario);
					if (newPost != null) {
						Map<String, UsuarioAutorTB> mapaCorreosEnviar = new HashMap<>();
						mapaCorreosEnviar.put(comentario.getPostTB().getUsuarioAutorTB().getCorreo(),
								comentario.getPostTB().getUsuarioAutorTB());
						List<ComentarioTB> listaComentarios = eutanasiaService
								.consultarComentariosPorIdPost(comentario.getPostTB().getId());
						if (listaComentarios != null && !listaComentarios.isEmpty()) {
							for (ComentarioTB comentarioEnc : listaComentarios) {
								if (!mapaCorreosEnviar.containsKey(comentarioEnc.getUsuarioAutorTB().getCorreo())) {
									mapaCorreosEnviar.put(comentarioEnc.getUsuarioAutorTB().getCorreo(),
											comentarioEnc.getUsuarioAutorTB());
								}
							}

							for (String correoEnviar : mapaCorreosEnviar.keySet()) {
								MailDTO mailDto = new MailDTO();
								mailDto.setFrom(EMAIL_SERVIDOR);
								mailDto.setTo(correoEnviar);
								mailDto.setSubject("COMENTARIO - EUTANASIA WEB PAGE");

								Map<String, Object> model = new HashMap<>();
								model.put("nombrePost", comentario.getPostTB().getTitulo());
								model.put("usuarioComentario", mapaCorreosEnviar.get(correoEnviar).getNombres() + " "
										+ mapaCorreosEnviar.get(correoEnviar).getApellidos());
								model.put("comentario", comentario.getComentario());
								String urlRuta = URL_RESPONDER_COMENTARIO + comentario.getPostTB().getId();
								try {
									model.put("resetUrl", new URL(urlRuta).toURI().toASCIIString());
								} catch (Exception e) {
									throw new ModelNotFoundException(e.getMessage());
								}
								mailDto.setModel(model);

								mailUtil.sendMail(mailDto, ConstantesValidaciones.TEMPLATE_MAIL_RESPONDER_COMENTARIO);
							}
						}
					}
				}
			} else {
				StringBuilder mensajeErrores = new StringBuilder();
				String erroresTitle = PropertiesUtil.getProperty("eutanasia.msg.validate.erroresEncontrados");

				for (String error : errores) {
					mensajeErrores.append(error + "|");
				}

				throw new ModelNotFoundException(erroresTitle + mensajeErrores);
			}

			return new ResponseEntity<ComentarioTB>(newComentario, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	// UPDATE ---------------------

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/modificarComentario")
	public ResponseEntity<ComentarioTB> modificarComentario(@RequestBody ComentarioTB comentario) {
		try {
			List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_COMENTARIO_TB, comentario);
			ComentarioTB comentarioNuevo = new ComentarioTB();
			if (errores.isEmpty()) {
				comentarioNuevo = new ComentarioTB();
				comentarioNuevo = eutanasiaService.modificarComentario(comentario);
			} else {
				StringBuilder mensajeErrores = new StringBuilder();
				String erroresTitle = PropertiesUtil.getProperty("eutanasia.msg.validate.erroresEncontrados");

				for (String error : errores) {
					mensajeErrores.append(error + "|");
				}

				throw new ModelNotFoundException(erroresTitle + mensajeErrores);
			}

			return new ResponseEntity<ComentarioTB>(comentarioNuevo, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	// DELETE

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
