package com.sjsu.cmpe275.term.service.rating;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Rating;
import com.sjsu.cmpe275.term.repository.RatingRepository;

@Service
public class RatingServiceImpl implements RatingService {

	@Autowired
	RatingRepository ratingRepository;

	@Override
	public Rating createRating(Rating rating) {
		return ratingRepository.save(rating);
	}

	@Override
	public Rating getRating(Long userId) {

		return ratingRepository.findById(userId).orElse(null);

	}

	@Override
	public List<Rating> getRating() {
		// TODO Auto-generated method stub
		return ratingRepository.findAll();
	}

}
