package com.sjsu.cmpe275.term.service.offerMatching;


import java.util.Date;
import java.util.List;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferMatchingService {
	public List<Offer> getSingleMatchesByID(Long offerId,Long userId,Date expirationDate,Double min, Double max);
}
