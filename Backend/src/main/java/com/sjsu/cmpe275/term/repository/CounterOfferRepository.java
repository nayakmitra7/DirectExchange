package com.sjsu.cmpe275.term.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.cmpe275.term.models.CounterOffer;

public interface CounterOfferRepository extends JpaRepository<CounterOffer, Long> {

}
