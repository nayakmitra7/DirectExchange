package com.sjsu.cmpe275.term.service.offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.repository.OfferRepository;

@Service
public class OfferServiceImpl implements OfferService {

	@Autowired
	OfferRepository offerRepository;

	

	
	@Override
	public Offer getOfferById(Long offerId) {
		// TODO Auto-generated method stub
		return offerRepository.findById(offerId).orElse(null);
	}
	@Override
	public Offer postOffer(Offer offer) {
		// TODO Auto-generated method stub
		return offerRepository.save(offer);
	}
	@Override
	public Page<Offer> getOffer(int pagenumber, int limit, String sourcecountry, String destinationcountry,
			String sourcecurrency, String destinationcurrency) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
