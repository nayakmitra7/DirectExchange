package com.sjsu.cmpe275.term.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;

@ControllerAdvice
public class GenericExceptionAdvice {
	@ResponseBody
	@ExceptionHandler(GenericException.class)
	ResponseEntity<ErrorResponseDTO> genericExceptionHandler(GenericException ex) {
		return new ResponseEntity<ErrorResponseDTO>(ex.getErrorResponseDTO(), ex.getErrorResponseDTO().getStatus());
	}

}
