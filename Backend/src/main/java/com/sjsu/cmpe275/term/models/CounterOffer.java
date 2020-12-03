package com.sjsu.cmpe275.term.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "COUNTER_OFFER")
public class CounterOffer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;

	@Column(name = "srcUserId", nullable = false)
	private Long srcUserId;
	@Column(name = "srcOfferId", nullable = false)
	private Long srcOfferId;
	@Column(name = "tgtUserId", nullable = false)
	private Long tgtUserId;
	@Column(name = "tgtOfferId", nullable = false)
	private Long tgtOfferId;

	@Column(name = "isCounterSplit", nullable = false)
	private boolean isCounterSplit;
	@Column(name = "otherUserId")
	private Long otherUserId;
	@Column(name = "otherOfferId")
	private Long otherOfferId;

	@Column(name = "counterAmtFromSrcToTgt", nullable = false)
	private Double counterAmtFromSrcToTgt;
	@Column(name = "counterCurrencyFromSrcToTgt", nullable = false)
	private String counterCurrencyFromSrcToTgt;
	@Column(name = "counterStatus", nullable = false)
	private int counterStatus;

	public CounterOffer() {
	}

	public CounterOffer(Long srcUserId, Long srcOfferId, Long tgtUserId, Long tgtOfferId, boolean isCounterSplit,
			Long otherUserId, Long otherOfferId, Double counterAmtFromSrcToTgt, String counterCurrencyFromSrcToTgt,
			int counterStatus) {
		super();
		this.srcUserId = srcUserId;
		this.srcOfferId = srcOfferId;
		this.tgtUserId = tgtUserId;
		this.tgtOfferId = tgtOfferId;
		this.isCounterSplit = isCounterSplit;
		this.otherUserId = otherUserId;
		this.otherOfferId = otherOfferId;
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
		this.counterCurrencyFromSrcToTgt = counterCurrencyFromSrcToTgt;
		this.counterStatus = counterStatus;
	}

	public boolean isCounterSplit() {
		return isCounterSplit;
	}

	public void setCounterSplit(boolean isCounterSplit) {
		this.isCounterSplit = isCounterSplit;
	}

	public Long getOtherUserId() {
		return otherUserId;
	}

	public void setOtherUserId(Long otherUserId) {
		this.otherUserId = otherUserId;
	}

	public Long getOtherOfferId() {
		return otherOfferId;
	}

	public void setOtherOfferId(Long otherOfferId) {
		this.otherOfferId = otherOfferId;
	}

	public int getCounterStatus() {
		return counterStatus;
	}

	public void setCounterStatus(int counterStatus) {
		this.counterStatus = counterStatus;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getSrcUserId() {
		return srcUserId;
	}

	public void setSrcUserId(Long srcUserId) {
		this.srcUserId = srcUserId;
	}

	public Long getSrcOfferId() {
		return srcOfferId;
	}

	public void setSrcOfferId(Long srcOfferId) {
		this.srcOfferId = srcOfferId;
	}

	public Long getTgtUserId() {
		return tgtUserId;
	}

	public void setTgtUserId(Long tgtUserId) {
		this.tgtUserId = tgtUserId;
	}

	public Long getTgtOfferId() {
		return tgtOfferId;
	}

	public void setTgtOfferId(Long tgtOfferId) {
		this.tgtOfferId = tgtOfferId;
	}

	public Double getCounterAmtFromSrcToTgt() {
		return counterAmtFromSrcToTgt;
	}

	public void setCounterAmtFromSrcToTgt(Double counterAmtFromSrcToTgt) {
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
	}

	public String getCounterCurrencyFromSrcToTgt() {
		return counterCurrencyFromSrcToTgt;
	}

	public void setCounterCurrencyFromSrcToTgt(String counterAmtFromSrcToTgt) {
		this.counterCurrencyFromSrcToTgt = counterAmtFromSrcToTgt;
	}

}
