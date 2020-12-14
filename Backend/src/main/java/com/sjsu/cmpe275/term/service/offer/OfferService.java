package com.sjsu.cmpe275.term.service.offer;

import java.util.Date;
import java.util.List;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferService {
	public Offer postOffer(Offer offer);

	public List<Offer> getOffer(Long userId, Date todayDate);

//	public Page<Offer> getOffer(int pagenumber, int limit, String sourcecurrencyamount, String destinationcountry, String sourcecurrency, String destinationcurrency);
	public Offer getOfferById(Long offerId);

	public List<Offer> getOwnOfferById(Long userId, Date todayDate, int OpenOffer);

	public List<Offer> getCloseOfferById(Long userId, Date todayDate);

	public Offer getOfferById1(Long id);

	public List<Offer> getClosedTransactionOffers(Long userId,int offerStatus);
	
	public List<Offer> getClosedTransactionOffersByMonth(Long userId,int offerStatus, int month);
}
