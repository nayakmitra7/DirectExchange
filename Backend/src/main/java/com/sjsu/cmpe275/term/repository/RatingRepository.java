package com.sjsu.cmpe275.term.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sjsu.cmpe275.term.models.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long>{

}