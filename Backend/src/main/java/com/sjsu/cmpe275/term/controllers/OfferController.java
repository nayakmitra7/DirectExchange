package com.sjsu.cmpe275.term.controllers;

import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.ExRateDTO;
import com.sjsu.cmpe275.term.dto.OfferDto;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.ExchangeRate;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.repository.OfferRepository;
import com.sjsu.cmpe275.term.service.exrate.ExRateService;
import com.sjsu.cmpe275.term.service.offer.OfferService;
import com.sjsu.cmpe275.term.utils.Constant;

@RestController
@CrossOrigin
public class OfferController {

	@Autowired
	OfferService offerService;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	ExRateService exRateService;

	private static DecimalFormat df2 = new DecimalFormat("#.##");

	@RequestMapping(value = "/offer", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> postOffer(@RequestBody OfferDto offerDTO) {
		try {
			// Offer offer = new Offer(offerDTO.getSourceCountry(),
			// offerDTO.getSourceCurrency(),offerDTO.getAmount(),offerDTO.getAmountInUSD(),offerDTO.getDestinationCountry(),offerDTO.getDestinationCurrency(),offerDTO.getExpirationDate(),offerDTO.getCounterOfferAllowed(),offerDTO.getSplitOfferAllowed(),
			// offerDTO.getUserId());
			Offer offer = objectMapper.convertValue(offerDTO, Offer.class);
			Offer savedOffer = offerService.postOffer(offer);
			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Your offer has beeen succesfully posted!");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

//	@RequestMapping(value = "/offer/{pagenumber}/{limit}/{sourcecurrencyamount}/{destinationcountry}/{sourcecurrency}/{destinationcurrency}", method = RequestMethod.GET, produces = "application/json")
//	@ResponseBody
//	public ResponseEntity<List<OfferDto>> getOffers(@PathVariable("pagenumber") int pagenumber,@PathVariable("limit") int limit,
//			@PathVariable("sourcecurrencyamount") String sourcecurrencyamount,@PathVariable("destinationcountry") String destinationcountry,@PathVariable("sourcecurrency") String sourcecurrency,
//			@PathVariable("destinationcurrency") String destinationcurrency
//			) {
//		try {
//			Page<Offer> offers = offerService.getOffer(pagenumber,limit,sourcecurrencyamount,destinationcountry,sourcecurrency,destinationcurrency);
//			List<Offer> content=offers.getContent();
//			List<OfferDto> offerdto=objectMapper.convertValue(content, new TypeReference<List<OfferDto>>(){});
////			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Your offer has beeen succesfully posted!");
//			return new ResponseEntity<List<OfferDto>>(offerdto, HttpStatus.OK);
//		}catch(Exception ex){
//			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
//			throw new GenericException(errorResponseDTO);
//		}
//	
//	}
//	
	@RequestMapping(value = "/offer", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<OfferDto>> getOffer() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date todayDate = cal.getTime();
		List<Offer> offers = offerService.getOffer(1L, todayDate);

		List<OfferDto> offerdto = objectMapper.convertValue(offers, new TypeReference<List<OfferDto>>() {
		});
		return new ResponseEntity<List<OfferDto>>(offerdto, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/offer/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<OfferDto>> getOfferList(@PathVariable Long userId) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date todayDate = cal.getTime();
		List<Offer> offers = offerService.getOffer(userId, todayDate);

		List<OfferDto> offerdto = objectMapper.convertValue(offers, new TypeReference<List<OfferDto>>() {
		});
		return new ResponseEntity<List<OfferDto>>(offerdto, HttpStatus.OK);

	}
	

	@RequestMapping(value = "/offer/{userId}/open", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<OfferDto>> getOpenOfferById(@PathVariable Long userId) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date todayDate = cal.getTime();

		List<Offer> offers = offerService.getOwnOfferById(userId, todayDate, Constant.OFFEROPEN);

		List<OfferDto> offerdto = objectMapper.convertValue(offers, new TypeReference<List<OfferDto>>() {
		});
		return new ResponseEntity<List<OfferDto>>(offerdto, HttpStatus.OK);
	}

	@RequestMapping(value = "/offer/{userId}/close", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<OfferDto>> getCloseOfferById() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		Date todayDate = cal.getTime();

		List<Offer> offers = offerService.getCloseOfferById(1L, todayDate, Constant.OFFEROPEN);

		List<OfferDto> offerdto = objectMapper.convertValue(offers, new TypeReference<List<OfferDto>>() {
		});
		return new ResponseEntity<List<OfferDto>>(offerdto, HttpStatus.OK);
	}

	@RequestMapping(value = "/offer", method = RequestMethod.PUT, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<OfferDto> updateOffer(@RequestParam("id") Long id,
			@RequestParam("amountInSrc") Double amountInSrc) {
		try {
			System.out.println("offer update");
			// Offer offer = new Offer(offerDTO.getSourceCountry(),
			// offerDTO.getSourceCurrency(),offerDTO.getAmount(),offerDTO.getAmountInUSD(),offerDTO.getDestinationCountry(),offerDTO.getDestinationCurrency(),offerDTO.getExpirationDate(),offerDTO.getCounterOfferAllowed(),offerDTO.getSplitOfferAllowed(),
			// offerDTO.getUserId());
			// Offer offer = objectMapper.convertValue(offerDTO, Offer.class);
			Offer savedOffer = offerService.getOfferById(id);
			savedOffer.setAmountInSrc(amountInSrc);

			String destCur = savedOffer.getDestinationCurrency();
			String srcCur = savedOffer.getSourceCurrency();
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

			double usdAmt = Double.parseDouble(df2.format(exRate.getUsdRate() * amountInSrc));
			savedOffer.setAmountInUSD(usdAmt);

			Double destAmt = 0.00;

			switch (destCur) {

			case ("Dollar"):
				destAmt = exRate.getUsdRate() * amountInSrc;
				break;
			case ("Rupee"):
				destAmt = exRate.getInrRate() * amountInSrc;
				break;
			case ("Yuan"):
				destAmt = exRate.getRmbRate() * amountInSrc;
				break;
			case ("Euro"):
				destAmt = exRate.getEurRate() * amountInSrc;
				break;
			case ("Pound"):
				destAmt = exRate.getGbpRate() * amountInSrc;
				break;

			}
			destAmt = Double.parseDouble(df2.format(destAmt));
			savedOffer.setAmountInDes(destAmt);

			offerService.postOffer(savedOffer);
			OfferDto offerDto = objectMapper.convertValue(savedOffer, new TypeReference<OfferDto>() {
			});
			return new ResponseEntity<OfferDto>(offerDto, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

}
