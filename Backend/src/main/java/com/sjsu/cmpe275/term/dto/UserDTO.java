package com.sjsu.cmpe275.term.dto;

import java.util.List;

import com.sjsu.cmpe275.term.models.Account;

public class UserDTO {

	private Long id;
	private String emailId;
	private String nickname;
	private List<Account> accounts;

	public UserDTO(Long id, String emailId, String nickname) {
		super();
		this.id = id;
		this.emailId = emailId;
		this.nickname = nickname;
	}

	public List<Account> getAccount() {
		return accounts;
	}

	public void setAccount(List<Account> accounts) {
		this.accounts = accounts;
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
