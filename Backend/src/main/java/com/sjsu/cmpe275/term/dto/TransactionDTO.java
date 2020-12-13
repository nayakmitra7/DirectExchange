package com.sjsu.cmpe275.term.dto;

import java.util.Date;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonFormat;

public class TransactionDTO {

	private Long id;
	private Boolean isSplit;
	private Long offerId1;
	private Long offerId2;
	private Long offerId3;
	private int offerIdStatus1;
	private int offerIdStatus2;
	private int offerIdStatus3;
	private String offerEmailId1;
	private String offerEmailId2;
	private String offerEmailId3;
	private Long offerUserId1;
	private Long offerUserId2;
	private Long offerUserId3;
	private int tranStatus;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataChangeCreatedTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataChangeLastModifiedTime;

   
	
	

    

	public TransactionDTO(Long id, Boolean isSplit, Long offerId1, Long offerId2, Long offerId3, int offerIdStatus1,
			int offerIdStatus2, int offerIdStatus3, String offerEmailId1, String offerEmailId2, String offerEmailId3,
			Long offerUserId1, Long offerUserId2, Long offerUserId3, int tranStatus, Date dataChangeCreatedTime,
			Date dataChangeLastModifiedTime) {
		super();
		this.id = id;
		this.isSplit = isSplit;
		this.offerId1 = offerId1;
		this.offerId2 = offerId2;
		this.offerId3 = offerId3;
		this.offerIdStatus1 = offerIdStatus1;
		this.offerIdStatus2 = offerIdStatus2;
		this.offerIdStatus3 = offerIdStatus3;
		this.offerEmailId1 = offerEmailId1;
		this.offerEmailId2 = offerEmailId2;
		this.offerEmailId3 = offerEmailId3;
		this.offerUserId1 = offerUserId1;
		this.offerUserId2 = offerUserId2;
		this.offerUserId3 = offerUserId3;
		this.tranStatus = tranStatus;
		this.dataChangeCreatedTime = dataChangeCreatedTime;
		this.dataChangeLastModifiedTime = dataChangeLastModifiedTime;
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

	public Long getOfferId1() {
		return offerId1;
	}

	public void setOfferId1(Long offerId1) {
		this.offerId1 = offerId1;
	}

	public Long getOfferId2() {
		return offerId2;
	}

	public void setOfferId2(Long offerId2) {
		this.offerId2 = offerId2;
	}

	public Long getOfferId3() {
		return offerId3;
	}

	public void setOfferId3(Long offerId3) {
		this.offerId3 = offerId3;
	}

	public int getOfferIdStatus1() {
		return offerIdStatus1;
	}

	public void setOfferIdStatus1(int offerIdStatus1) {
		this.offerIdStatus1 = offerIdStatus1;
	}

	public int getOfferIdStatus2() {
		return offerIdStatus2;
	}

	public void setOfferIdStatus2(int offerIdStatus2) {
		this.offerIdStatus2 = offerIdStatus2;
	}

	public int getOfferIdStatus3() {
		return offerIdStatus3;
	}

	public void setOfferIdStatus3(int offerIdStatus3) {
		this.offerIdStatus3 = offerIdStatus3;
	}

	public String getOfferEmailId1() {
		return offerEmailId1;
	}

	public void setOfferEmailId1(String offerEmailId1) {
		this.offerEmailId1 = offerEmailId1;
	}

	public String getOfferEmailId2() {
		return offerEmailId2;
	}

	public void setOfferEmailId2(String offerEmailId2) {
		this.offerEmailId2 = offerEmailId2;
	}

	public String getOfferEmailId3() {
		return offerEmailId3;
	}

	public void setOfferEmailId3(String offerEmailId3) {
		this.offerEmailId3 = offerEmailId3;
	}

	public Long getOfferUserId1() {
		return offerUserId1;
	}

	public void setOfferUserId1(Long offerUserId1) {
		this.offerUserId1 = offerUserId1;
	}

	public Long getOfferUserId2() {
		return offerUserId2;
	}

	public void setOfferUserId2(Long offerUserId2) {
		this.offerUserId2 = offerUserId2;
	}

	public Long getOfferUserId3() {
		return offerUserId3;
	}

	public void setOfferUserId3(Long offerUserId3) {
		this.offerUserId3 = offerUserId3;
	}

	public int getTranStatus() {
		return tranStatus;
	}

	public void setTranStatus(int tranStatus) {
		this.tranStatus = tranStatus;
	}

	public Date getDataChangeCreatedTime() {
		return dataChangeCreatedTime;
	}

	public void setDataChangeCreatedTime(Date dataChangeCreatedTime) {
		this.dataChangeCreatedTime = dataChangeCreatedTime;
	}

	public Date getDataChangeLastModifiedTime() {
		return dataChangeLastModifiedTime;
	}

	public void setDataChangeLastModifiedTime(Date dataChangeLastModifiedTime) {
		this.dataChangeLastModifiedTime = dataChangeLastModifiedTime;
	}

	

	
		
}
