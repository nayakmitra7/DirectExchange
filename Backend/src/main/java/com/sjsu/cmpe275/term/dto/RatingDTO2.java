package com.sjsu.cmpe275.term.dto;

public class RatingDTO2 {

	private Long userId;
	
	private int faultCount;
	private int totalCount;
	
	public RatingDTO2() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public int getFaultCount() {
		return faultCount;
	}

	public void setFaultCount(int faultCount) {
		this.faultCount = faultCount;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}


	
}
