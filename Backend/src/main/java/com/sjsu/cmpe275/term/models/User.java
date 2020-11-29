package com.sjsu.cmpe275.term.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "USER")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;
	@Column(name = "emailId", unique = true, nullable = false)
	private String emailId;
	@Column(name = "nickname", unique = true, nullable = false)
	private String nickname;
//	@JsonInclude(JsonInclude.Include.NON_NULL)
//	@JsonIgnoreProperties({ "user" })
	@OneToMany
	private List<Account> accounts;

	public User(Long id, String emailId, String nickname) {
		super();
		this.id = id;
		this.emailId = emailId;
		this.nickname = nickname;
	}

	public User() {
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

	public List<Account> getAccount() {
		return accounts;
	}

	public void setAccount(List<Account> accounts) {
		this.accounts = accounts;
	}

}
