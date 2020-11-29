package com.sjsu.cmpe275.term.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Component
public class EmailUtility {
	@Autowired
	private JavaMailSender emailSender;
	
	public void sendEmail(String[] to, String subject, String text) {

		SimpleMailMessage msg = new SimpleMailMessage();

		msg.setTo(to);
		msg.setSubject(subject);
		msg.setText(text);

		emailSender.send(msg);

	}
}
