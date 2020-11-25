package com.eutanasia.eutanasia.controller;

import java.util.List;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eutanasia.eutanasia.dto.ArchivoDTO;
import com.eutanasia.eutanasia.exception.ModelNotFoundException;
import com.eutanasia.eutanasia.service.IArchivoService;
import com.eutanasia.eutanasia.util.PropertiesUtil;
import com.eutanasia.eutanasia.util.Util;

@RestController
@RequestMapping("/eutanasia/paratodos")
public class ControladorRestArchivos {

	public static final String URL_IMAGENES_USUARIO = PropertiesUtil.getProperty("eutanasia.ruta.images.user");

	@Autowired
	IArchivoService archivoService;

	// Guardar y transferir archivos
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/subirImagen")
	public ResponseEntity<ArchivoDTO> subirImagen(@RequestBody ArchivoDTO archivoDto) {
		try {
			ArchivoDTO archivoResponseDto = new ArchivoDTO();
			archivoDto.setRutaArchivo(URL_IMAGENES_USUARIO + archivoDto.getNombreArchivo());
			List<String> errores = Util.validarArchivo(archivoDto);
			if (errores.isEmpty()) {
				archivoResponseDto = archivoService.subirImagen(archivoDto);
			} else {
				StringBuilder mensajeErrores = new StringBuilder();
				for (String error : errores) {
					mensajeErrores.append(error);
				}

				throw new ModelNotFoundException(mensajeErrores.toString());
			}

			return new ResponseEntity<ArchivoDTO>(archivoResponseDto, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

}