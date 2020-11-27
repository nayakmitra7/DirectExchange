package com.sjsu.cmpe275.term.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "EXCHANGERATE")
public class ExchangeRate {

	@Id
	@Column(name = "currency", nullable = false, unique = true, length = 10)
	private String currency;
	
	@Column(name = "usdRate", nullable = false)
	private Double usdRate;
	@Column(name = "eurRate", nullable = false)
	private Double eurRate;
	@Column(name = "gbpRate", nullable = false)
	private Double gbpRate;
	@Column(name = "rmbRate", nullable = false)
	private Double rmbRate;
	@Column(name = "inrRate", nullable = false)
	private Double inrRate;
	
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public Double getUsdRate() {
		return usdRate;
	}
	public void setUsdRate(Double usdRate) {
		this.usdRate = usdRate;
	}
	public Double getEurRate() {
		return eurRate;
	}
	public void setEurRate(Double eurRate) {
		this.eurRate = eurRate;
	}
	public Double getGbpRate() {
		return gbpRate;
	}
	public void setGbpRate(Double gbpRate) {
		this.gbpRate = gbpRate;
	}
	public Double getRmbRate() {
		return rmbRate;
	}
	public void setRmbRate(Double rmbRate) {
		this.rmbRate = rmbRate;
	}
	public Double getInrRate() {
		return inrRate;
	}
	public void setInrRate(Double inrRate) {
		this.inrRate = inrRate;
	}

}
