package com.sjsu.cmpe275.term.dto;

import javax.persistence.Column;

public class UserDTO {
	
	private Long id;
	private String emailId;
	private String nickname;

	public UserDTO(Long id, String emailId, String nickname) {
		super();
		this.id = id;
		this.emailId = emailId;
		this.nickname = nickname;
	}

	public UserDTO() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
}
