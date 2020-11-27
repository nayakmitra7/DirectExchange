package com.sjsu.cmpe275.term.dto;



public class SortingHelperDTO {

    private OfferDto offer;
    private Double difference;
    
	public SortingHelperDTO(OfferDto offer, Double difference) {
		super();
		this.offer = offer;
		this.difference = difference;
	}
	public OfferDto getOffer() {
		return offer;
	}
	public void setOffer(OfferDto offer) {
		this.offer = offer;
	}
	public Double getDifference() {
		return difference;
	}
	public void setDifference(Double difference) {
		this.difference = difference;
	}

   
}
