package com.sjsu.cmpe275.term.service.counterOffer;

import java.util.List;

import com.sjsu.cmpe275.term.models.CounterOffer;

public interface CounterOfferService {
	public CounterOffer createCounterOffer(CounterOffer counterOffer);

	public List<CounterOffer> getReceivedCounterOffers(Long userId);

	public List<CounterOffer> getProposedCounterOffers(Long userId);

	public List<CounterOffer> getCounterOffersByTgt(Long offerId);

	public List<CounterOffer> getCounterOffersBySrc(Long offerId);

	public CounterOffer getById(Long id);

	public void update(CounterOffer co);
}
