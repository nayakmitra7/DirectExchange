package com.sjsu.cmpe275.term.dto;

public class CounterOfferWrapperDTO {
	private OfferDto srcOfferDTO;// srcOfferDTO
	private OfferDto tgtOfferDTO;// tgtOfferDTO
	private Double counterAmtFromSrcToTgt;// counterAmtFromSrcToTgt
	private String counterCurrencyFromSrcToTgt;// counterCurrencyFromSrcToTgt

	public CounterOfferWrapperDTO(OfferDto srcOfferDTO, OfferDto tgtOfferDTO, Double counterAmtFromSrcToTgt,
			String counterCurrencyFromSrcToTgt) {
		super();
		this.srcOfferDTO = srcOfferDTO;
		this.tgtOfferDTO = tgtOfferDTO;
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
		this.counterCurrencyFromSrcToTgt = counterCurrencyFromSrcToTgt;
	}

	CounterOfferWrapperDTO() {
	}

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
