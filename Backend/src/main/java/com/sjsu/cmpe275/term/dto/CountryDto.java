package com.sjsu.cmpe275.term.dto;



public class CountryDto {

    private long id;
    private String country;
    private String currency;
    private String symbol;
  
	public CountryDto(long id, String country, String currency, String symbol) {
		this.id = id;
		this.country = country;
		this.currency = currency;
		this.symbol = symbol;
	}
	public CountryDto() {

	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
   
}
