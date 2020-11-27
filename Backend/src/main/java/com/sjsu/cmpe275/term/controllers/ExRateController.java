package com.sjsu.cmpe275.term.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.ExRateDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.exceptions.NotFoundException;
import com.sjsu.cmpe275.term.models.ExchangeRate;
import com.sjsu.cmpe275.term.service.exrate.ExRateServiceImpl;

@RestController
@CrossOrigin

public class ExRateController {

	@Autowired
	ExRateServiceImpl exRateServiceImpl;

	@Autowired
	private ObjectMapper objectMapper;

	@GetMapping(value = "/exchangerate")
	@ResponseBody
	public ResponseEntity<List<ExRateDTO>> getExRates() {

		ErrorResponseDTO errorResponseDTO = null;
		try {
			List<ExchangeRate> allRates = exRateServiceImpl.getAllRates();
			if (allRates == null) {

				throw new NotFoundException("Exchange rate for is not available");

			}
			List<ExRateDTO> exRateDtos = allRates.stream()
					.map(exchangerate -> objectMapper.convertValue(exchangerate, ExRateDTO.class))
					.collect(Collectors.toList());
			return new ResponseEntity<List<ExRateDTO>>(exRateDtos, HttpStatus.OK);
		} catch (NotFoundException ex) {

			throw ex;
		} catch (Exception e) {
			errorResponseDTO = new ErrorResponseDTO(404, HttpStatus.NOT_FOUND, "Something went wrong..!!");
			throw new GenericException(errorResponseDTO);
		}
	}

	@GetMapping(value = "/exchangerate/{currency}")
	@ResponseBody
	public ResponseEntity<ExRateDTO> getExRate(@PathVariable String currency) {
		ErrorResponseDTO errorResponseDTO = null;
		try {
			ExchangeRate exchangeRate = exRateServiceImpl.getRate(currency);
			if (exchangeRate == null) {

				throw new NotFoundException("Exchange rate for " + currency + " is not available");
			}

			ExRateDTO exRateDto = objectMapper.convertValue(exchangeRate, ExRateDTO.class);
			return new ResponseEntity<ExRateDTO>(exRateDto, HttpStatus.OK);
		} catch (NotFoundException ex) {
			throw ex;
		} catch (Exception ex) {
			errorResponseDTO = new ErrorResponseDTO(404, HttpStatus.NOT_FOUND, "Something went wrong..!! ");
			throw new GenericException(errorResponseDTO);
		}
	}

}
