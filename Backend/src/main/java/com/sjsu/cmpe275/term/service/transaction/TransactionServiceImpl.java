package com.sjsu.cmpe275.term.service.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Transaction;
import com.sjsu.cmpe275.term.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	TransactionRepository transactionRepository;

	@Override
	public Transaction acceptSingleOffer(Transaction transaction) {
		return transactionRepository.save(transaction);
	}

	@Override
	public Transaction acceptSplitOffer(Transaction transaction) {
		return transactionRepository.save(transaction);
	}

}
