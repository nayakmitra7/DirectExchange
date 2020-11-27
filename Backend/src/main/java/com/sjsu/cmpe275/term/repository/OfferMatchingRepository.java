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
}
