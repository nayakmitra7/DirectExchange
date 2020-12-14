package com.sjsu.cmpe275.term.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name="OFFER")
public class Offer extends BaseEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id",unique=true,nullable=false)
    private Long id;
	@Column(name="sourceCountry",nullable=false)
    private String sourceCountry;
	@Column(name="sourceCurrency",nullable=false)
    private String sourceCurrency;
	@Column(name="amountInSrc",nullable=false)
    private Double amountInSrc;
	@Column(name="amountInDes",nullable=false)
    private Double amountInDes;
	@Column(name="amountInUSD",nullable=false)
    private Double amountInUSD;
	@Column(name="destinationCountry",nullable=false)
    private String destinationCountry;
	@Column(name="destinationCurrency",nullable=false)
    private String destinationCurrency;
	@Column(name="expirationDate")
	@Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;
	@Column(name="counterOfferAllowed",nullable=false)
    private Boolean counterOfferAllowed;
	@Column(name="splitOfferAllowed",nullable=false)
    private Boolean splitOfferAllowed;
	@Column(name="userId",nullable=false)
    private Long userId;
	@Column(name="offerStatus",nullable=false)
    private int offerStatus;
	@Column(name="nickname",nullable=false)
    private String nickname;
	
	

	public Offer( String sourceCountry, String sourceCurrency, Double amountInSrc, Double amountInDes,
			Double amountInUSD, String destinationCountry, String destinationCurrency, Date expirationDate,
			Boolean counterOfferAllowed, Boolean splitOfferAllowed, Long userId,
			String nickname,int offerStatus) {
		super();

		this.sourceCountry = sourceCountry;
		this.sourceCurrency = sourceCurrency;
		this.amountInSrc = amountInSrc;
		this.amountInDes = amountInDes;
		this.amountInUSD = amountInUSD;
		this.destinationCountry = destinationCountry;
		this.destinationCurrency = destinationCurrency;
		this.expirationDate = expirationDate;
		this.counterOfferAllowed = counterOfferAllowed;
		this.splitOfferAllowed = splitOfferAllowed;
		this.userId = userId;
		this.nickname=nickname;
		this.offerStatus=offerStatus;
	}


	//List<CounterOffer> counterOffers;
	public Offer() {
		
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getSourceCountry() {
		return sourceCountry;
	}


	public void setSourceCountry(String sourceCountry) {
		this.sourceCountry = sourceCountry;
	}


	public String getSourceCurrency() {
		return sourceCurrency;
	}


	public void setSourceCurrency(String sourceCurrency) {
		this.sourceCurrency = sourceCurrency;
	}






	public Double getAmountInUSD() {
		return amountInUSD;
	}


	public void setAmountInUSD(Double amountInUSD) {
		this.amountInUSD = amountInUSD;
	}



	public String getDestinationCountry() {
		return destinationCountry;
	}


	public void setDestinationCountry(String destinationCountry) {
		this.destinationCountry = destinationCountry;
	}


	public String getDestinationCurrency() {
		return destinationCurrency;
	}


	public void setDestinationCurrency(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}


	public Date getExpirationDate() {
		return expirationDate;
	}


	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}


	public Boolean getCounterOfferAllowed() {
		return counterOfferAllowed;
	}


	public void setCounterOfferAllowed(Boolean counterOfferAllowed) {
		this.counterOfferAllowed = counterOfferAllowed;
	}


	public Boolean getSplitOfferAllowed() {
		return splitOfferAllowed;
	}


	public void setSplitOfferAllowed(Boolean splitOfferAllowed) {
		this.splitOfferAllowed = splitOfferAllowed;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}


	public Double getAmountInSrc() {
		return amountInSrc;
	}


	public void setAmountInSrc(Double amountInSrc) {
		this.amountInSrc = amountInSrc;
	}


	public Double getAmountInDes() {
		return amountInDes;
	}


	public void setAmountInDes(Double amountInDes) {
		this.amountInDes = amountInDes;
	}


	public int getOfferStatus() {
		return offerStatus;
	}


	public void setOfferStatus(int offerStatus) {
		this.offerStatus = offerStatus;
	}


	public String getNickname() {
		return nickname;
	}


	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	

	
	
}
