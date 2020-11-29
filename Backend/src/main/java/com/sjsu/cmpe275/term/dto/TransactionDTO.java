package com.sjsu.cmpe275.term.dto;

public class TransactionDTO {

	private Long id;
	private Boolean isSplit;
	private Double offerId1;
	private Double offerId2;
	private Double offerId3;
	private Double offerIdStatus1;
	private Double offerIdStatus2;
	private Double offerIdStatus3;
	private Double tranStatus;
	
	public TransactionDTO(Long id, Boolean isSplit, Double offerId1, Double offerId2, Double offerId3,
			Double offerIdStatus1, Double offerIdStatus2, Double offerIdStatus3, Double tranStatus) {
		super();
		this.id = id;
		this.isSplit = isSplit;
		this.offerId1 = offerId1;
		this.offerId2 = offerId2;
		this.offerId3 = offerId3;
		this.offerIdStatus1 = offerIdStatus1;
		this.offerIdStatus2 = offerIdStatus2;
		this.offerIdStatus3 = offerIdStatus3;
		this.tranStatus = tranStatus;
	}
	
	public TransactionDTO() {
	
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Boolean getIsSplit() {
		return isSplit;
	}
	public void setIsSplit(Boolean isSplit) {
		this.isSplit = isSplit;
	}
	public Double getOfferId1() {
		return offerId1;
	}
	public void setOfferId1(Double offerId1) {
		this.offerId1 = offerId1;
	}
	public Double getOfferId2() {
		return offerId2;
	}
	public void setOfferId2(Double offerId2) {
		this.offerId2 = offerId2;
	}
	public Double getOfferId3() {
		return offerId3;
	}
	public void setOfferId3(Double offerId3) {
		this.offerId3 = offerId3;
	}
	public Double getOfferIdStatus1() {
		return offerIdStatus1;
	}
	public void setOfferIdStatus1(Double offerIdStatus1) {
		this.offerIdStatus1 = offerIdStatus1;
	}
	public Double getOfferIdStatus2() {
		return offerIdStatus2;
	}
	public void setOfferIdStatus2(Double offerIdStatus2) {
		this.offerIdStatus2 = offerIdStatus2;
	}
	public Double getOfferIdStatus3() {
		return offerIdStatus3;
	}
	public void setOfferIdStatus3(Double offerIdStatus3) {
		this.offerIdStatus3 = offerIdStatus3;
	}
	public Double getTranStatus() {
		return tranStatus;
	}
	public void setTranStatus(Double tranStatus) {
		this.tranStatus = tranStatus;
	}
	
}
