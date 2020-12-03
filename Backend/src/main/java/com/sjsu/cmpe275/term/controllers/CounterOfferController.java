package com.sjsu.cmpe275.term.controllers;

import java.util.ArrayList;
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
import com.sjsu.cmpe275.term.dto.CounterOfferWrapperDTO;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.OfferDto;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.CounterOffer;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.service.counterOffer.CounterOfferService;
import com.sjsu.cmpe275.term.service.offer.OfferService;
import com.sjsu.cmpe275.term.service.user.UserService;
import com.sjsu.cmpe275.term.utils.Constant;
import com.sjsu.cmpe275.term.utils.EmailUtility;

@RestController
@CrossOrigin
public class CounterOfferController {

	@Autowired
	OfferService offerService;
	@Autowired
	UserService userService;
	@Autowired
	CounterOfferService counterOfferService;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private EmailUtility emailUtil;

	@RequestMapping(value = "/offerMatching/counterOffer", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> postTwoPartyTransaction(
			@RequestBody CounterOfferWrapperDTO counterOfferWrapperDTO) {
		try {

			// Get required data from body
			Offer srcOffer = objectMapper.convertValue(counterOfferWrapperDTO.getSrcOfferDTO(), Offer.class);
			Offer tgtOffer = objectMapper.convertValue(counterOfferWrapperDTO.getTgtOfferDTO(), Offer.class);
			Double counterAmtFromSrcToTgt = counterOfferWrapperDTO.getCounterAmtFromSrcToTgt();
			String counterCurrencyFromSrcToTgt = counterOfferWrapperDTO.getCounterCurrencyFromSrcToTgt();
			int counterStatus = counterOfferWrapperDTO.getCounterStatus();

			// Collect data for creating record in CounterOffer model
			Long srcUserId = srcOffer.getUserId();
			Long srcOfferId = srcOffer.getId();
			Long tgtUserId = tgtOffer.getUserId();
			Long tgtOfferId = tgtOffer.getId();

			// create the counter offer record
			CounterOffer counterOffer = new CounterOffer(srcUserId, srcOfferId, tgtUserId, tgtOfferId,
					counterAmtFromSrcToTgt, counterCurrencyFromSrcToTgt, counterStatus);
			counterOfferService.createCounterOffer(counterOffer);

			// Update the offer status of the party who proposed the counter offer
			srcOffer.setOfferStatus(Constant.COUNTERMADE);
			offerService.postOffer(srcOffer);

			// Send notifications to the two parties
			String[] srcEmailList = new String[1];
			String[] tgtEmailList = new String[1];
			srcEmailList[0] = userService.getUserById(srcUserId).getEmailId();
			tgtEmailList[0] = userService.getUserById(tgtUserId).getEmailId();
			String srcNickname = srcOffer.getNickname();
			String tgtNickname = tgtOffer.getNickname();
			emailUtil.sendEmail(srcEmailList, "Counter offer sent for offer #" + srcOffer.getId(),
					"You have successfully proposed a counter offer to user " + tgtNickname + " for an amount of "
							+ counterAmtFromSrcToTgt + " " + counterCurrencyFromSrcToTgt + "!");
			emailUtil.sendEmail(tgtEmailList, "Counter offer received for offer #" + tgtOffer.getId(),
					"You have been proposed a counter offer from user " + srcNickname + " for an amount of "
							+ counterAmtFromSrcToTgt + " " + counterCurrencyFromSrcToTgt + "!");

			// return response
			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK,
					"Counter offer has been successfully made from user " + srcNickname + " to user " + tgtNickname
							+ " for an amount of " + counterAmtFromSrcToTgt + " " + counterCurrencyFromSrcToTgt + "!");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/offerMatching/receivedCounterOffers/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<CounterOfferWrapperDTO>> getReceivedCounterOffers(@PathVariable Long userId) {
		try {
			List<CounterOffer> receivedCounterOffers = counterOfferService.getReceivedCounterOffers(userId);

			List<CounterOfferWrapperDTO> counterOfferWrapperDTO = new ArrayList<>();

			for (CounterOffer co : receivedCounterOffers) {

				Offer srcOffer = offerService.getOfferById(co.getSrcOfferId());
				OfferDto srcOfferDto = objectMapper.convertValue(srcOffer, new TypeReference<OfferDto>() {
				});
				Offer tgtOffer = offerService.getOfferById(co.getTgtOfferId());
				OfferDto tgtOfferDto = objectMapper.convertValue(tgtOffer, new TypeReference<OfferDto>() {
				});
				Double counterAmtFromSrcToTgt = co.getCounterAmtFromSrcToTgt();
				String currencyAmtFromSrcToTgt = co.getCounterCurrencyFromSrcToTgt();
				int counterStatus = co.getCounterStatus();
				CounterOfferWrapperDTO cowDTO = new CounterOfferWrapperDTO(srcOfferDto, tgtOfferDto,
						counterAmtFromSrcToTgt, currencyAmtFromSrcToTgt, counterStatus);
				counterOfferWrapperDTO.add(cowDTO);

			}

			// return response
			return new ResponseEntity<List<CounterOfferWrapperDTO>>(counterOfferWrapperDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}
	}

	@RequestMapping(value = "/offerMatching/proposedCounterOffers/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<CounterOfferWrapperDTO>> getProposedCounterOffers(@PathVariable Long userId) {
		try {
			List<CounterOffer> proposedCounterOffers = counterOfferService.getProposedCounterOffers(userId);

			List<CounterOfferWrapperDTO> counterOfferWrapperDTO = new ArrayList<>();

			for (CounterOffer co : proposedCounterOffers) {

				Offer srcOffer = offerService.getOfferById(co.getSrcOfferId());
				OfferDto srcOfferDto = objectMapper.convertValue(srcOffer, new TypeReference<OfferDto>() {
				});
				Offer tgtOffer = offerService.getOfferById(co.getTgtOfferId());
				OfferDto tgtOfferDto = objectMapper.convertValue(tgtOffer, new TypeReference<OfferDto>() {
				});
				Double counterAmtFromSrcToTgt = co.getCounterAmtFromSrcToTgt();
				String currencyAmtFromSrcToTgt = co.getCounterCurrencyFromSrcToTgt();
				int counterStatus = co.getCounterStatus();
				CounterOfferWrapperDTO cowDTO = new CounterOfferWrapperDTO(srcOfferDto, tgtOfferDto,
						counterAmtFromSrcToTgt, currencyAmtFromSrcToTgt, counterStatus);
				counterOfferWrapperDTO.add(cowDTO);

			}

			// return response
			return new ResponseEntity<List<CounterOfferWrapperDTO>>(counterOfferWrapperDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}
	}

}
