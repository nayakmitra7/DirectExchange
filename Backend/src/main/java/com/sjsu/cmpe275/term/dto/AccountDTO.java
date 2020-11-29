package com.sjsu.cmpe275.term.dto;

import com.sjsu.cmpe275.term.models.User;

public class AccountDTO {

	private Long id;
	private String bankName;
	private String countryName;
	private String accountNumber;
	private String ownerName;
	private String ownerAddress;
	private String primaryCurrency;
	private String transactionType;
	private User user;

	public AccountDTO(Long id, String bankName, String countryName, String accountNumber, String ownerName,
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

	public AccountDTO() {
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

