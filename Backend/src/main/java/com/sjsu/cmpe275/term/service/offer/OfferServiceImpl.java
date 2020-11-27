package com.sjsu.cmpe275.term.service.offer;


<<<<<<< HEAD
import java.util.List;
=======
import java.util.Optional;
>>>>>>> ff1737ccb8b9d6d979af0c343dcb1e29d636cec7

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.repository.OfferRepository;

@Service
public class OfferServiceImpl implements OfferService {

	@Autowired
	OfferRepository offerRepository;

	@Override
	public Offer postOffer(Offer offer) {
		// TODO Auto-generated method stub
		return offerRepository.save(offer);
	}

	@Override
<<<<<<< HEAD
	public List<Offer> getOffer() {
		
		return offerRepository.findAll();
=======
	public Offer getOfferById(Long offerId) {
		// TODO Auto-generated method stub
		return offerRepository.findById(offerId).orElse(null);
>>>>>>> ff1737ccb8b9d6d979af0c343dcb1e29d636cec7
	}
}
