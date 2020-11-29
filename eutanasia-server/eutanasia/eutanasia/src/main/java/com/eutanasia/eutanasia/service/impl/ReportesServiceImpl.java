package com.eutanasia.eutanasia.service.impl;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.eutanasia.eutanasia.dao.IPostsDao;
import com.eutanasia.eutanasia.model.PostTB;
import com.eutanasia.eutanasia.service.IReportesService;
import com.eutanasia.eutanasia.util.ConstantesValidaciones;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportesServiceImpl implements IReportesService {

	@Autowired
	private IPostsDao iPostsDao;

	@Override
	public byte[] generarReporteEJM(String nombreArchivoJasper) {
		byte[] data = null;
		List<PostTB> listaPost = iPostsDao.consultarPosts();
		String urlJasper = ConstantesValidaciones.RUTA_JASPER_REPORTS + nombreArchivoJasper;

		try {
			File file = new ClassPathResource(urlJasper).getFile();
			JasperPrint print = JasperFillManager.fillReport(file.getPath(), null,
					new JRBeanCollectionDataSource(listaPost));
			data = JasperExportManager.exportReportToPdf(print);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return data;
	}

}
