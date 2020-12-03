package com.sjsu.cmpe275.term.dto;

public class CounterOfferDTO {
	private Long id;
	private Long srcUserId;
	private Long srcOfferId;
	private Long tgtUserId;
	private Long tgtOfferId;
	private Double counterAmtFromSrcToTgt;
	private String counterCurrencyFromSrcToTgt;
	private String counterStatus;

	public String getCounterStatus() {
		return counterStatus;
	}

	public void setCounterStatus(String counterStatus) {
		this.counterStatus = counterStatus;
	}

	public CounterOfferDTO(Long srcUserId, Long srcOfferId, Long tgtUserId, Long tgtOfferId,
			Double counterAmtFromSrcToTgt, String counterCurrencyFromSrcToTgt) {
		super();
		this.srcUserId = srcUserId;
		this.srcOfferId = srcOfferId;
		this.tgtUserId = tgtUserId;
		this.tgtOfferId = tgtOfferId;
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
		this.counterCurrencyFromSrcToTgt = counterCurrencyFromSrcToTgt;
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
