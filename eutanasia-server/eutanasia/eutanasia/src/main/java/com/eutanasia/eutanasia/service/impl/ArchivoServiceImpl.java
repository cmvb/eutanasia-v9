package com.eutanasia.eutanasia.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eutanasia.eutanasia.dto.ArchivoDTO;
import com.eutanasia.eutanasia.service.IArchivoService;
import com.eutanasia.eutanasia.service.ISFTPServicio;
import com.eutanasia.eutanasia.util.Util;

@Service
public class ArchivoServiceImpl implements IArchivoService {

	@Autowired
	private ISFTPServicio SFTPServicio;

	@Transactional
	@Override
	public ArchivoDTO subirImagen(ArchivoDTO archivoDto) {
		ArchivoDTO archivoResponse = Util.subirArchivoSFTP(archivoDto, SFTPServicio);

		return archivoResponse;
	}

}