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

	
}
