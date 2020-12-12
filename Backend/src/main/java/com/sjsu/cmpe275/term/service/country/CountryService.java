package com.sjsu.cmpe275.term.service.country;

import java.util.List;

import com.sjsu.cmpe275.term.models.Country;

public interface CountryService {
	public List<Country> getAllCountry();
	public List<Country> getSenderCountry(Long id);
	public List<Country> getReceiverCountry(Long id);
}
