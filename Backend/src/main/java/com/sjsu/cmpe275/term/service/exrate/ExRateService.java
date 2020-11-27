package com.sjsu.cmpe275.term.service.exrate;

import java.util.List;

import com.sjsu.cmpe275.term.models.ExchangeRate;

public interface ExRateService {

	public ExchangeRate getRate(String currency);

	public List<ExchangeRate> getAllRates();
}
