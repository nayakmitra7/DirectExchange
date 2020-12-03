package com.sjsu.cmpe275.term.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{

	@Query("Select t1 from Transaction t1 where (t1.offerUserId1 = :userId or t1.offerUserId2 = :userId or t1.offerUserId3 = :userId) and t1.tranStatus=1")
	List<Transaction> getInTransactionData(@Param("userId") Long userId);

	@Query("Select o1 from Offer o1 where o1.id in (:offerId1,:offerId2)")
	List<Offer> getSingleOfferByTransaction(@Param("offerId1") Long offerId1,@Param("offerId2") Long offerId2);

	@Query("Select o1 from Offer o1 where o1.id in (:offerId1,:offerId2,:offerId3)")
	List<Offer> getSplitOfferByTransaction(@Param("offerId1") Long offerId1,@Param("offerId2") Long offerId2,@Param("offerId3") Long offerId3);
	
//	@Query("update CounterOffer set counterStatus = 3 where id in (select id from CounterOffer where srcOfferId=:offerId or tgtOfferId=:offerId or otherOfferId=:offerId ) and counterStatus = 0")
//	List<Offer> updateCounterOfferStatusOnAccept(@Param("offerId") Long offerId);
//	
//	@Query("update offer set offer_status = 1 where (id in (select src_offer_id as id from counter_offer where src_offer_id=:offerId or tgt_offer_id=:offerId or other_offer_id=:offerId ) or id in (select tgt_offer_id as id from counter_offer where src_offer_id=:offerId or tgt_offer_id=:offerId or other_offer_id=:offerId) or id in (select other_offer_id as id from counter_offer where src_offer_id=:offerId or tgt_offer_id=:offerId or other_offer_id=:offerId)) and id != :offerId and offer_status = 5")
//	List<Offer> updateOfferStatusOnAccept(@Param("offerId") Long offerId);
	
}

