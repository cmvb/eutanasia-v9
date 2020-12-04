package com.eutanasia.eutanasia.service;

import java.util.List;

import com.eutanasia.eutanasia.dto.ArchivoDTO;

public interface IArchivoService {

	/*
	 * Método para subir imagen al servidor sftp
	 */
	public ArchivoDTO subirImagen(ArchivoDTO archivoDto);

	/*
	 * Método para obtener archivos del servidor sftp
	 */
	public List<ArchivoDTO> obtenerArchivos(String rutaArchivo, String nombreArchivo);

}
