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
	
	//List<CounterOffer> counterOffers;
	public OfferDto() {
		
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

	
	
}
