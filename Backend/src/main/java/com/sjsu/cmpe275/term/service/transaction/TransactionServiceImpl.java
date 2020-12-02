package com.sjsu.cmpe275.term.service.transaction;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Offer;
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

	@Override
	public List<Transaction> getInTransactionData(Long userId) {
		
		return transactionRepository.getInTransactionData(userId);
	}

	@Override
	public List<Offer> getSingleOfferByTransaction(Long offerId1, Long offerId2) {
		return transactionRepository.getSingleOfferByTransaction(offerId1,offerId2);
	}

	@Override
	public List<Offer> getSplitOfferByTransaction(Long offerId1, Long offerId2, Long offerId3) {
		// TODO Auto-generated method stub
		return transactionRepository.getSplitOfferByTransaction(offerId1,offerId2,offerId3);

	}

}
