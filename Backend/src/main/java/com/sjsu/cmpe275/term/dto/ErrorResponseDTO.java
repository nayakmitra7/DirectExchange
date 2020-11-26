package com.sjsu.cmpe275.term.dto;

import org.springframework.http.HttpStatus;

public class ErrorResponseDTO {

	private int code;
	private HttpStatus status;
	private String error;

	public ErrorResponseDTO(int code, HttpStatus status, String error) {
		super();
		this.code = code;
		this.status = status;
		this.error = error;
	}

	public int getCode() {
		return this.code;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getError() {
		return error;
	}

}
