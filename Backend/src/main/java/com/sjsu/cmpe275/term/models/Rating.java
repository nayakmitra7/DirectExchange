package com.sjsu.cmpe275.term.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="RATING")
public class Rating {
	
		@Id
		@Column(name = "userId", unique = true, nullable = false)
		private Long userId;
		@Column(name = "faultCount", nullable = false)
		private int faultCount;
		@Column(name = "totalCount", nullable = false)
		private int totalCount;
		
		public Rating(Long userId, int faultCount, int totalCount) {
			super();
			this.userId = userId;
			this.faultCount = faultCount;
			this.totalCount = totalCount;
		}
		public Rating() {
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
