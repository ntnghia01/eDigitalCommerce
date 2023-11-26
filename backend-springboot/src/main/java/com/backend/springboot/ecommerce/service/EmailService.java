package com.backend.springboot.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    // @Autowired
    // private JavaMailSender emailSender;

    // // @Autowired
    // // public EmailService(JavaMailSender emailSender) {
    // //     this.emailSender = emailSender;
    // // }

    // public void sendEmail(String to, String subject, String text) {
    //     try {
    //         MimeMessage message = emailSender.createMimeMessage();
    //         MimeMessageHelper helper = new MimeMessageHelper(message, true);
    //         helper.setTo(to);
    //         helper.setSubject(subject);
    //         helper.setText(text, true); // true indicates HTML format

    //         emailSender.send(message);
    //         System.out.println("Email sent successfully.");
    //     } catch (Exception ex) {
    //         System.err.println("Error sending email: " + ex.getMessage());
    //     }
    // }

    // public void sendEmail2(String to, String subject, String text) {
    //     try {
    //         SimpleMailMessage msg = new SimpleMailMessage();
    //         msg.setFrom("nguyentrungnghia26112001@gmail.com");
    //         msg.setTo(to);
    //         msg.setSubject(subject);
    //         msg.setText(text); // true indicates HTML format

    //         emailSender.send(msg);
    //         System.out.println("Email sent successfully.");
    //     } catch (Exception ex) {
    //         System.err.println("Error sending email: " + ex.getMessage());
    //     }
    // }

}
