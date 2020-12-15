package com.sjsu.cmpe275.term.controllers;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

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
import com.sjsu.cmpe275.term.dto.SortingHelperDTO2;
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
	@Transactional
	public ResponseEntity<OfferMatchingDTO> getSingleMatchingOffer(@PathVariable Long id) {
		try {

			Offer offer = offerService.getOfferById(id);
			OfferDto offerDto = objectMapper.convertValue(offer, OfferDto.class);
			if (offer.getOfferStatus() != 1) {
				return new ResponseEntity<OfferMatchingDTO>(new OfferMatchingDTO(), HttpStatus.OK);
			}
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

			return new ResponseEntity<OfferMatchingDTO>(matchingDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/offerMatching/split/{id}", method = RequestMethod.GET)
	@ResponseBody
	@Transactional
	public ResponseEntity<List<OfferMatchingDTO>> getSplitMatchingOffer(@PathVariable Long id) {
		try {

			Offer offer = offerService.getOfferById(id);
			if (!offer.getSplitOfferAllowed() || offer.getOfferStatus() != 1) {
				return new ResponseEntity<List<OfferMatchingDTO>>(new ArrayList<OfferMatchingDTO>(), HttpStatus.OK);
			}
			OfferDto offerDto = objectMapper.convertValue(offer, OfferDto.class);

			Calendar cal = Calendar.getInstance();
			cal.set(Calendar.HOUR_OF_DAY, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			cal.set(Calendar.MILLISECOND, 0);
			Date todayDate = cal.getTime();
			List<Offer> matchedOffersA = offerMatchingService.getSplitMatchingOfferContendersA(offer.getId(),
					offer.getUserId(), todayDate, offer.getAmountInUSD());
			List<OfferDto> matchedOffersDtosA = matchedOffersA.stream()
					.map(matchedOffer -> objectMapper.convertValue(matchedOffer, OfferDto.class))
					.collect(Collectors.toList());

			List<Offer> matchedOffersTarget = offerMatchingService.getSplitMatchingOfferContendersTarget(offer.getId(),
					offer.getUserId(), todayDate, offer.getAmountInUSD());
			List<OfferDto> matchedOffersDtosTarget = matchedOffersTarget.stream()
					.map(matchedOffer -> objectMapper.convertValue(matchedOffer, OfferDto.class))
					.collect(Collectors.toList());

//			List<Offer> matchedOffersPart = offerMatchingService.getSplitMatchingOfferContendersPart(offer.getId(), offer.getUserId(),todayDate,offer.getAmountInUSD());
//			List<OfferDto> matchedOffersDtosPart = matchedOffersPart.stream()
//					.map(matchedOffer -> objectMapper.convertValue(matchedOffer, OfferDto.class))
//					.collect(Collectors.toList());
			PriorityQueue<SortingHelperDTO2> minHeap = new PriorityQueue<>((x, y) -> {
				if (x.getDifference() < y.getDifference()) {
					return -1;
				} else if (x.getDifference() > y.getDifference()) {
					return 1;
				} else {
					return 0;
				}

			});
			Double maxA = 1.1 * offerDto.getAmountInUSD();
			Double minA = 0.9 * offerDto.getAmountInUSD();
			for (int i = 0; i < matchedOffersDtosA.size(); i++) {
				for (int j = i + 1; j < matchedOffersDtosA.size(); j++) {
					Double BplusC = matchedOffersDtosA.get(i).getAmountInUSD()
							+ matchedOffersDtosA.get(j).getAmountInUSD();
					if (BplusC <= maxA && BplusC >= minA) {
						List<OfferDto> offers = new ArrayList<>();
						offers.add(matchedOffersDtosA.get(i));
						offers.add(matchedOffersDtosA.get(j));
						SortingHelperDTO2 sortingHelperDTO2 = new SortingHelperDTO2(offerDto, offers,
								Math.abs(BplusC - offerDto.getAmountInUSD()));
						minHeap.add(sortingHelperDTO2);
					}
				}
			}
			for (int i = 0; i < matchedOffersDtosTarget.size(); i++) {
				OfferDto targetOfferDto = matchedOffersDtosTarget.get(i);
				List<Offer> matchedOffersContendersLesserThanTarget = offerMatchingService
						.getSplitMatchingOfferContendersLesserThanTarget(targetOfferDto.getId(), offerDto.getUserId(),
								cal.getTime(), targetOfferDto.getAmountInUSD());
				List<OfferDto> matchedOffersContendersLesserThanTargetDtos = matchedOffersContendersLesserThanTarget
						.stream().map(matchedOffer -> objectMapper.convertValue(matchedOffer, OfferDto.class))
						.collect(Collectors.toList());
				for (int j = 0; j < matchedOffersContendersLesserThanTarget.size(); j++) {
					Double BminusC = targetOfferDto.getAmountInUSD()
							- matchedOffersContendersLesserThanTargetDtos.get(j).getAmountInUSD();
					Double A = offerDto.getAmountInUSD();
					if (BminusC >= 0.9 * A && BminusC <= 1.1 * A) {
						List<OfferDto> offers = new ArrayList<>();
						offers.add(matchedOffersContendersLesserThanTargetDtos.get(j));
						offers.add(offerDto);
						SortingHelperDTO2 sortingHelperDTO2 = new SortingHelperDTO2(matchedOffersDtosTarget.get(i),
								offers, Math.abs(BminusC - A));
						minHeap.add(sortingHelperDTO2);
					}
				}
			}
			matchedOffersDtosA.clear();
			List<OfferMatchingDTO> offerMatchingDtosList = new ArrayList<OfferMatchingDTO>();
			while (!minHeap.isEmpty()) {
				SortingHelperDTO2 sortingHelperDTO2 = minHeap.poll();
				OfferMatchingDTO matchingDTO = new OfferMatchingDTO(sortingHelperDTO2.getOffer(),
						sortingHelperDTO2.getOffers());
				offerMatchingDtosList.add(matchingDTO);
			}

			return new ResponseEntity<List<OfferMatchingDTO>>(offerMatchingDtosList, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

}
