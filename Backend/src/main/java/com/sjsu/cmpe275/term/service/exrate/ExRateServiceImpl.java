package com.sjsu.cmpe275.term.service.exrate;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.ExchangeRate;
import com.sjsu.cmpe275.term.repository.ExRateRepository;

@Service
public class ExRateServiceImpl implements ExRateService {

	@Autowired
	ExRateRepository exRateRepository;

	@Override
	public ExchangeRate getRate(String currency) {
		return exRateRepository.findById(currency).orElse(null);
	}

	public List<ExchangeRate> getAllRates() {
		// TODO Auto-generated method stub
		return exRateRepository.findAll();
	}
}
