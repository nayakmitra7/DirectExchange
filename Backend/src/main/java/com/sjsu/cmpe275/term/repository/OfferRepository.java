package com.sjsu.cmpe275.term.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long>{
	@Query("Select o1 from Offer o1 where o1.expirationDate >= :expirationDate and o1.userId != :userId and o1.offerStatus=1 ")
	List<Offer> getOffer(@Param("userId") Long userId,@Param("expirationDate") Date expirationDate);
	
	@Query("Select o1 from Offer o1 where o1.expirationDate >= :expirationDate and o1.userId = :userId and o1.offerStatus=:offerStatus")
	List<Offer> getOwnOfferById(@Param("userId")Long userId, @Param("expirationDate") Date expirationDate,@Param("offerStatus")int offerStatus);
	
	@Query("Select o1 from Offer o1 where o1.expirationDate >= :expirationDate and o1.offerStatus != :offerStatus and o1.userId = :userId ")
	List<Offer> getCloseOfferById(@Param("userId")Long userId, @Param("expirationDate") Date expirationDate,@Param("offerStatus")int offerStatus);
	
}
