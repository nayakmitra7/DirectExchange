package com.sjsu.cmpe275.term.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Configuration
public class ObjectMapConfig {
    @Bean
    public ObjectMapper objectMapper() {
    	 ObjectMapper mapper = new ObjectMapper();
    	    mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    	    mapper.registerModule(new JavaTimeModule());
    	    return mapper;
    }
}
