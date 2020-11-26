package com.sjsu.cmpe275.term.dto;

import org.springframework.http.HttpStatus;

public class ResponseDTO {

	private int code;
	private HttpStatus status;
	private String message;

	public ResponseDTO(int code, HttpStatus status, String message) {
		super();
		this.code = code;
		this.status = status;
		this.message = message;
	}

	public int getCode() {
		return this.code;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
