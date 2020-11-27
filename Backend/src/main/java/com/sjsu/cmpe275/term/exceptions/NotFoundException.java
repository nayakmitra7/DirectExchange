package com.sjsu.cmpe275.term.exceptions;

public class NotFoundException extends RuntimeException {

	public NotFoundException() {
		super();
	}

	public NotFoundException(Long id) {
		super("Could not find any entry with the ID : " + id);
	}

	public NotFoundException(String message) {
		super(message);
	}

}
