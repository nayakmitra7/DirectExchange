package com.sjsu.cmpe275.term.service.offer;


<<<<<<< HEAD
import java.util.List;
=======
import java.util.Optional;
>>>>>>> ff1737ccb8b9d6d979af0c343dcb1e29d636cec7

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferService {
	public Offer postOffer(Offer offer);
<<<<<<< HEAD

	public List<Offer> getOffer();
=======
	public Offer getOfferById(Long offerId);
>>>>>>> ff1737ccb8b9d6d979af0c343dcb1e29d636cec7
}
