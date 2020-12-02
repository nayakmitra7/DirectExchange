package com.sjsu.cmpe275.term.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.CounterOfferWrapperDTO;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.CounterOffer;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.models.Transaction;
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

	@RequestMapping(value = "/twoPartyTransaction", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> postTwoPartyTransaction(
			@RequestBody CounterOfferWrapperDTO counterOfferWrapperDTO) {
		try {
			Offer srcOffer = objectMapper.convertValue(counterOfferWrapperDTO.getSrcOfferDTO(), Offer.class);
			Offer tgtOffer = objectMapper.convertValue(counterOfferWrapperDTO.getTgtOfferDTO(), Offer.class);

			srcOffer.setOfferStatus(Constant.COUNTERMADE);
			Long srcUserId = srcOffer.getUserId();
			Long srcOfferId = srcOffer.getId();
			Long tgtUserId = tgtOffer.getUserId();
			Long tgtOfferId = tgtOffer.getId();
			Double counterAmtFromSrcToTgt = counterOfferWrapperDTO.getCounterAmtFromSrcToTgt();
			String counterCurrencyFromSrcToTgt = counterOfferWrapperDTO.getCounterCurrencyFromSrcToTgt();

			CounterOffer counterOffer = new CounterOffer(srcUserId, srcOfferId, tgtUserId, tgtOfferId,
					counterAmtFromSrcToTgt, counterCurrencyFromSrcToTgt);

			String[] emailList = new String[2];

//			if (Double.compare(offer1.getAmountInUSD(), offer2.getAmountInUSD()) != 0) {
//				ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK,
//						"Selected offer amount doesn't match with your offer. Please make another selection.");
//				return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
//			}
//
//			emailList[0] = userService.getUserByNickname(offer1.getNickname()).getEmailId();
//			emailList[1] = userService.getUserByNickname(offer2.getNickname()).getEmailId();
//
//			offer1.setOfferStatus(Constant.OFFERTRANSACTION);
//			offer2.setOfferStatus(Constant.OFFERTRANSACTION);
//
//			offerService.postOffer(offer1);
//			offerService.postOffer(offer2);
//
//			transaction.setTranStatus(Constant.TRANSACTION_INPROGRESS);
//
//			Transaction savedOffer = transactionService.acceptSingleOffer(transaction);
//			emailUtil.sendEmail(emailList, "Offer accepted", "Offer accepted! Make the payment.");
//
			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "You have successfully accepted the offer!");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}
}
