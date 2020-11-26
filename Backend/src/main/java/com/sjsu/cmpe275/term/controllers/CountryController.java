package com.sjsu.cmpe275.term.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.CountryDto;
import com.sjsu.cmpe275.term.models.Country;
import com.sjsu.cmpe275.term.service.country.CountryServiceImpl;


@RestController
public class CountryController {

	@Autowired
	CountryServiceImpl countryServiceImpl;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@GetMapping(value = "/country")
	@ResponseBody
	public ResponseEntity<List<CountryDto>> getSponsor() {
		List<Country> allCountries = countryServiceImpl.getAllCountry();
		List<CountryDto> dtos = allCountries
				  .stream()
				  .map(user -> objectMapper.convertValue(user, CountryDto.class))
				  .collect(Collectors.toList());
		return new ResponseEntity<List<CountryDto>>(dtos, HttpStatus.OK);
	}

	
}
