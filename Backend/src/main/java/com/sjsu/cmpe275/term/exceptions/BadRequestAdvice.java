package com.sjsu.cmpe275.term.exceptions;

import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ControllerAdvice
public class BadRequestAdvice extends ResponseEntityExceptionHandler {
	@Override
	  public ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatus status, WebRequest request){		 
		ErrorResponseDTO responseDTO = new ErrorResponseDTO(400, HttpStatus.BAD_REQUEST, "Query Parameter is missing"); 
		return new ResponseEntity<Object>(responseDTO, HttpStatus.BAD_REQUEST);
     }
}
