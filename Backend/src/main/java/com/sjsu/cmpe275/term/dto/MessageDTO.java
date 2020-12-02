package com.sjsu.cmpe275.term.dto;

import java.util.List;

import com.sjsu.cmpe275.term.models.Account;

public class MessageDTO {


	private String receiverEmail;
	private String receiverNickname;
	private String textMessage;
	private String senderEmail;
	private String senderNickname;
	
	public MessageDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MessageDTO(String receiverEmail, String receiverNickname, String textMessage, String senderEmail,
			String senderNickname) {
		super();
		this.receiverEmail = receiverEmail;
		this.receiverNickname = receiverNickname;
		this.textMessage = textMessage;
		this.senderEmail = senderEmail;
		this.senderNickname = senderNickname;
	}
	public String getReceiverEmail() {
		return receiverEmail;
	}
	public void setReceiverEmail(String receiverEmail) {
		this.receiverEmail = receiverEmail;
	}
	public String getReceiverNickname() {
		return receiverNickname;
	}
	public void setReceiverNickname(String receiverNickname) {
		this.receiverNickname = receiverNickname;
	}
	public String getMessage() {
		return textMessage;
	}
	public void setMessage(String message) {
		textMessage = message;
	}
	public String getSenderEmail() {
		return senderEmail;
	}
	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}
	public String getSenderNickname() {
		return senderNickname;
	}
	public void setSenderNickname(String senderNickname) {
		this.senderNickname = senderNickname;
	}
	

	

	
}
