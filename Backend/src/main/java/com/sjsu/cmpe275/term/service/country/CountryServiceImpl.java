package com.sjsu.cmpe275.term.service.country;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sjsu.cmpe275.term.models.Country;
import com.sjsu.cmpe275.term.repository.CountryRepository;

@Service
public class CountryServiceImpl implements CountryService {

	@Autowired
	CountryRepository countryRepository;


	@Override
	public List<Country> getAllCountry() {
		return countryRepository.findAll();
	}


	@Override
	public List<Country> getSenderCountry(Long id) {
		// TODO Auto-generated method stub
		return countryRepository.findUserSendCountries(id);
	}


	@Override
	public List<Country> getReceiverCountry(Long id) {
		// TODO Auto-generated method stub
		return countryRepository.findUserReceiveCountries(id);
	}
	
}
