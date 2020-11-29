package com.sjsu.cmpe275.term.service.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Account;
import com.sjsu.cmpe275.term.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

	@Autowired
	AccountRepository accountRepository;

	@Override
	public Account createAccount(Account account) {
		return accountRepository.save(account);
	}

}
