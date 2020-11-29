package com.sjsu.cmpe275.term.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferMatchingRepository extends JpaRepository<Offer, Long>{
	@Query("Select o1 from Offer o1 where o1.destinationCountry = (Select o2.sourceCountry from Offer o2 where id = :offerId ) and o1.sourceCountry = (Select o2.destinationCountry from Offer o2 where id = :offerId ) and o1.userId != :userId and o1.amountInUSD >= :min and o1.amountInUSD <= :max and o1.expirationDate >= :expirationDate")
	List<Offer> findSingleMatchingOffers(@Param("offerId") Long offerId, @Param("userId") Long userId, @Param("expirationDate") Date expirationDate, @Param("min") Double min, @Param("max") Double max );

	@Query("Select o1 from Offer o1 where o1.destinationCountry = (Select o2.sourceCountry from Offer o2 where id = :offerId ) and o1.sourceCountry = (Select o2.destinationCountry from Offer o2 where id = :offerId ) and o1.userId != :userId and o1.amountInUSD < :amount and o1.expirationDate >= :expirationDate and o1.splitOfferAllowed=true")
	List<Offer> findSplitMatchingOfferContendersA(@Param("offerId") Long offerId, @Param("userId") Long userId, @Param("expirationDate") Date expirationDate, @Param("amount") Double amount );

	@Query("Select o1 from Offer o1 where o1.destinationCountry = (Select o2.sourceCountry from Offer o2 where id = :offerId ) and o1.sourceCountry = (Select o2.destinationCountry from Offer o2 where id = :offerId ) and o1.userId != :userId and o1.amountInUSD > :amount and o1.expirationDate >= :expirationDate and o1.splitOfferAllowed=true")
	List<Offer> findSplitMatchingOfferContendersTarget(@Param("offerId") Long offerId, @Param("userId") Long userId, @Param("expirationDate") Date expirationDate, @Param("amount") Double amount );

	@Query("Select o1 from Offer o1 where o1.sourceCountry = (Select o2.sourceCountry from Offer o2 where id = :offerId ) and o1.destinationCountry = (Select o2.destinationCountry from Offer o2 where id = :offerId ) and o1.userId != :userId and o1.amountInUSD < :amount and o1.expirationDate >= :expirationDate and o1.splitOfferAllowed=true")
	List<Offer> findSplitMatchingOfferContendersPart(@Param("offerId") Long offerId, @Param("userId") Long userId, @Param("expirationDate") Date expirationDate, @Param("amount") Double amount );
	
	@Query("Select o1 from Offer o1 where o1.sourceCountry = (Select o2.destinationCountry from Offer o2 where id = :targetOfferId ) and o1.destinationCountry = (Select o2.sourceCountry from Offer o2 where id = :targetOfferId ) and o1.userId != :userId  and o1.userId != :targetUserId and o1.amountInUSD < :targetAmount and o1.expirationDate >= :expirationDate and o1.splitOfferAllowed=true")
	List<Offer> findSplitMatchingOfferContendersLesserThanTarget(@Param("targetOfferId") Long targetOfferId, @Param("userId") Long userId, @Param("targetUserId") Long targetUserId, @Param("expirationDate") Date expirationDate, @Param("targetAmount") Double targetAmount );
	
}
