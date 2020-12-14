package com.sjsu.cmpe275.term.controllers;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import com.sjsu.cmpe275.term.dto.ReportDTO;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.dto.TransactionDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.CounterOffer;
import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.models.Rating;
import com.sjsu.cmpe275.term.models.Transaction;
import com.sjsu.cmpe275.term.models.User;
import com.sjsu.cmpe275.term.service.counterOffer.CounterOfferService;
import com.sjsu.cmpe275.term.service.offer.OfferService;
import com.sjsu.cmpe275.term.service.rating.RatingService;
import com.sjsu.cmpe275.term.service.transaction.TransactionService;
import com.sjsu.cmpe275.term.service.user.UserService;
import com.sjsu.cmpe275.term.utils.Constant;
import com.sjsu.cmpe275.term.utils.EmailUtility;

@RestController
@CrossOrigin()
public class TransactionController {

	@Autowired
	TransactionService transactionService;

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
	private RatingService ratingService;

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
//			if (Double.compare(offer1.getAmountInUSD(), offer2.getAmountInUSD()) != 0)  {
//				ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Selected offer amount doesn't match with your offer. Please make another selection.");
//				return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
//			}
//		
			offer1.setOfferStatus(Constant.OFFERTRANSACTION);
			offer2.setOfferStatus(Constant.OFFERTRANSACTION);

			offerService.postOffer(offer1);
			offerService.postOffer(offer2);

			transaction.setTranStatus(Constant.TRANSACTION_INPROGRESS);

			Transaction savedOffer = transactionService.acceptSingleOffer(transaction);

			try {

				if (savedOffer != null) {
					long user1 = savedOffer.getOfferUserId1();
					long user2 = savedOffer.getOfferUserId2();

					Rating rating1 = ratingService.getRating(user1);
					Rating rating2 = ratingService.getRating(user2);

					rating1.setTotalCount(rating1.getTotalCount() + 1);
					rating2.setTotalCount(rating2.getTotalCount() + 1);

					ratingService.createRating(rating1);
					ratingService.createRating(rating2);
					new java.util.Timer().schedule(new java.util.TimerTask() {
						@Override
						public void run() {
							int status = transactionService.getTransaction(transaction.getId()).getTranStatus();
							if (status != Constant.TRANSACTION_COMPLETED) {
								transaction.setTranStatus(Constant.TRANSACTION_ABORTED);
								transactionService.acceptSingleOffer(transaction);

								Offer offer11 = offerService.getOfferById1(offerId1);
								Offer offer22 = offerService.getOfferById1(offerId2);
								int offer1Status = offer11.getOfferStatus();
								int offer2Status = offer22.getOfferStatus();
								if (offer1Status != Constant.OFFERTRANSFERRED) {
									rating1.setFaultCount(rating1.getFaultCount() + 1);
									ratingService.createRating(rating1);
								}
								if (offer2Status != Constant.OFFERTRANSFERRED) {
									rating2.setFaultCount(rating2.getFaultCount() + 1);
									ratingService.createRating(rating2);
								}
								offer11.setOfferStatus(Constant.OFFEROPEN);
			    				offerService.postOffer(offer11);
			    				offer22.setOfferStatus(Constant.OFFEROPEN);
			    				offerService.postOffer(offer22);
							}
						}
					}, 100000);

				}
			} catch (Exception ex) {
				System.out.println(" Rating has some error " + ex);
			}

			// Open src offers of counter offer table
			List<CounterOffer> counterOfferList1 = counterOfferService.getCounterOffersByTgt(offerId1);
			List<CounterOffer> counterOfferList2 = counterOfferService.getCounterOffersByTgt(offerId2);

			Set<CounterOffer> offerList = new HashSet<>();
			offerList.addAll(counterOfferList1);
			offerList.addAll(counterOfferList2);
			for (CounterOffer counterOffer : offerList) {
				if (counterOffer.getOtherOfferId() == offerId1 || counterOffer.getOtherOfferId() == offerId2) {
					counterOffer.setCounterStatus(Constant.COUNTER_ABORTED);
					counterOfferService.update(counterOffer);
				} else if (counterOffer.getTgtOfferId() == offerId1 || counterOffer.getTgtOfferId() == offerId2) {
					counterOffer.setCounterStatus(Constant.COUNTER_REJECTED);
					counterOfferService.update(counterOffer);
				}
				Offer srcRejectOffer = offerService.getOfferById(counterOffer.getSrcOfferId());
				srcRejectOffer.setOfferStatus(Constant.OFFEROPEN);
				offerService.postOffer(srcRejectOffer);
			}
			//
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

//			
//			if ((Double.compare(offer1.getAmountInUSD(), offer2.getAmountInUSD() + offer3.getAmountInUSD()) != 0) 
//				|| (Double.compare(offer1.getAmountInUSD() + offer2.getAmountInUSD(), offer3.getAmountInUSD()) != 0)
//				|| (Double.compare(offer1.getAmountInUSD() + offer3.getAmountInUSD(), offer2.getAmountInUSD()) != 0)) {
//				ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "Selected offers amounts don't exactly match with your offer. Please make another selection.");
//				return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
//			}

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
			transaction.setOfferEmailId1(emailList[0]);
			transaction.setOfferEmailId2(emailList[1]);
			transaction.setOfferEmailId3(emailList[2]);
			transaction.setOfferIdStatus1(Constant.OFFERTRANSACTION);
			transaction.setOfferIdStatus2(Constant.OFFERTRANSACTION);
			transaction.setOfferIdStatus3(Constant.OFFERTRANSACTION);
			Transaction savedOffer = transactionService.acceptSplitOffer(transaction);

			try {
				if (savedOffer != null) {
					long user1 = savedOffer.getOfferUserId1();
					long user2 = savedOffer.getOfferUserId2();
					long user3 = savedOffer.getOfferUserId3();

					Rating rating1 = ratingService.getRating(user1);
					Rating rating2 = ratingService.getRating(user2);
					Rating rating3 = ratingService.getRating(user3);

					rating1.setTotalCount(rating1.getTotalCount() + 1);
					rating2.setTotalCount(rating2.getTotalCount() + 1);
					rating3.setTotalCount(rating3.getTotalCount() + 1);

					ratingService.createRating(rating1);
					ratingService.createRating(rating2);
					ratingService.createRating(rating3);

					new java.util.Timer().schedule(new java.util.TimerTask() {
						@Override
						public void run() {
							int status = transactionService.getTransaction(transaction.getId()).getTranStatus();
							if (status != Constant.TRANSACTION_COMPLETED) {

								transaction.setTranStatus(Constant.TRANSACTION_ABORTED);
								transactionService.acceptSingleOffer(transaction);

								Offer offer11 = offerService.getOfferById1(offerId1);
								Offer offer22 = offerService.getOfferById1(offerId2);
								Offer offer33 = offerService.getOfferById1(offerId3);
								int offer1Status = offer11.getOfferStatus();
								int offer2Status = offer22.getOfferStatus();
								int offer3Status = offer33.getOfferStatus();

								if (offer1Status != Constant.OFFERTRANSFERRED) {
									rating1.setFaultCount(rating1.getFaultCount() + 1);
									ratingService.createRating(rating1);
								}
								if (offer2Status != Constant.OFFERTRANSFERRED) {
									rating2.setFaultCount(rating2.getFaultCount() + 1);
									ratingService.createRating(rating2);
								}
								if (offer3Status != Constant.OFFERTRANSFERRED) {
									rating3.setFaultCount(rating3.getFaultCount() + 1);
									ratingService.createRating(rating3);
								}
								
								offer11.setOfferStatus(Constant.OFFEROPEN);
			    				offerService.postOffer(offer11);
			    				offer22.setOfferStatus(Constant.OFFEROPEN);
			    				offerService.postOffer(offer22);
			    				offer33.setOfferStatus(Constant.OFFEROPEN);
			    				offerService.postOffer(offer33);
							}
						}
					}, 100000);

				}
			} catch (Exception ex) {
				System.out.println(" Rating has some error " + ex);

			}

			// Open src offers of counter offer table
			List<CounterOffer> counterOfferList1 = counterOfferService.getCounterOffersByTgt(offerId1);
			List<CounterOffer> counterOfferList2 = counterOfferService.getCounterOffersByTgt(offerId2);
			List<CounterOffer> counterOfferList3 = counterOfferService.getCounterOffersByTgt(offerId3);

			Set<CounterOffer> offerList = new HashSet<>();
			offerList.addAll(counterOfferList1);
			offerList.addAll(counterOfferList2);
			offerList.addAll(counterOfferList3);
			for (CounterOffer counterOffer : offerList) {
				if (counterOffer.getOtherOfferId() == offerId1 || counterOffer.getOtherOfferId() == offerId2
						|| counterOffer.getOtherOfferId() == offerId3) {
					counterOffer.setCounterStatus(Constant.COUNTER_ABORTED);
					counterOfferService.update(counterOffer);
				} else if (counterOffer.getTgtOfferId() == offerId1 || counterOffer.getTgtOfferId() == offerId2
						|| counterOffer.getTgtOfferId() == offerId3) {
					counterOffer.setCounterStatus(Constant.COUNTER_REJECTED);
					counterOfferService.update(counterOffer);
				}
				Offer srcRejectOffer = offerService.getOfferById(counterOffer.getSrcOfferId());
				srcRejectOffer.setOfferStatus(Constant.OFFEROPEN);
				offerService.postOffer(srcRejectOffer);
			}
			//
			emailUtil.sendEmail(emailList, "Accept Offer", "Accept Offer");

			ResponseDTO responseDTO = new ResponseDTO(200, HttpStatus.OK, "You have successfully accepted the offer!");
			return new ResponseEntity<ResponseDTO>(responseDTO, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/intransaction/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<TransactionDTO>> getInTransactionData(@PathVariable("userId") Long userId) {
		try {
			List<Transaction> transaction = transactionService.getInTransactionData(userId);

			List<TransactionDTO> transactionList = objectMapper.convertValue(transaction,
					new TypeReference<List<TransactionDTO>>() {
					});
			return new ResponseEntity<List<TransactionDTO>>(transactionList, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/offer/history/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<TransactionDTO>> getTransactionHistory(@PathVariable("userId") Long userId) {
		try {
			List<Transaction> transaction = transactionService.getTransactionHistory(userId);

			List<TransactionDTO> transactionList = objectMapper.convertValue(transaction,
					new TypeReference<List<TransactionDTO>>() {
					});
			return new ResponseEntity<List<TransactionDTO>>(transactionList, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/offer/abort/history/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<TransactionDTO>> getAbortedTransactionHistory(@PathVariable("userId") Long userId) {
		try {
			List<Transaction> transaction = transactionService.getAbortedTransactionHistory(userId);

			List<TransactionDTO> transactionList = objectMapper.convertValue(transaction,
					new TypeReference<List<TransactionDTO>>() {
					});
			return new ResponseEntity<List<TransactionDTO>>(transactionList, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/transaction/offer/{offerId1}/{offerId2}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<OfferDto>> getSingleOfferByTransaction(@PathVariable("offerId1") Long offerId1,
			@PathVariable("offerId2") Long offerId2) {
		try {
			List<Offer> offers = transactionService.getSingleOfferByTransaction(offerId1, offerId2);

			List<OfferDto> offerList = objectMapper.convertValue(offers, new TypeReference<List<OfferDto>>() {
			});
			return new ResponseEntity<List<OfferDto>>(offerList, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/transaction/offer/{offerId1}/{offerId2}/{offerId3}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<OfferDto>> getSplitOfferByTransaction(@PathVariable("offerId1") Long offerId1,
			@PathVariable("offerId2") Long offerId2, @PathVariable("offerId3") Long offerId3) {
		try {
			List<Offer> offers = transactionService.getSplitOfferByTransaction(offerId1, offerId2, offerId3);

			List<OfferDto> offerList = objectMapper.convertValue(offers, new TypeReference<List<OfferDto>>() {
			});
			return new ResponseEntity<List<OfferDto>>(offerList, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/transaction/offer/receivemoney/{transactionId}/{offerId}", method = RequestMethod.PUT, produces = "application/json")
	@ResponseBody
	public ResponseEntity<TransactionDTO> updateTransactionComplete(@PathVariable("transactionId") Long transactionId,
			@PathVariable("offerId") Long offerId) {
		try {

			Transaction transaction = transactionService.getTransaction(transactionId);

//			Transaction transaction = transactionService.updateTransactionStatusforOneOffer(transactionId,offerId);
			Transaction updatedTransaction = null;
			if (transaction.getIsSplit()) {
				if (transaction.getOfferId1() == offerId) {
					updatedTransaction = transactionService.updateOfferIdStatus1(transactionId, offerId);
				} else if (transaction.getOfferId2() == offerId) {
					updatedTransaction = transactionService.updateOfferIdStatus2(transactionId, offerId);
				} else if (transaction.getOfferId3() == offerId) {
					updatedTransaction = transactionService.updateOfferIdStatus3(transactionId, offerId);
				} else {
					ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(404, HttpStatus.NOT_FOUND,
							"Offer id" + offerId + " not available in the transaction");
					throw new GenericException(errorResponseDTO);
				}
			} else {
				if (transaction.getOfferId1() == offerId) {
					updatedTransaction = transactionService.updateOfferIdStatus1(transactionId, offerId);
				} else if (transaction.getOfferId2() == offerId) {
					updatedTransaction = transactionService.updateOfferIdStatus2(transactionId, offerId);
				} else {
					ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(404, HttpStatus.NOT_FOUND,
							"Offer id" + offerId + " not available in the transaction");
					throw new GenericException(errorResponseDTO);
				}
			}

			if (updatedTransaction.getOfferIdStatus1() == 4 && updatedTransaction.getOfferIdStatus2() == 4) {
				// update transaction and offer status as fulfiled
				if (!transaction.getIsSplit()) {
					String[] emailList = new String[2];

					emailList[0] = transaction.getOfferEmailId1();
					emailList[1] = transaction.getOfferEmailId2();
					System.out.println(emailList[0] + "  " + emailList[1]);
					updatedTransaction = transactionService.updateTransactionStatusForTwoOffers(transactionId,
							transaction.getOfferId1(), transaction.getOfferId2());
					User user1 = userService.getUserByEmailId(transaction.getOfferEmailId1());
					User user2 = userService.getUserByEmailId(transaction.getOfferEmailId2());
					Offer offer1 = offerService.getOfferById(transaction.getOfferId1());
					Offer offer2 = offerService.getOfferById(transaction.getOfferId2());
//					emailUtil.sendEmail(emailList, "Transaction Complete", "All the parties have transfered the money.\r\n"+user1.getNickname() +
//							"Transfered"+offer1.getAmountInSrc()+" "+offer1.getSourceCurrency()+"\r\n"+
//							user2.getNickname() +
//							"Transfered"+offer2.getAmountInSrc()+" "+offer2.getSourceCurrency()+"\r\n"
//							);
					// emailUtil.sendEmail(emailList, "Transaction Complete", "Transaction
					// Complete");
					String user1emailtext = "All the parties have transfered the money.\r\n" + user1.getNickname()
							+ " has Transfered " + offer1.getAmountInSrc() + " " + offer1.getSourceCurrency() + "\r\n"
							+ user2.getNickname() + " has Transfered " + offer2.getAmountInSrc() + " "
							+ offer2.getSourceCurrency() + "\r\n" +

							"\r\n You received " + (offer1.getAmountInDes() - (offer1.getAmountInDes() * 0.05)) + " "
							+ offer1.getDestinationCurrency() + " after service fee";
					String user2emailtext = "All the parties have transfered the money.\r\n" + user1.getNickname()
							+ " has Transfered " + offer1.getAmountInSrc() + " " + offer1.getSourceCurrency() + "\r\n"
							+ user2.getNickname() + " has Transfered " + offer2.getAmountInSrc() + " "
							+ offer2.getSourceCurrency() + "\r\n" +

							"\r\n You received " + (offer2.getAmountInDes() - (offer2.getAmountInDes() * 0.05)) + " "
							+ offer2.getDestinationCurrency() + " after service fee";
					String emailList1[] = { user1.getEmailId() };
					String emailList2[] = { user2.getEmailId() };

					emailUtil.sendEmail(emailList1, "Transaction Complete", user1emailtext);
					emailUtil.sendEmail(emailList2, "Transaction Complete", user2emailtext);
				} else {
					if (updatedTransaction.getOfferIdStatus3() == 4) {
						Calendar cal = Calendar.getInstance();
						cal.set(Calendar.HOUR_OF_DAY, 0);
						cal.set(Calendar.MINUTE, 0);
						cal.set(Calendar.SECOND, 0);
						cal.set(Calendar.MILLISECOND, 0);
						Date todayDate = cal.getTime();
						String[] emailList = new String[3];

						emailList[0] = transaction.getOfferEmailId1();
						emailList[1] = transaction.getOfferEmailId2();
						emailList[2] = transaction.getOfferEmailId3();

						updatedTransaction = transactionService.updateTransactionStatusForThreeOffers(transactionId,
								transaction.getOfferId1(), transaction.getOfferId2(), transaction.getOfferId3());
						User user1 = userService.getUserByEmailId(transaction.getOfferEmailId1());
						User user2 = userService.getUserByEmailId(transaction.getOfferEmailId2());
						User user3 = userService.getUserByEmailId(transaction.getOfferEmailId3());
						Offer offer1 = offerService.getOfferById(transaction.getOfferId1());
						Offer offer3 = offerService.getOfferById(transaction.getOfferId3());
						Offer offer2 = offerService.getOfferById(transaction.getOfferId2());

//					emailUtil.sendEmail(emailList, "Transaction Complete", "All the parties have transfered the money.\r\n"+user1.getNickname() +
//							"Transfered "+offer1.getAmountInSrc()+" "+offer1.getSourceCurrency()+"\r\n"+
//							user2.getNickname() +
//							"Transfered "+offer2.getAmountInSrc()+" "+offer2.getSourceCurrency()+"\r\n"+
//							user3.getNickname() +
//							"Transfered "+offer3.getAmountInSrc()+" "+offer3.getSourceCurrency()+"\r\n"
//							
//							);
						String user1emailtext = "All the parties have transfered the money.\r\n" + user1.getNickname()
								+ " has Transfered " + offer1.getAmountInSrc() + " " + offer1.getSourceCurrency()
								+ "\r\n" + user2.getNickname() + " has Transfered " + offer2.getAmountInSrc() + " "
								+ offer2.getSourceCurrency() + "\r\n" + user3.getNickname() + " has Transfered "
								+ offer3.getAmountInSrc() + " " + offer3.getSourceCurrency() + "\r\n"
								+ "\r\n You received " + (offer1.getAmountInDes() - (offer1.getAmountInDes() * 0.05))
								+ " " + offer1.getDestinationCurrency() + " after service fee";
						String user2emailtext = "All the parties have transfered the money.\r\n" + user1.getNickname()
								+ " has Transfered " + offer1.getAmountInSrc() + " " + offer1.getSourceCurrency()
								+ "\r\n" + user2.getNickname() + " has Transfered " + offer2.getAmountInSrc() + " "
								+ offer2.getSourceCurrency() + "\r\n" + user3.getNickname() + " has Transfered "
								+ offer3.getAmountInSrc() + " " + offer3.getSourceCurrency() + "\r\n"
								+ "\r\n You received " + (offer2.getAmountInDes() - (offer2.getAmountInDes() * 0.05))
								+ " " + offer2.getDestinationCurrency() + " after service fee";
						String user3emailtext = "All the parties have transfered the money.\r\n" + user1.getNickname()
								+ " has Transfered " + offer1.getAmountInSrc() + " " + offer1.getSourceCurrency()
								+ "\r\n" + user2.getNickname() + " has Transfered " + offer2.getAmountInSrc() + " "
								+ offer2.getSourceCurrency() + "\r\n" + user3.getNickname() + " has Transfered "
								+ offer3.getAmountInSrc() + " " + offer3.getSourceCurrency() + "\r\n"
								+ "\r\n You received " + (offer3.getAmountInDes() - (offer3.getAmountInDes() * 0.05))
								+ " " + offer3.getDestinationCurrency() + " after service fee";

						String emailList1[] = { user1.getEmailId() };
						String emailList2[] = { user2.getEmailId() };
						String emailList3[] = { user3.getEmailId() };

						emailUtil.sendEmail(emailList1, "Transaction Complete", user1emailtext);
						emailUtil.sendEmail(emailList2, "Transaction Complete", user2emailtext);
						emailUtil.sendEmail(emailList3, "Transaction Complete", user3emailtext);

//					System.out.println(user1emailtext);
//					System.out.println(user2emailtext);
//					System.out.println(user3emailtext);

					}
				}
			}

			TransactionDTO transactionresponse = objectMapper.convertValue(updatedTransaction, TransactionDTO.class);
			return new ResponseEntity<TransactionDTO>(transactionresponse, HttpStatus.OK);
		} catch (Exception ex) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/transaction/report", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<ReportDTO>> getTransactionReport() {
		try {
			List<ReportDTO> reportList = new ArrayList<ReportDTO>();
			for (int i = 0; i < 12; i++) {
				LocalDate currentdate = LocalDate.now().minus(i, ChronoUnit.MONTHS);
				int month = currentdate.getMonthValue();
				int year = currentdate.getYear();
				int completedTransactionCount = transactionService.getCountOfCompletedTransactionPerMonth(year, month);
				int abortedTransactionCount = transactionService.getCountOfAbortedTransactionPerMonth(year, month);
				Double transferedSum = transactionService.getSumOfCompletedTransactionPerMonth(year, month);
				Double serviceFeeCollected = transferedSum * 0.05;
				DecimalFormat df = new DecimalFormat("#.##");
				Double serviceFeeCollected1 = Double.parseDouble(df.format(serviceFeeCollected));
				ReportDTO reportDTO = new ReportDTO(completedTransactionCount, abortedTransactionCount, year + "",
						Month.of(month).name(), transferedSum, serviceFeeCollected1);
				reportList.add(reportDTO);
			}
			return new ResponseEntity<List<ReportDTO>>(reportList, HttpStatus.OK);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR,
					ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

}
