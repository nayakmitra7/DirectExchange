package com.sjsu.cmpe275.term.dto;

import java.util.List;

public class SortingHelperDTO2 {

	private OfferDto offer;
    private List<OfferDto> offers;
    private Double difference;
    
	public SortingHelperDTO2(OfferDto offer, List<OfferDto> offers, Double difference) {
		super();
		this.offers = offers;
		this.difference = difference;
		this.offer = offer;
	}

	public OfferDto getOffer() {
		return offer;
	}

	public void setOffer(OfferDto offer) {
		this.offer = offer;
	}

	public List<OfferDto> getOffers() {
		return offers;
	}

	public void setOffers(List<OfferDto> offers) {
		this.offers = offers;
	}

	public Double getDifference() {
		return difference;
	}

	public void setDifference(Double difference) {
		this.difference = difference;
	}
	

   
}
