package com.sjsu.cmpe275.term.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.RatingDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.Rating;
import com.sjsu.cmpe275.term.service.offer.OfferService;
import com.sjsu.cmpe275.term.service.rating.RatingService;
import com.sjsu.cmpe275.term.service.transaction.TransactionService;

@Controller
@CrossOrigin
public class RatingController {

	@Autowired
	TransactionService transactionService;

	@Autowired
	OfferService offerService;

	@Autowired
	RatingService ratingService;

	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/rating/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<RatingDTO> getRatingController(@PathVariable("userId") Long userId) {
		Rating rating = ratingService.getRating(userId);
		if (rating == null) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(404, HttpStatus.NOT_FOUND,
					"User Rating does not exist");
			throw new GenericException(errorResponseDTO);
		}

		// Round ((1- (# of at-fault transactions) / (# of entered transactions)) * 4) +
		// 1
		double faultCount = rating.getFaultCount();
		double totalCount = rating.getTotalCount();
		long ratingValue = 0;
		if (totalCount != 0) {
			ratingValue = Math.round((1 - (faultCount / totalCount)) * 4) + 1;
		}

		RatingDTO ratingDTO = new RatingDTO(userId, ratingValue);

		return new ResponseEntity<RatingDTO>(ratingDTO, HttpStatus.OK);
	}

}
