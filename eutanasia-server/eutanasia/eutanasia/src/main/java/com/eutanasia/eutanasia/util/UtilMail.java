package com.eutanasia.eutanasia.util;

import java.nio.charset.StandardCharsets;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.eutanasia.eutanasia.dto.MailDTO;
	
@Component
public class UtilMail {

	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	private SpringTemplateEngine templateEngine;

	public void sendMail(MailDTO mail, String urlMail) {
		try {
			MimeMessage message = emailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
					StandardCharsets.UTF_8.name());

			Context context = new Context();
			context.setVariables(mail.getModel());
			String html = templateEngine.process(urlMail, context);
			String htmlReemplazado = new String(mail.getHtmlReemplazado(html));

			helper.setTo(mail.getTo());
			helper.setText(htmlReemplazado, true);
			helper.setSubject(mail.getSubject());
			helper.setFrom(mail.getFrom());

			emailSender.send(message);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}