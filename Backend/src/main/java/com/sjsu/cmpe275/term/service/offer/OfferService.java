package com.sjsu.cmpe275.term.service.offer;


import java.util.List;

import org.springframework.data.domain.Page;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferService {
	public Offer postOffer(Offer offer);

	public Page<Offer> getOffer(int pagenumber, int limit, String sourcecountry, String destinationcountry, String sourcecurrency, String destinationcurrency);
	public Offer getOfferById(Long offerId);
}
