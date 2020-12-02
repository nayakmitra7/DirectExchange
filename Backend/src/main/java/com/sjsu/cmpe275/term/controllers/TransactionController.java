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
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.dto.TransactionDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.models.Transaction;
import com.sjsu.cmpe275.term.service.offer.OfferService;
import com.sjsu.cmpe275.term.service.transaction.TransactionService;
import com.sjsu.cmpe275.term.service.user.UserService;
import com.sjsu.cmpe275.term.utils.Constant;
import com.sjsu.cmpe275.term.utils.EmailUtility;

@RestController
@CrossOrigin
public class TransactionController {

	@Autowired
	TransactionService transactionService;

	@Autowired
	OfferService offerService;

	@Autowired
	UserService userService;

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private EmailUtility emailUtil;

	@RequestMapping(value = "/twoPartyTransaction", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> postTwoPartyTransaction(@RequestBody TransactionDTO transactionDTO) {
		try {
			Transaction transaction = objectMapper.convertValue(transactionDTO, Transaction.class);
			String[] emailList = new String[2];
			System.out.println("Transaction");
			Long offerId1 = transaction.getOfferId1();
			Long offerId2 = transaction.getOfferId2();

			Offer offer1 = offerService.getOfferById(offerId1);
			Offer offer2 = offerService.getOfferById(offerId2);
			emailList[0] = userService.getUserByNickname(offer1.getNickname()).getEmailId();
			emailList[1] = userService.getUserByNickname(offer2.getNickname()).getEmailId();
			transaction.setOfferEmailId1(emailList[0]);
			transaction.setOfferEmailId2(emailList[1]);
			transaction.setOfferIdStatus1(Constant.OFFERTRANSACTION);
			transaction.setOfferIdStatus2(Constant.OFFERTRANSACTION);
			if (Double.compare(offer1.getAmountInUSD(), offer2.getAmountInUSD()) != 0)  {
				ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Selected offer amount doesn't match with your offer. Please make another selection.");
				return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
			}
		
			offer1.setOfferStatus(Constant.OFFERTRANSACTION);
			offer2.setOfferStatus(Constant.OFFERTRANSACTION);

			offerService.postOffer(offer1);
			offerService.postOffer(offer2);

			transaction.setTranStatus(Constant.TRANSACTION_INPROGRESS);

			Transaction savedOffer = transactionService.acceptSingleOffer(transaction);
			emailUtil.sendEmail(emailList, "Offer accepted", "Offer accepted! Make the payment.");

			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "You have successfully accepted the offer!");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/threePartyTransaction", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> postThreePartyTransaction(@RequestBody TransactionDTO transactionDTO) {
		try {
			Transaction transaction = objectMapper.convertValue(transactionDTO, Transaction.class);
		String[] emailList = new String[3];
			Long offerId1 = transaction.getOfferId1();
			Long offerId2 = transaction.getOfferId2();
			Long offerId3 = transaction.getOfferId3();

			Offer offer1 = offerService.getOfferById(offerId1);
			Offer offer2 = offerService.getOfferById(offerId2);
			Offer offer3 = offerService.getOfferById(offerId3);

			
			if ((Double.compare(offer1.getAmountInUSD(), offer2.getAmountInUSD() + offer3.getAmountInUSD()) != 0) 
				|| (Double.compare(offer1.getAmountInUSD() + offer2.getAmountInUSD(), offer3.getAmountInUSD()) != 0)
				|| (Double.compare(offer1.getAmountInUSD() + offer3.getAmountInUSD(), offer2.getAmountInUSD()) != 0)) {
				ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Selected offers amounts don't exactly match with your offer. Please make another selection.");
				return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
			}
			
			offer1.setOfferStatus(Constant.OFFERTRANSACTION);
			offer2.setOfferStatus(Constant.OFFERTRANSACTION);
			offer3.setOfferStatus(Constant.OFFERTRANSACTION);
			emailList[0] = userService.getUserByNickname(offer1.getNickname()).getEmailId();
			emailList[1] = userService.getUserByNickname(offer2.getNickname()).getEmailId();
			emailList[2] = userService.getUserByNickname(offer3.getNickname()).getEmailId();
			
			offerService.postOffer(offer1);
			offerService.postOffer(offer2);
			offerService.postOffer(offer3);

			transaction.setTranStatus(Constant.TRANSACTION_INPROGRESS);

			Transaction savedOffer = transactionService.acceptSplitOffer(transaction);
			emailUtil.sendEmail(emailList, "Accept Offer", "Accept Offer");

			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "You have successfully accepted the offer!");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

}
