package com.eutanasia.eutanasia.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
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
import com.eutanasia.eutanasia.util.ConstantesValidaciones;
import com.eutanasia.eutanasia.util.PropertiesUtil;
import com.eutanasia.eutanasia.util.Util;

@RestController
@RequestMapping("/eutanasia/paratodos")
public class ControladorRestArchivos {

	public static final String RUTA_RAIZ_ARCHIVOS_SFTP = PropertiesUtil.getProperty("eutanasia.ruta.sftp.archivos");
	public static final String URL_IMAGENES_USUARIO = PropertiesUtil.getProperty("eutanasia.ruta.images.user");

	@Autowired
	IArchivoService archivoService;

	// Guardar y transferir archivos
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/subirImagen")
	public ResponseEntity<ArchivoDTO> subirImagen(@RequestBody ArchivoDTO archivoDto) {
		try {
			ArchivoDTO archivoResponseDto = new ArchivoDTO();
			archivoDto.setRutaArchivo(RUTA_RAIZ_ARCHIVOS_SFTP);
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

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/obtenerArchivos")
	public ResponseEntity<List<ArchivoDTO>> obtenerArchivos(@RequestBody ArchivoDTO archivoDto) {
		try {
			List<ArchivoDTO> listaArchivosResponseDto = new ArrayList<>();
			List<String> errores = new ArrayList<>();
			if (StringUtils.isBlank(archivoDto.getRutaArchivo())) {
				errores.add(ConstantesValidaciones.RUTA_ARCHIVO + ConstantesValidaciones.VALOR_VACIO);
			}

			if (errores.isEmpty()) {
				listaArchivosResponseDto = archivoService.obtenerArchivos(archivoDto.getRutaArchivo(),
						archivoDto.getNombreArchivo());
			} else {
				StringBuilder mensajeErrores = new StringBuilder();
				for (String error : errores) {
					mensajeErrores.append(error);
				}

				throw new ModelNotFoundException(mensajeErrores.toString());
			}

			return new ResponseEntity<List<ArchivoDTO>>(listaArchivosResponseDto, HttpStatus.OK);
		} catch (JSONException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

}
