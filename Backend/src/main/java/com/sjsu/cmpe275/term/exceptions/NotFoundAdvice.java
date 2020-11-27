package com.sjsu.cmpe275.term.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ControllerAdvice
public class NotFoundAdvice {
	  @ResponseBody
	  @ExceptionHandler(NotFoundException.class)
	  @ResponseStatus(HttpStatus.NOT_FOUND)
	  String notFoundHandler(NotFoundException ex) {
	    return ex.getMessage();
	  }
}
