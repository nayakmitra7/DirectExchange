package com.sjsu.cmpe275.term.service.offerMatching;


import java.util.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferMatchingService {
	public List<Offer> getSingleMatchesByID(Long offerId,Long userId,Date expirationDate,Double min, Double max);
	public List<Offer> getSplitMatchingOfferContendersA(Long offerId,Long userId,Date expirationDate,Double amount);
	public List<Offer> getSplitMatchingOfferContendersTarget(Long offerId,Long userId,Date expirationDate, Double amount);
	public List<Offer> getSplitMatchingOfferContendersPart(Long offerId,Long userId,Date expirationDate, Double amount);
	public List<Offer> getSplitMatchingOfferContendersLesserThanTarget(Long targetOfferId, Long userId, Long targetUserId, Date expirationDate,  Double targetAmount);

}
