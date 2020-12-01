package com.sjsu.cmpe275.term.models;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id",unique=true,nullable=false)
    private Long id;
	
	@Column(name = "isSplit", nullable = false)
	private Boolean isSplit;
	
	@Column(name = "offerId1", nullable = false)
	private Long offerId1;
	@Column(name = "offerId2", nullable = false)
	private Long offerId2;
	@Column(name = "offerId3", nullable = true)
	private Long offerId3;
	@Column(name = "offerIdStatus1", nullable = false)
	private int offerIdStatus1;
	@Column(name = "offerIdStatus2", nullable = false)
	private int offerIdStatus2;
	@Column(name = "offerIdStatus3", nullable = true)
	private int offerIdStatus3;
	@Column(name = "offerEmailId1", nullable = false)
	private String offerEmailId1;
	@Column(name = "offerEmailId2", nullable = false)
	private String offerEmailId2;
	@Column(name = "offerEmailId3", nullable = true)
	private String offerEmailId3;
	@Column(name = "offerUserId1", nullable = false)
	private Long offerUserId1;
	@Column(name = "offerUserId2", nullable = false)
	private Long offerUserId2;
	@Column(name = "offerUserId3", nullable = true)
	private Long offerUserId3;
	@Column(name = "tranStatus", nullable = false)
	private int tranStatus;
	
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
	
}


