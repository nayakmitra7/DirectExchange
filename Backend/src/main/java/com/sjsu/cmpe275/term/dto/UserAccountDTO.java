package com.sjsu.cmpe275.term.dto;

public class UserAccountDTO {
	private UserDTO userDTO;
	private AccountDTO accountDTO1;
	private AccountDTO accountDTO2;

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}

	public AccountDTO getAccountDTO1() {
		return accountDTO1;
	}

	public void setAccountDTO1(AccountDTO accountDTO1) {
		this.accountDTO1 = accountDTO1;
	}

	public AccountDTO getAccountDTO2() {
		return accountDTO2;
	}

	public void setAccountDTO2(AccountDTO accountDTO2) {
		this.accountDTO2 = accountDTO2;
	}
}
