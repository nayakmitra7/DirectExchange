package com.sjsu.cmpe275.term.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.cmpe275.term.models.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long>{

}
