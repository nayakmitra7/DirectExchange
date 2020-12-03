package com.sjsu.cmpe275.term.service.counterOffer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.CounterOffer;
import com.sjsu.cmpe275.term.repository.CounterOfferRepository;

@Service
public class CounterOfferServiceImpl implements CounterOfferService {
	@Autowired
	CounterOfferRepository counterOfferRepository;

	@Override
	public void createCounterOffer(CounterOffer counterOffer) {
		counterOfferRepository.save(counterOffer);
	}

	@Override
	public List<CounterOffer> getReceivedCounterOffers(Long userId) {
		return counterOfferRepository.getReceivedCounterOffers(userId);
	}

	@Override
	public List<CounterOffer> getProposedCounterOffers(Long userId) {
		return counterOfferRepository.getProposedCounterOffers(userId);
	}

	@Override
	public List<CounterOffer> getCounterOffersByTgt(Long offerId) {
		return counterOfferRepository.getCounterOffersByTgt(offerId);
	}

	@Override
	public List<CounterOffer> getCounterOffersBySrc(Long offerId) {
		return counterOfferRepository.getCounterOffersBySrc(offerId);
	}

	@Override
	public CounterOffer getById(Long id) {
		return counterOfferRepository.findById(id).orElse(null);
	}

	@Override
	public void update(CounterOffer co) {
		counterOfferRepository.save(co);
	}

}
