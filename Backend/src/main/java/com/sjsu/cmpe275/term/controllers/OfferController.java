package com.sjsu.cmpe275.term.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.OfferDto;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.service.offer.OfferService;


@RestController
@CrossOrigin
public class OfferController {

	@Autowired
	OfferService offerService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@RequestMapping(value = "/offer", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> postOffer(@RequestBody OfferDto offerDTO) {
		try {
			//Offer offer = new Offer(offerDTO.getSourceCountry(), offerDTO.getSourceCurrency(),offerDTO.getAmount(),offerDTO.getAmountInUSD(),offerDTO.getDestinationCountry(),offerDTO.getDestinationCurrency(),offerDTO.getExpirationDate(),offerDTO.getCounterOfferAllowed(),offerDTO.getSplitOfferAllowed(), offerDTO.getUserId());
			Offer offer = objectMapper.convertValue(offerDTO, Offer.class);
			Offer savedOffer = offerService.postOffer(offer);
			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Your offer has beeen succesfully posted!");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		}catch(Exception ex){
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}
	
	@RequestMapping(value = "/offer", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<OfferDto>> getOffers() {
		try {
			List<Offer> offers = offerService.getOffer();
			List<OfferDto> offerdto=objectMapper.convertValue(offers, new TypeReference<List<OfferDto>>(){});
//			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Your offer has beeen succesfully posted!");
			return new ResponseEntity<List<OfferDto>>(offerdto, HttpStatus.OK);
		}catch(Exception ex){
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}
	
	}
	

	
}
