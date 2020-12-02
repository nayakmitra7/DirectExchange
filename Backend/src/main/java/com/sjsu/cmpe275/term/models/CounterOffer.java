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

	@Column(name = "counterAmtFromSrcToTgt", nullable = false)
	private Double counterAmtFromSrcToTgt;
	@Column(name = "counterCurrencyFromSrcToTgt", nullable = false)
	private String counterCurrencyFromSrcToTgt;

	public CounterOffer() {}
	public CounterOffer(Long srcUserId, Long srcOfferId, Long tgtUserId, Long tgtOfferId, Double counterAmtFromSrcToTgt,
			String counterCurrencyFromSrcToTgt) {
		super();
		this.srcUserId = srcUserId;
		this.srcOfferId = srcOfferId;
		this.tgtUserId = tgtUserId;
		this.tgtOfferId = tgtOfferId;
		this.counterAmtFromSrcToTgt = counterAmtFromSrcToTgt;
		this.counterCurrencyFromSrcToTgt = counterCurrencyFromSrcToTgt;
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
