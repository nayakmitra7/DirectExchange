package com.sjsu.cmpe275.term.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long>{
	@Query("Select o1 from Offer o1 where o1.expirationDate >= :expirationDate and o1.userId != :userId")
	List<Offer> getOffer(@Param("userId") Long userId,@Param("expirationDate") Date expirationDate);
}
