package com.eutanasia.eutanasia.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PropertiesUtil {

	private static final Properties PROPERTIE;
	private static final Logger LOG = Logger.getLogger(PropertiesUtil.class.getName());

	static {
		PROPERTIE = new Properties();

		try (InputStream propertiesStream = PropertiesUtil.class.getClassLoader()
				.getResourceAsStream("properties/mensaje.properties")) {
			PROPERTIE.load(propertiesStream);

		} catch (IOException ex) {
			LOG.log(Level.SEVERE, null, ex);
		}
	}

	public static String getProperty(String key, Object... args) {
		String message = PROPERTIE.getProperty(key);

		if (args != null && args.length > 0) {
			message = String.format(message, args);
		}

		return message;
	}

}
