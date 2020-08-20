package com.eutanasia.eutanasia.controller;

import java.io.IOException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eutanasia.eutanasia.JSONReader;
import com.eutanasia.eutanasia.exception.ModelNotFoundException;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.service.IContactsService;
import com.eutanasia.eutanasia.util.Util;

@RestController
@RequestMapping("/sigma-test/geo")
public class ControladorRestEutanasia {

	final String URL_SIGMA_GEO = "https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json";

	@Autowired
	IContactsService contactsService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> consultarTodos() {
		try {
			JSONObject geoJSON = JSONReader.readJsonFromUrl(URL_SIGMA_GEO);

			return new ResponseEntity<String>(geoJSON.toString(), HttpStatus.OK);
		} catch (JSONException | IOException e) {
			throw new ModelNotFoundException(e.getMessage());
		}
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping("/createContact")
	public ResponseEntity<PostTB> crear(@RequestBody PostTB contact) {
		List<String> errores = Util.validaDatos(contact);
		PostTB newContact = new PostTB();
		if (errores.isEmpty()) {
			newContact = contactsService.crear(contact);
		} else {
			StringBuilder mensajeErrores = new StringBuilder();

			for (String error : errores) {
				mensajeErrores.append(error);
			}

			throw new ModelNotFoundException(mensajeErrores.toString());
		}

		return new ResponseEntity<PostTB>(newContact, HttpStatus.OK);
	}

}
