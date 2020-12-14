package com.sjsu.cmpe275.term.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

public class OfferDto {
	
    private Long id;
    private String sourceCountry;
    private String sourceCurrency;
    private Double amountInSrc;
    private Double amountInDes;
    private Double amountInUSD;
    private String destinationCountry;
    private String destinationCurrency;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date expirationDate;
    private Boolean counterOfferAllowed;
    private Boolean splitOfferAllowed;
    private Long userId;
    private int offerStatus;
    private String nickname;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataChangeCreatedTime;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataChangeLastModifiedTime;
	//List<CounterOffer> counterOffers;
	public OfferDto() {
		
	}

	

	public OfferDto(Long id, String sourceCountry, String sourceCurrency, Double amountInSrc, Double amountInDes,
			Double amountInUSD, String destinationCountry, String destinationCurrency, Date expirationDate,
			Boolean counterOfferAllowed, Boolean splitOfferAllowed, Long userId, int offerStatus, String nickname,
			Date dataChangeCreatedTime, Date dataChangeLastModifiedTime) {
		super();
		this.id = id;
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
		this.offerStatus = offerStatus;
		this.nickname = nickname;
		this.dataChangeCreatedTime = dataChangeCreatedTime;
		this.dataChangeLastModifiedTime = dataChangeLastModifiedTime;
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


	public Date getExpirationDate() {
		return expirationDate;
	}


	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
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
