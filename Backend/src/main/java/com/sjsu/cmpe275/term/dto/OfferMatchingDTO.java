package com.sjsu.cmpe275.term.dto;

import java.util.List;


public class OfferMatchingDTO {

    private OfferDto offer;
    private List<OfferDto> matchingOffer;
    
	public OfferMatchingDTO(OfferDto offer, List<OfferDto> matchingOffer) {
		super();
		this.offer = offer;
		this.matchingOffer = matchingOffer;
	}

	public OfferMatchingDTO() {
		
	}

	public OfferDto getOffer() {
		return offer;
	}

	public void setOffer(OfferDto offer) {
		this.offer = offer;
	}

	public List<OfferDto> getMatchingOffer() {
		return matchingOffer;
	}

	public void setMatchingOffer(List<OfferDto> matchingOffer) {
		this.matchingOffer = matchingOffer;
	}



   
}
