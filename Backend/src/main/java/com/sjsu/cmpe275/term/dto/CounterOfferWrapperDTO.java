package com.sjsu.cmpe275.term.dto;

public class CounterOfferWrapperDTO {
	private OfferDto srcOfferDTO;
	private OfferDto tgtOfferDTO;
	private Double counterAmtFromSrcToTgt;
	private String counterCurrencyFromSrcToTgt;

	public OfferDto getSrcOfferDTO() {
		return srcOfferDTO;
	}

	public void setSrcOfferDTO(OfferDto srcOfferDTO) {
		this.srcOfferDTO = srcOfferDTO;
	}

	public OfferDto getTgtOfferDTO() {
		return tgtOfferDTO;
	}

	public void setTgtOfferDTO(OfferDto tgtOfferDTO) {
		this.tgtOfferDTO = tgtOfferDTO;
	}

	public Double getCounterAmtFromSrcToTgt() {
		return counterAmtFromSrcToTgt;
	}

	public void setCounterAmtFromSrcToTgt(Double counterAmtFromSrcToTgt) {
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
	}

	public String getCounterCurrencyFromSrcToTgt() {
		return counterCurrencyFromSrcToTgt;
	}

	public void setCounterCurrencyFromSrcToTgt(String counterCurrencyFromSrcToTgt) {
		this.counterCurrencyFromSrcToTgt = counterCurrencyFromSrcToTgt;
	}
}
