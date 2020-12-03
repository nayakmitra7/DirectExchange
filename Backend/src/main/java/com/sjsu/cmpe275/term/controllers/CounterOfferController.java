package com.sjsu.cmpe275.term.controllers;

import java.text.DecimalFormat;
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
import com.sjsu.cmpe275.term.dto.CounterOfferDTO;
import com.sjsu.cmpe275.term.dto.CounterOfferWrapperDTO;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.OfferDto;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.CounterOffer;
import com.sjsu.cmpe275.term.models.ExchangeRate;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.service.counterOffer.CounterOfferService;
import com.sjsu.cmpe275.term.service.exrate.ExRateService;
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
	@Autowired
	ExRateService exRateService;

	private static DecimalFormat df2 = new DecimalFormat("#.##");

	@RequestMapping(value = "/offerMatching/counterOffer", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> postTwoPartyTransaction(
			@RequestBody CounterOfferWrapperDTO counterOfferWrapperDTO) {
		try {

			// Get required data from body
			Offer srcOffer = objectMapper.convertValue(counterOfferWrapperDTO.getSrcOfferDTO(), Offer.class);
			Offer tgtOffer = objectMapper.convertValue(counterOfferWrapperDTO.getTgtOfferDTO(), Offer.class);
			OfferDto od = counterOfferWrapperDTO.getOtherOfferDTO();
			boolean isCounterSplit = false;
			if (od != null)
				isCounterSplit = true;
			Offer otherOffer = null;
			if (isCounterSplit)
				otherOffer = objectMapper.convertValue(od, Offer.class);
			Double counterAmtFromSrcToTgt = counterOfferWrapperDTO.getCounterAmtFromSrcToTgt();
			String counterCurrencyFromSrcToTgt = counterOfferWrapperDTO.getCounterCurrencyFromSrcToTgt();
			int counterStatus = counterOfferWrapperDTO.getCounterStatus();

			// Collect data for creating record in CounterOffer model
			Long srcUserId = srcOffer.getUserId();
			Long srcOfferId = srcOffer.getId();
			Long tgtUserId = tgtOffer.getUserId();
			Long tgtOfferId = tgtOffer.getId();
			Long otherUserId = otherOffer != null ? otherOffer.getUserId() : null;
			Long otherOfferId = otherOffer != null ? otherOffer.getId() : null;

			// create the counter offer record
			CounterOffer counterOffer = new CounterOffer(srcUserId, srcOfferId, tgtUserId, tgtOfferId, isCounterSplit,
					otherUserId, otherOfferId, counterAmtFromSrcToTgt, counterCurrencyFromSrcToTgt, counterStatus);
			counterOfferService.createCounterOffer(counterOffer);

			// Update the offer status of the party who proposed the counter offer
			srcOffer.setOfferStatus(Constant.COUNTERMADE);
			offerService.postOffer(srcOffer);
			if (otherOffer != null) {
				otherOffer.setOfferStatus(Constant.COUNTERMADE);
				offerService.postOffer(otherOffer);
			}

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
				boolean isCounterSplit = co.isCounterSplit();

				OfferDto otherOfferDto = null;
				if (isCounterSplit) {
					Offer otherOffer = offerService.getOfferById(co.getOtherOfferId());
					otherOfferDto = objectMapper.convertValue(otherOffer, new TypeReference<OfferDto>() {
					});
				}
				Double counterAmtFromSrcToTgt = co.getCounterAmtFromSrcToTgt();
				String currencyAmtFromSrcToTgt = co.getCounterCurrencyFromSrcToTgt();
				int counterStatus = co.getCounterStatus();
				CounterOfferWrapperDTO cowDTO = new CounterOfferWrapperDTO(srcOfferDto, tgtOfferDto, isCounterSplit,
						otherOfferDto, counterAmtFromSrcToTgt, currencyAmtFromSrcToTgt, counterStatus);
				cowDTO.setCounterOfferId(co.getId());
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
				boolean isCounterSplit = co.isCounterSplit();

				OfferDto otherOfferDto = null;
				if (isCounterSplit) {
					Offer otherOffer = offerService.getOfferById(co.getOtherOfferId());
					otherOfferDto = objectMapper.convertValue(otherOffer, new TypeReference<OfferDto>() {
					});
				}
				Double counterAmtFromSrcToTgt = co.getCounterAmtFromSrcToTgt();
				String currencyAmtFromSrcToTgt = co.getCounterCurrencyFromSrcToTgt();
				int counterStatus = co.getCounterStatus();
				CounterOfferWrapperDTO cowDTO = new CounterOfferWrapperDTO(srcOfferDto, tgtOfferDto, isCounterSplit,
						otherOfferDto, counterAmtFromSrcToTgt, currencyAmtFromSrcToTgt, counterStatus);
				cowDTO.setCounterOfferId(co.getId());
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

	@RequestMapping(value = "/counterOffer/accept", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> acceptCounterOffer(@RequestBody CounterOfferDTO counterOfferDTO) {
		try {

			// Get required data from body
			Long id = counterOfferDTO.getId();
			Long srcUserId = counterOfferDTO.getSrcUserId();
			Long srcOfferId = counterOfferDTO.getSrcOfferId();
			Long tgtUserId = counterOfferDTO.getTgtOfferId();
			Long tgtOfferId = counterOfferDTO.getTgtOfferId();
			Long otherUserId = counterOfferDTO.getOtherUserId();
			Long otherOfferId = counterOfferDTO.getOtherOfferId();
			boolean isCounterSplit = otherOfferId == null ? false : true;
			Double counterAmtFromSrcToTgt = counterOfferDTO.getCounterAmtFromSrcToTgt();
//			String counterCurrencyFromSrcToTgt = counterOfferDTO.getCounterCurrencyFromSrcToTgt();
//			int counterStatus = counterOfferDTO.getCounterStatus();

			// Form the email list of selected party
			String[] emailList;
			if (isCounterSplit) {
				emailList = new String[3];
				emailList[0] = userService.getUserById(srcUserId).getEmailId();
				emailList[1] = userService.getUserById(tgtUserId).getEmailId();
				emailList[2] = userService.getUserById(otherUserId).getEmailId();
			} else {
				emailList = new String[2];
				emailList[0] = userService.getUserById(srcUserId).getEmailId();
				emailList[1] = userService.getUserById(tgtUserId).getEmailId();
			}

			// Accept the selected counter offer
			CounterOffer co = counterOfferService.getById(id);
			co.setCounterStatus(Constant.COUNTER_ACCEPTED);
			counterOfferService.update(co);
			// Move the accepted to in_transaction in Offer table
			Offer srcAcceptOffer = offerService.getOfferById(srcOfferId);
			srcAcceptOffer.setOfferStatus(Constant.TRANSACTION_INPROGRESS);
			offerService.postOffer(srcAcceptOffer);
			Offer tgtAcceptOffer = offerService.getOfferById(tgtOfferId);
			tgtAcceptOffer.setOfferStatus(Constant.TRANSACTION_INPROGRESS);
			tgtAcceptOffer.setAmountInSrc(counterAmtFromSrcToTgt);
			String srcCurr = tgtAcceptOffer.getSourceCurrency();
			String tgtCurr = tgtAcceptOffer.getDestinationCurrency();
			getDesAmt(tgtAcceptOffer, counterAmtFromSrcToTgt, srcCurr, tgtCurr);
			offerService.postOffer(tgtAcceptOffer);

			if (isCounterSplit) {
				Offer otherAcceptOffer = offerService.getOfferById(otherOfferId);
				otherAcceptOffer.setOfferStatus(Constant.TRANSACTION_INPROGRESS);
				offerService.postOffer(otherAcceptOffer);
			}

			// Reject the remaining counter request along with updating the rejected's offer
			// status to open
			List<CounterOffer> cos = counterOfferService.getCounterOffersByTgt(tgtOfferId);
			for (CounterOffer c : cos) {
				if (c.getCounterStatus() != Constant.COUNTER_ACCEPTED) {
					if (tgtOfferId == c.getTgtOfferId()) {
						c.setCounterStatus(Constant.COUNTER_REJECTED);
					} else {
						c.setCounterStatus(Constant.COUNTER_ABORTED);
					}
					counterOfferService.update(c);

					if (tgtOfferId != c.getSrcOfferId()) {
						Offer srcRejectOffer = offerService.getOfferById(c.getSrcOfferId());
						srcRejectOffer.setOfferStatus(Constant.OFFEROPEN);
						offerService.postOffer(srcRejectOffer);
					}

					if (c.isCounterSplit() && tgtOfferId != c.getOtherOfferId()) {
						Offer otherRejectOffer = offerService.getOfferById(c.getTgtOfferId());
						otherRejectOffer.setOfferStatus(Constant.OFFEROPEN);
						offerService.postOffer(otherRejectOffer);
					}
				}
			}

			if (!isCounterSplit)
				emailUtil.sendEmail(emailList, "Counter offer accepted",
						"Counter Offer is in transaction for offer #" + srcOfferId + " and #" + tgtOfferId);
			else
				emailUtil.sendEmail(emailList, "Counter offer accepted", "Counter Offer is in transaction for offer #"
						+ srcOfferId + ", #" + tgtOfferId + " and " + otherOfferId);

			// return response
			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK,
					"Counter offer has been successfully accepted");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/counterOffer/reject", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> rejectCounterOffer(@RequestBody CounterOfferDTO counterOfferDTO) {
		try {
			// Get required data from body
			Long id = counterOfferDTO.getId();
			Long srcUserId = counterOfferDTO.getSrcUserId();
			Long srcOfferId = counterOfferDTO.getSrcOfferId();
			Long tgtUserId = counterOfferDTO.getTgtOfferId();
			Long tgtOfferId = counterOfferDTO.getTgtOfferId();
			Long otherUserId = counterOfferDTO.getOtherUserId();
			Long otherOfferId = counterOfferDTO.getOtherOfferId();
			boolean isCounterSplit = otherOfferId == null ? false : true;

			// Form the email list of selected party
			String[] emailList;
			if (isCounterSplit) {
				emailList = new String[3];
				emailList[0] = userService.getUserById(srcUserId).getEmailId();
				emailList[1] = userService.getUserById(tgtUserId).getEmailId();
				emailList[2] = userService.getUserById(otherUserId).getEmailId();
			} else {
				emailList = new String[2];
				emailList[0] = userService.getUserById(srcUserId).getEmailId();
				emailList[1] = userService.getUserById(tgtUserId).getEmailId();
			}

			// Reject the selected counter offer
			CounterOffer co = counterOfferService.getById(id);
			co.setCounterStatus(Constant.COUNTER_REJECTED);
			counterOfferService.update(co);
			// Move the accepted to open in Offer table
			Offer srcAcceptOffer = offerService.getOfferById(srcOfferId);
			srcAcceptOffer.setOfferStatus(Constant.OFFEROPEN);
			offerService.postOffer(srcAcceptOffer);
			if (isCounterSplit) {
				Offer otherAcceptOffer = offerService.getOfferById(otherOfferId);
				otherAcceptOffer.setOfferStatus(Constant.OFFEROPEN);
				offerService.postOffer(otherAcceptOffer);
			}

			// return response
			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK,
					"Counter offer has been successfully rejected");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	public void getDesAmt(Offer offer, Double amt, String srcCur, String destCur) {
		String sCur = null;

		switch (srcCur) {

		case ("Dollar"):
			sCur = "USD";
			break;
		case ("Rupee"):
			sCur = "INR";
			break;
		case ("Yuan"):
			sCur = "RMB";
			break;
		case ("Euro"):
			sCur = "EUR";
			break;
		case ("Pound"):
			sCur = "GBP";
			break;

		}

		ExchangeRate exRate = exRateService.getRate(sCur);

		double usdAmt = Double.parseDouble(df2.format(exRate.getUsdRate() * amt));
		offer.setAmountInUSD(usdAmt);

		Double destAmt = 0.00;

		switch (destCur) {

		case ("Dollar"):
			destAmt = exRate.getUsdRate() * amt;
			break;
		case ("Rupee"):
			destAmt = exRate.getInrRate() * amt;
			break;
		case ("Yuan"):
			destAmt = exRate.getRmbRate() * amt;
			break;
		case ("Euro"):
			destAmt = exRate.getEurRate() * amt;
			break;
		case ("Pound"):
			destAmt = exRate.getGbpRate() * amt;
			break;

		}
		destAmt = Double.parseDouble(df2.format(destAmt));
		offer.setAmountInDes(destAmt);
	}

}
