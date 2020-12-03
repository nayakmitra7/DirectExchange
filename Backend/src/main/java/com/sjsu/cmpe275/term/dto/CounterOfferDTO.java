package com.sjsu.cmpe275.term.dto;

public class CounterOfferDTO {
	private Long id;
	private Long srcUserId;
	private Long srcOfferId;
	private Long tgtUserId;
	private Long tgtOfferId;
	private boolean isCounterSplit;
	private Long otherUserId;
	private Long otherOfferId;
	private Double counterAmtFromSrcToTgt;
	private String counterCurrencyFromSrcToTgt;
	private int counterStatus;

	public int getCounterStatus() {
		return counterStatus;
	}

	public void setCounterStatus(int counterStatus) {
		this.counterStatus = counterStatus;
	}

	public CounterOfferDTO() {
	}

	public CounterOfferDTO(Long id, Long srcUserId, Long srcOfferId, Long tgtUserId, Long tgtOfferId,
			boolean isCounterSplit, Long otherUserId, Long otherOfferId, Double counterAmtFromSrcToTgt,
			String counterCurrencyFromSrcToTgt, int counterStatus) {
		super();
		this.id = id;
		this.srcUserId = srcUserId;
		this.srcOfferId = srcOfferId;
		this.tgtUserId = tgtUserId;
		this.tgtOfferId = tgtOfferId;
		this.isCounterSplit = isCounterSplit;
		this.otherUserId = otherUserId;
		this.otherOfferId = otherOfferId;
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
		this.counterCurrencyFromSrcToTgt = counterCurrencyFromSrcToTgt;
		this.counterStatus = counterStatus;
	}

	public boolean isCounterSplit() {
		return isCounterSplit;
	}

	public void setCounterSplit(boolean isCounterSplit) {
		this.isCounterSplit = isCounterSplit;
	}

	public Long getOtherUserId() {
		return otherUserId;
	}

	public void setOtherUserId(Long otherUserId) {
		this.otherUserId = otherUserId;
	}

	public Long getOtherOfferId() {
		return otherOfferId;
	}

	public void setOtherOfferId(Long otherOfferId) {
		this.otherOfferId = otherOfferId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSrcUserId() {
		return srcUserId;
	}

	public void setSrcUserId(Long srcUserId) {
		this.srcUserId = srcUserId;
	}

	public Long getSrcOfferId() {
		return srcOfferId;
	}

	public void setSrcOfferId(Long srcOfferId) {
		this.srcOfferId = srcOfferId;
	}

	public Long getTgtUserId() {
		return tgtUserId;
	}

	public void setTgtUserId(Long tgtUserId) {
		this.tgtUserId = tgtUserId;
	}

	public Long getTgtOfferId() {
		return tgtOfferId;
	}

	public void setTgtOfferId(Long tgtOfferId) {
		this.tgtOfferId = tgtOfferId;
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
