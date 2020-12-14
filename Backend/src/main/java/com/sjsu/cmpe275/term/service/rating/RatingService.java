package com.sjsu.cmpe275.term.service.rating;

import java.util.List;

import com.sjsu.cmpe275.term.models.Rating;

public interface RatingService {

	public Rating getRating(Long userId);

	public Rating createRating(Rating rating);
	public List<Rating> getRating();
	
}
