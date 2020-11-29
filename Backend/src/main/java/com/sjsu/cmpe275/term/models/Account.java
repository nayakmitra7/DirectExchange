package com.sjsu.cmpe275.term.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Table(name = "ACCOUNT")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;
	@Column(name = "bankName", nullable = false)
	private String bankName;
	@Column(name = "countryName", nullable = false)
	private String countryName;
	@Column(name = "accountNumber", nullable = false)
	private String accountNumber;
	@Column(name = "ownerName", nullable = false)
	private String ownerName;
	@Column(name = "ownerAddress", nullable = false)
	private String ownerAddress;
	@Column(name = "primaryCurrency", nullable = false)
	private String primaryCurrency;
	@Column(name = "transactionType", nullable = false)
	private String transactionType;
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@JsonIgnoreProperties("accounts")
	@ManyToOne
	private User user;

	public Account(Long id, String bankName, String countryName, String accountNumber, String ownerName,
			String ownerAddress, String primaryCurrency, String transactionType, User user) {
		super();
		this.id = id;
		this.bankName = bankName;
		this.countryName = countryName;
		this.accountNumber = accountNumber;
		this.ownerName = ownerName;
		this.ownerAddress = ownerAddress;
		this.primaryCurrency = primaryCurrency;
		this.transactionType = transactionType;
		this.user = user;
	}

	public Account() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getOwnerAddress() {
		return ownerAddress;
	}

	public void setOwnerAddress(String ownerAddress) {
		this.ownerAddress = ownerAddress;
	}

	public String getPrimaryCurrency() {
		return primaryCurrency;
	}

	public void setPrimaryCurrency(String primaryCurrency) {
		this.primaryCurrency = primaryCurrency;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
