package com.sjsu.cmpe275.term.dto;

public class RatingDTO {

	private Long userId;
	private long rating;

	public RatingDTO(Long id, long rating) {
		super();
		this.userId = id;
		this.rating = rating;
	}

	public RatingDTO() {
		// TODO Auto-generated constructor stub
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public long getRating() {
		return rating;
	}

	public void setRating(long rating) {
		this.rating = rating;
	}

	
}
