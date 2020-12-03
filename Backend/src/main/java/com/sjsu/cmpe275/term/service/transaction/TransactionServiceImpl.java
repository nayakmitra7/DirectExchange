package com.sjsu.cmpe275.term.service.transaction;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.models.Transaction;
import com.sjsu.cmpe275.term.repository.OfferRepository;
import com.sjsu.cmpe275.term.repository.TransactionRepository;
import com.sjsu.cmpe275.term.utils.Constant;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	TransactionRepository transactionRepository;
	@Autowired
	OfferRepository offerRepository;

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

	

	@Override
	public Transaction getTransaction(Long transactionId) {
		
		return transactionRepository.getOne(transactionId);
	}

	@Override
	public Transaction updateOfferIdStatus1(Long transactionId, Long offerId) {
		Transaction transaction = transactionRepository.getOne(transactionId);
		transaction.setOfferIdStatus1(Constant.OFFERTRANSFERRED);
		Offer offer = offerRepository.getOne(offerId);
		offer.setOfferStatus(Constant.OFFERTRANSFERRED);
		offerRepository.save(offer);		
		return transactionRepository.save(transaction);
		
	}

	@Override
	public Transaction updateOfferIdStatus2(Long transactionId, Long offerId) {
		Transaction transaction = transactionRepository.getOne(transactionId);
		transaction.setOfferIdStatus2(Constant.OFFERTRANSFERRED);
		Offer offer = offerRepository.getOne(offerId);
		offer.setOfferStatus(Constant.OFFERTRANSFERRED);
		offerRepository.save(offer);
		return transactionRepository.save(transaction);
		
	}

	@Override
	public Transaction updateOfferIdStatus3(Long transactionId, Long offerId) {
		Transaction transaction = transactionRepository.getOne(transactionId);
		transaction.setOfferIdStatus3(Constant.OFFERTRANSFERRED);
		Offer offer = offerRepository.getOne(offerId);
		offer.setOfferStatus(Constant.OFFERTRANSFERRED);
		offerRepository.save(offer);
		return transactionRepository.save(transaction);
		
	}

	@Override
	public Transaction updateTransactionStatusForTwoOffers(Long transactionId, Long offerId1, Long offerId2) {
	
		Offer offer1 = offerRepository.getOne(offerId1);
		Offer offer2 = offerRepository.getOne(offerId2);
//		Offer offer3 = offerRepository.getOne(offerId3);

		offer1.setOfferStatus(Constant.OFFERFULFILED);
		offer2.setOfferStatus(Constant.OFFERFULFILED);
//		offer3.setOfferStatus(Constant.OFFERFULFILED);
		offerRepository.save(offer1);
		offerRepository.save(offer2);
//		offerRepository.save(offer3);
		
		Transaction transaction = transactionRepository.getOne(transactionId);
		transaction.setOfferIdStatus1(Constant.OFFERFULFILED);
		transaction.setOfferIdStatus2(Constant.OFFERFULFILED);
//		transaction.setOfferIdStatus3(Constant.OFFERFULFILED);
		transaction.setTranStatus(Constant.TRANSACTION_COMPLETED);
		

		return transactionRepository.save(transaction);
	}

	@Override
	public Transaction updateTransactionStatusForThreeOffers(Long transactionId, Long offerId1, Long offerId2,Long offerId3) {
	
		Offer offer1 = offerRepository.getOne(offerId1);
		Offer offer2 = offerRepository.getOne(offerId2);
		Offer offer3 = offerRepository.getOne(offerId3);

		offer1.setOfferStatus(Constant.OFFERFULFILED);
		offer2.setOfferStatus(Constant.OFFERFULFILED);
		offer3.setOfferStatus(Constant.OFFERFULFILED);
		offerRepository.save(offer1);
		offerRepository.save(offer2);
		offerRepository.save(offer3);
		
		Transaction transaction = transactionRepository.getOne(transactionId);
		transaction.setOfferIdStatus1(Constant.OFFERFULFILED);
		transaction.setOfferIdStatus2(Constant.OFFERFULFILED);
		transaction.setOfferIdStatus3(Constant.OFFERFULFILED);
		transaction.setTranStatus(Constant.TRANSACTION_COMPLETED);
		

		return transactionRepository.save(transaction);
	}

//	@Override
//	public void updateDependantOffersOnAccept(Long offerId) {
//		
//		
//	}

}
