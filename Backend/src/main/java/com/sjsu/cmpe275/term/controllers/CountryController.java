package com.sjsu.cmpe275.term.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.CountryDto;
import com.sjsu.cmpe275.term.models.Country;
import com.sjsu.cmpe275.term.service.country.CountryServiceImpl;

@RestController
@CrossOrigin

public class CountryController {

	@Autowired
	CountryServiceImpl countryServiceImpl;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@GetMapping(value = "/country")
	@ResponseBody
	public ResponseEntity<List<CountryDto>> getSponsor() {
		System.out.println("here in country api");
		List<Country> allCountries = countryServiceImpl.getAllCountry();
		List<CountryDto> countryDtos = allCountries
				  .stream()
				  .map(country -> objectMapper.convertValue(country, CountryDto.class))
				  .collect(Collectors.toList());
		return new ResponseEntity<List<CountryDto>>(countryDtos, HttpStatus.OK);
	}

	
}
