package com.sjsu.cmpe275.term;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@SpringBootApplication
@ComponentScan("com.sjsu.cmpe275.term")
public class Lab2Application {

	  @Autowired
	  private ObjectMapper objectMapper;
	  
	public static void main(String[] args) {
		SpringApplication.run(Lab2Application.class, args);
	}
	
	 @PostConstruct
	  public void setUp() {
	    objectMapper.registerModule(new JavaTimeModule());
	  }

}
