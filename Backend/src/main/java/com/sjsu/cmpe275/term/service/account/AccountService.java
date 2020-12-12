package com.sjsu.cmpe275.term.service.account;

import java.util.List;

import com.sjsu.cmpe275.term.models.Account;

public interface AccountService {
	public Account createAccount(Account account);

	public List<Account> getAccounts(Long userId);
}
