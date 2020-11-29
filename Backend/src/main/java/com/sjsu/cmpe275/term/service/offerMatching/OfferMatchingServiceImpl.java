package com.sjsu.cmpe275.term.service.offerMatching;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.repository.OfferMatchingRepository;
import com.sjsu.cmpe275.term.repository.OfferRepository;

@Service
public class OfferMatchingServiceImpl implements OfferMatchingService {

	@Autowired
	OfferMatchingRepository offerMatchingRepository;
	@Override
	public List<Offer> getSingleMatchesByID(Long offerId,Long userId,Date expirationDate,Double min, Double max) {
		return offerMatchingRepository.findSingleMatchingOffers(offerId, userId, expirationDate, min,  max);
	}
	@Override
	public List<Offer> getSplitMatchingOfferContendersA(Long offerId, Long userId, Date expirationDate,
			Double amount) {
		// TODO Auto-generated method stub
		return offerMatchingRepository.findSplitMatchingOfferContendersA(offerId, userId, expirationDate, amount);
	}
	@Override
	public List<Offer> getSplitMatchingOfferContendersTarget(Long offerId, Long userId, Date expirationDate,Double amount) {
		// TODO Auto-generated method stub
		return offerMatchingRepository.findSplitMatchingOfferContendersTarget(offerId, userId, expirationDate, amount);
	}
	@Override
	public List<Offer> getSplitMatchingOfferContendersPart(Long offerId, Long userId, Date expirationDate, Double amount) {
		// TODO Auto-generated method stub
		return offerMatchingRepository.findSplitMatchingOfferContendersPart(offerId, userId, expirationDate, amount);
	}
	@Override
	public List<Offer> getSplitMatchingOfferContendersLesserThanTarget(Long targetOfferId, Long userId,
			Long targetUserId, Date expirationDate, Double targetAmount) {
		// TODO Auto-generated method stub
		return offerMatchingRepository.findSplitMatchingOfferContendersLesserThanTarget(targetOfferId, userId, targetUserId, expirationDate, targetAmount);
	}

	
}
