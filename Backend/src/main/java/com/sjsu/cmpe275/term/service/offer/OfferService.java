package com.sjsu.cmpe275.term.service.offer;


import java.util.List;


import com.sjsu.cmpe275.term.models.Offer;

public interface OfferService {
	public Offer postOffer(Offer offer);

	public List<Offer> getOffer();
	public Offer getOfferById(Long offerId);
}
