package com.sjsu.cmpe275.term.service.offer;


import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferService {
	public Offer postOffer(Offer offer);
	public List<Offer>  getOffer(Long userId, Date todayDate);
//	public Page<Offer> getOffer(int pagenumber, int limit, String sourcecurrencyamount, String destinationcountry, String sourcecurrency, String destinationcurrency);
	public Offer getOfferById(Long offerId);
}
