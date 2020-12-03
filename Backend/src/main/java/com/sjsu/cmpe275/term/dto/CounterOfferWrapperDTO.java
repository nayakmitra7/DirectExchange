package com.sjsu.cmpe275.term.dto;

public class CounterOfferWrapperDTO {
	private Long counterOfferId;
	private OfferDto srcOfferDTO;// srcOfferDTO
	private OfferDto tgtOfferDTO;// tgtOfferDTO
	private Boolean isCounterSplit;// isCounterSplit
	private OfferDto otherOfferDTO;
	private Double counterAmtFromSrcToTgt;// counterAmtFromSrcToTgt
	private String counterCurrencyFromSrcToTgt;// counterCurrencyFromSrcToTgt
	private int counterStatus;

	public CounterOfferWrapperDTO(OfferDto srcOfferDTO, OfferDto tgtOfferDTO, Boolean isCounterSplit,
			OfferDto otherOfferDTO, Double counterAmtFromSrcToTgt, String counterCurrencyFromSrcToTgt,
			int counterStatus) {
		super();
//		this.counterOfferId = counterOfferId;
		this.srcOfferDTO = srcOfferDTO;
		this.tgtOfferDTO = tgtOfferDTO;
		this.isCounterSplit = isCounterSplit;
		this.otherOfferDTO = otherOfferDTO;
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
		this.counterCurrencyFromSrcToTgt = counterCurrencyFromSrcToTgt;
		this.counterStatus = counterStatus;
	}

	public Long getCounterOfferId() {
		return counterOfferId;
	}

	public void setCounterOfferId(Long counterOfferId) {
		this.counterOfferId = counterOfferId;
	}

	public Boolean isCounterSplit() {
		return isCounterSplit;
	}

	public void setCounterSplit(Boolean isCounterSplit) {
		this.isCounterSplit = isCounterSplit;
	}

	public OfferDto getOtherOfferDTO() {
		return otherOfferDTO;
	}

	public void setOtherOfferDTO(OfferDto otherOfferDTO) {
		this.otherOfferDTO = otherOfferDTO;
	}

	public int getCounterStatus() {
		return counterStatus;
	}

	public void setCounterStatus(int counterStatus) {
		this.counterStatus = counterStatus;
	}

	public CounterOfferWrapperDTO() {
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
