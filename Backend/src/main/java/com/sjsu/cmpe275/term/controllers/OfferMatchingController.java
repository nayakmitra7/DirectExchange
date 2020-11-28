package com.sjsu.cmpe275.term.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.OfferDto;
import com.sjsu.cmpe275.term.dto.OfferMatchingDTO;
import com.sjsu.cmpe275.term.dto.SortingHelperDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.service.offer.OfferService;
import com.sjsu.cmpe275.term.service.offerMatching.OfferMatchingService;

@RestController
@CrossOrigin
public class OfferMatchingController {

	@Autowired
	OfferMatchingService offerMatchingService;
	@Autowired
	OfferService offerService;

	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/offerMatching/single/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<OfferMatchingDTO>> postOffer(@PathVariable Long id) {
		try {
			List<Long> offerIdList = new ArrayList<>(Arrays.asList((long) 4,(long) 9 ));
			List<OfferMatchingDTO> offerMatchingDTOList = new ArrayList<>();
			
			for(Long i : offerIdList) {
				Offer offer = offerService.getOfferById(i);
				OfferDto offerDto = objectMapper.convertValue(offer, OfferDto.class);

				Double min = offer.getAmountInUSD() - 0.1 * offer.getAmountInUSD();
				Double max = offer.getAmountInUSD() + 0.1 * offer.getAmountInUSD();
				Calendar cal = Calendar.getInstance();
				cal.set(Calendar.HOUR_OF_DAY, 0);
				cal.set(Calendar.MINUTE, 0);
				cal.set(Calendar.SECOND, 0);
				cal.set(Calendar.MILLISECOND, 0);
				Date todayDate = cal.getTime();
				System.out.println(todayDate);
				List<Offer> matchedOffers = offerMatchingService.getSingleMatchesByID(offer.getId(), offer.getUserId(),
						todayDate, min, max);
				List<OfferDto> matchedOffersDtos = matchedOffers.stream()
						.map(matchedOffer -> objectMapper.convertValue(matchedOffer, OfferDto.class))
						.collect(Collectors.toList());
				PriorityQueue<SortingHelperDTO> minHeap = new PriorityQueue<>((x, y) -> {
					if (x.getDifference() < y.getDifference()) {
						return -1;
					} else if (x.getDifference() > y.getDifference()) {
						return 1;
					} else {
						return 0;
					}

				});
				for (OfferDto oDto : matchedOffersDtos) {

					minHeap.add(new SortingHelperDTO(oDto, Math.abs(oDto.getAmountInUSD() - offer.getAmountInUSD())));
				}
				matchedOffersDtos.clear();
				while (!minHeap.isEmpty()) {
					matchedOffersDtos.add(minHeap.poll().getOffer());
				}
				OfferMatchingDTO matchingDTO = new OfferMatchingDTO(offerDto, matchedOffersDtos);
				offerMatchingDTOList.add(matchingDTO);
			}
			
			return new ResponseEntity<List<OfferMatchingDTO>>(offerMatchingDTOList, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

}
