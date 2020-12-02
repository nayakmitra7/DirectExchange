package com.sjsu.cmpe275.term.service.counterOffer;

import java.util.List;

import com.sjsu.cmpe275.term.models.CounterOffer;

public interface CounterOfferService {
	public void createCounterOffer(CounterOffer counterOffer);

	public List<CounterOffer> getReceivedCounterOffers(Long userId);
	
	public List<CounterOffer> getProposedCounterOffers(Long userId);
}
