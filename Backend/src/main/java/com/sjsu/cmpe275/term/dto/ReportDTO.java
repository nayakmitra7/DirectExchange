package com.sjsu.cmpe275.term.dto;



public class ReportDTO {
	
    private Integer completedTransactionCount;
    private Integer abortedTransactionCount;
    private String year;
    private String month;
    private Double transferedSum;
    private Double serviceFeeCollected;
    
	public ReportDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ReportDTO( Integer completedTransactionCount, Integer abortedTransactionCount, String year,
			String month, Double transferedSum, Double serviceFeeCollected) {
		super();
		
		this.completedTransactionCount = completedTransactionCount;
		this.abortedTransactionCount = abortedTransactionCount;
		this.year = year;
		this.month = month;
		this.transferedSum = transferedSum;
		this.serviceFeeCollected = serviceFeeCollected;
	}

	public Integer getCompletedTransactionCount() {
		return completedTransactionCount;
	}
	public void setCompletedTransactionCount(Integer completedTransactionCount) {
		this.completedTransactionCount = completedTransactionCount;
	}
	public Integer getAbortedTransactionCount() {
		return abortedTransactionCount;
	}
	public void setAbortedTransactionCount(Integer abortedTransactionCount) {
		this.abortedTransactionCount = abortedTransactionCount;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public Double getTransferedSum() {
		return transferedSum;
	}
	public void setTransferedSum(Double transferedSum) {
		this.transferedSum = transferedSum;
	}
	public Double getServiceFeeCollected() {
		return serviceFeeCollected;
	}
	public void setServiceFeeCollected(Double serviceFeeCollected) {
		this.serviceFeeCollected = serviceFeeCollected;
	}
    
	
	
	
	
}
