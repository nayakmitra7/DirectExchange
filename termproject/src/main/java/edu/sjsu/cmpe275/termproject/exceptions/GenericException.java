package edu.sjsu.cmpe275.termproject.exceptions;

import org.springframework.http.HttpStatus;

import edu.sjsu.cmpe275.termproject.dto.ErrorResponseDTO;

public class GenericException extends RuntimeException {
	private ErrorResponseDTO errorResponseDTO;

	public GenericException(ErrorResponseDTO errorResponseDTO) {
		this.errorResponseDTO = errorResponseDTO;
	}

	public GenericException(String reason) {
		this.errorResponseDTO = new ErrorResponseDTO(404,HttpStatus.BAD_REQUEST, reason);
//		super(reason);
	}

	public GenericException() {
		super();
	}

	public ErrorResponseDTO getErrorResponseDTO() {
		return errorResponseDTO;
	}

}
