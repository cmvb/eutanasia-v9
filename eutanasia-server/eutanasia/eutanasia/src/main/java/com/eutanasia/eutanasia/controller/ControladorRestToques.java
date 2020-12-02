package com.eutanasia.eutanasia.controller;

import java.util.List;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eutanasia.eutanasia.exception.ModelNotFoundException;
import com.eutanasia.eutanasia.model.ToqueTB;
import com.eutanasia.eutanasia.service.IEutanasiaService;

@RestController
@RequestMapping("/eutanasia/paratodos")
public class ControladorRestToques {

	@Value("${email.servidor}")
	private String EMAIL_SERVIDOR;

	@Value("${ruta.verificar.cuenta.nueva}")
	private String URL_VERIFICAR_CUENTA_NUEVA;

	@Autowired
	private IEutanasiaService eutanasiaService;

	// SELECT

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
}
