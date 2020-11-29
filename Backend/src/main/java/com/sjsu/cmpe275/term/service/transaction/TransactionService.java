package com.sjsu.cmpe275.term.service.transaction;

import com.sjsu.cmpe275.term.models.Transaction;

public interface TransactionService {
	
	public Transaction acceptSingleOffer(Transaction transaction);
	public Transaction acceptSplitOffer(Transaction transaction);
	
	
}
