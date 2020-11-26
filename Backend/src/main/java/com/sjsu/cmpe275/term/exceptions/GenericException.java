package com.sjsu.cmpe275.term.exceptions;

import org.springframework.http.HttpStatus;

import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;

public class GenericException extends RuntimeException {
	private ErrorResponseDTO errorResponseDTO;

	public GenericException(ErrorResponseDTO errorResponseDTO) {
		this.errorResponseDTO = errorResponseDTO;
	}

	public GenericException() {
		super();
	}

	public ErrorResponseDTO getErrorResponseDTO() {
		return errorResponseDTO;
	}

}
