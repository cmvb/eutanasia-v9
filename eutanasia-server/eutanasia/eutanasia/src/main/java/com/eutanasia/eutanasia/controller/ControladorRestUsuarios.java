package com.eutanasia.eutanasia.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
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
import com.eutanasia.eutanasia.enums.EEstado;
import com.eutanasia.eutanasia.exception.ModelNotFoundException;
import com.eutanasia.eutanasia.model.UsuarioAutorTB;
import com.eutanasia.eutanasia.service.IEutanasiaService;
import com.eutanasia.eutanasia.util.ConstantesTablasNombre;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;
import com.eutanasia.eutanasia.util.PropertiesUtil;
import com.eutanasia.eutanasia.util.Util;
import com.eutanasia.eutanasia.util.UtilMail;

@RestController
@RequestMapping("/eutanasia/paratodos")
public class ControladorRestUsuarios {

	@Value("${email.servidor}")
	private String EMAIL_SERVIDOR;

	@Value("${ruta.verificar.cuenta.nueva}")
	private String URL_VERIFICAR_CUENTA_NUEVA;

	@Autowired
	private UtilMail mailUtil;

	@Autowired
	private IEutanasiaService eutanasiaService;

	// LOGIN

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/loginUsuario")
	public ResponseEntity<UsuarioAutorTB> loginUsuario(@RequestBody UsuarioAutorTB usuarioAutor) {
		try {
			UsuarioAutorTB usuarioLogueado = null;
			if (usuarioAutor != null && !StringUtils.isBlank(usuarioAutor.getUsuario())
					&& !StringUtils.isBlank(usuarioAutor.getPassword())) {
				usuarioLogueado = eutanasiaService.loginUsuario(usuarioAutor.getUsuario(), usuarioAutor.getPassword());
				if (usuarioLogueado == null) {
					throw new ModelNotFoundException(
							ConstantesValidaciones.ERROR_LOGIN_DATOS_INCORRECTOS_INACTIVOS.toString());
				}
			} else {
				throw new ModelNotFoundException(ConstantesValidaciones.ERROR_LOGIN_DATOS_INSUFICIENTES);
			}

			return new ResponseEntity<UsuarioAutorTB>(usuarioLogueado, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	// CREATE

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/crearUsuario")
	public ResponseEntity<UsuarioAutorTB> crearUsuario(@RequestBody UsuarioAutorTB usuarioAutor) {
		try {
			List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_USUARIO_AUTOR_TB, usuarioAutor);
			// Filtrar por usuario
			UsuarioAutorTB filtroUsuario = new UsuarioAutorTB();
			filtroUsuario.setUsuario(usuarioAutor.getUsuario());
			List<UsuarioAutorTB> listaPorUsuario = eutanasiaService.consultarUsuariosPorFiltros(filtroUsuario);
			if (listaPorUsuario != null && !listaPorUsuario.isEmpty()) {
				errores.add(ConstantesValidaciones.MSG_USUARIO_REPETIDO);
			}

			// Filtrar por correo
			UsuarioAutorTB filtroCorreo = new UsuarioAutorTB();
			filtroCorreo.setCorreo(usuarioAutor.getCorreo());
			List<UsuarioAutorTB> listaPorCorreo = eutanasiaService.consultarUsuariosPorFiltros(filtroCorreo);
			if (listaPorCorreo != null && !listaPorCorreo.isEmpty()) {
				errores.add(ConstantesValidaciones.MSG_CORREO_REPETIDO);
			}

			UsuarioAutorTB newUsuario = new UsuarioAutorTB();
			if (errores.isEmpty()) {
				usuarioAutor.setEstado((short) EEstado.INACTIVO.ordinal());
				newUsuario = eutanasiaService.crearUsuario(usuarioAutor);
				if (newUsuario != null) {
					MailDTO mailDto = new MailDTO();
					mailDto.setFrom(EMAIL_SERVIDOR);
					mailDto.setTo(newUsuario.getCorreo());
					mailDto.setSubject("ACTIVACIÓN USUARIO NUEVO - EUTANASIA WEB PAGE");

					Map<String, Object> model = new HashMap<>();
					model.put("user", newUsuario.getUsuario());
					model.put("nombreCompleto", newUsuario.getNombres() + " " + newUsuario.getApellidos());
					model.put("email", newUsuario.getCorreo());
					model.put("resetUrl", URL_VERIFICAR_CUENTA_NUEVA + newUsuario.getUsuario());
					mailDto.setModel(model);

					mailUtil.sendMail(mailDto, ConstantesValidaciones.TEMPLATE_MAIL_ACTIVATE_USER);
				}
			} else {
				StringBuilder mensajeErrores = new StringBuilder();

				for (String error : errores) {
					mensajeErrores.append(error + "|");
				}

				throw new ModelNotFoundException(mensajeErrores.toString());
			}

			return new ResponseEntity<UsuarioAutorTB>(newUsuario, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	// UPDATE

	@PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/modificarUsuario")
	public ResponseEntity<UsuarioAutorTB> modificarUsuario(@RequestBody UsuarioAutorTB usuarioAutor) {
		try {
			List<String> errores = Util.validaDatos(ConstantesTablasNombre.MRA_USUARIO_AUTOR_TB, usuarioAutor);
			// Filtrar por usuario
			UsuarioAutorTB filtroUsuario = new UsuarioAutorTB();
			filtroUsuario.setUsuario(usuarioAutor.getUsuario());
			filtroUsuario.setId(usuarioAutor.getId());
			List<UsuarioAutorTB> listaPorUsuario = eutanasiaService.consultarUsuariosPorFiltros(filtroUsuario);
			if (listaPorUsuario != null && !listaPorUsuario.isEmpty()) {
				errores.add(ConstantesValidaciones.MSG_USUARIO_REPETIDO);
			}

			// Filtrar por correo
			UsuarioAutorTB filtroCorreo = new UsuarioAutorTB();
			filtroCorreo.setCorreo(usuarioAutor.getCorreo());
			filtroCorreo.setId(usuarioAutor.getId());
			List<UsuarioAutorTB> listaPorCorreo = eutanasiaService.consultarUsuariosPorFiltros(filtroCorreo);
			if (listaPorCorreo != null && !listaPorCorreo.isEmpty()) {
				errores.add(ConstantesValidaciones.MSG_CORREO_REPETIDO);
			}

			UsuarioAutorTB newUsuario = new UsuarioAutorTB();
			if (errores.isEmpty()) {
				usuarioAutor.setEstado((short) EEstado.ACTIVO.ordinal());
				newUsuario = eutanasiaService.modificarUsuario(usuarioAutor);
			} else {
				StringBuilder mensajeErrores = new StringBuilder();
				String erroresTitle = PropertiesUtil.getProperty("eutanasia.msg.validate.erroresEncontrados");

				for (String error : errores) {
					mensajeErrores.append(error);
				}

				throw new ModelNotFoundException(erroresTitle + mensajeErrores);
			}

			return new ResponseEntity<UsuarioAutorTB>(newUsuario, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}
}