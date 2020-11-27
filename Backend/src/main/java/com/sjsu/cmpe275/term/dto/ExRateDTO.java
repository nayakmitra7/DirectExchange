package com.sjsu.cmpe275.term.dto;

public class ExRateDTO {

	private String currency;
	private Double usdRate;
	private Double eurRate;
	private Double gbpRate;
	private Double rmbRate;
	private Double inrRate;

	public ExRateDTO(String currency, Double usdRate, Double eurRate, Double gbpRate, Double rmbRate, Double inrRate) {
		super();
		this.currency = currency;
		this.usdRate = usdRate;
		this.eurRate = eurRate;
		this.gbpRate = gbpRate;
		this.rmbRate = rmbRate;
		this.inrRate = inrRate;
	}

	public ExRateDTO() {

	}

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
