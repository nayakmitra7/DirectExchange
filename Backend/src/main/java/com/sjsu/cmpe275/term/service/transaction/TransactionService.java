package com.sjsu.cmpe275.term.service.transaction;

import java.util.List;

import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.models.Transaction;

public interface TransactionService {
	
	public Transaction acceptSingleOffer(Transaction transaction);
	public Transaction acceptSplitOffer(Transaction transaction);
	public List<Transaction> getInTransactionData(Long userId);
	public List<Offer> getSingleOfferByTransaction(Long offerId1, Long offerId2);
	public List<Offer> getSplitOfferByTransaction(Long offerId1, Long offerId2, Long offerId3);
	
	
}
