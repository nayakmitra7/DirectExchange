package com.sjsu.cmpe275.term.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.AccountDTO;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.MessageDTO;
import com.sjsu.cmpe275.term.dto.ResponseDTO;
import com.sjsu.cmpe275.term.dto.UserAccountDTO;
import com.sjsu.cmpe275.term.dto.UserDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.Account;
import com.sjsu.cmpe275.term.models.User;
import com.sjsu.cmpe275.term.service.account.AccountService;
import com.sjsu.cmpe275.term.service.user.UserService;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	UserService userService;
	@Autowired
	AccountService accountService;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private JavaMailSender emailSender;

	@RequestMapping(value = "/user/{emailId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<UserDTO> getUserController(@PathVariable("emailId") String emailId) {
		User user = userService.getUserByEmailId(emailId);
		UserDTO userDTO = null;
		if (user == null) {
			ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(404, HttpStatus.NOT_FOUND,
					"Email Id does not exist");
			throw new GenericException(errorResponseDTO);
		}

		userDTO = objectMapper.convertValue(user, new TypeReference<UserDTO>() {
		});
		return new ResponseEntity<UserDTO>(userDTO, HttpStatus.OK);

	}

	@RequestMapping(value = "/user", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<UserDTO> createUserController(@RequestBody UserAccountDTO userAccountDTO) {
		ErrorResponseDTO errorResponseDTO = null;
		try {
			User user = objectMapper.convertValue(userAccountDTO.getUserDTO(), User.class);
			Account account1 = objectMapper.convertValue(userAccountDTO.getAccountDTO1(), Account.class);
			Account account2 = objectMapper.convertValue(userAccountDTO.getAccountDTO2(), Account.class);
			String nickname = user.getNickname();
			User existingUser = userService.getUserByNickname(nickname);
			if (existingUser != null) {
				errorResponseDTO = new ErrorResponseDTO(400, HttpStatus.BAD_REQUEST, "Nickname already exists");
				throw new GenericException(errorResponseDTO);
			}
			if (account1.getCountryName().equals(account2.getCountryName())) {
				errorResponseDTO = new ErrorResponseDTO(400, HttpStatus.BAD_REQUEST,
						"Country names should be different");
				throw new GenericException(errorResponseDTO);
			}
			User newUser = userService.createUser(user);
			account1.setUserId(newUser.getId());
			account2.setUserId(newUser.getId());
			accountService.createAccount(account1);
			accountService.createAccount(account2);
//			List<Account> accounts = new ArrayList<>();
//			accounts.add(accountService.createAccount(account1));
//			accounts.add(accountService.createAccount(account2));
//			newUser.setAccount(accounts);
			UserDTO userDTO1 = objectMapper.convertValue(newUser, new TypeReference<UserDTO>() {
			});
			return new ResponseEntity<UserDTO>(userDTO1, HttpStatus.OK);
		} catch (GenericException ge) {
			throw new GenericException(errorResponseDTO);
		} catch (Exception ex) {
			errorResponseDTO = new ErrorResponseDTO(500, HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
			throw new GenericException(errorResponseDTO);
		}

	}

	@RequestMapping(value = "/user/messaging/{id}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<UserDTO>> getBusinessUsers(@PathVariable("id") Long userId) {
		List<User> user = userService.getBusinessUsers(userId);
		List<UserDTO> userDTOs = user.stream().map(element -> objectMapper.convertValue(element, UserDTO.class))
				.collect(Collectors.toList());
		return new ResponseEntity<List<UserDTO>>(userDTOs, HttpStatus.OK);

	}

	@RequestMapping(value = "/user/messaging/send", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> sendMessage(@RequestBody MessageDTO messageDTO) {
		SimpleMailMessage msg = new SimpleMailMessage();

		msg.setTo(messageDTO.getReceiverEmail());
		msg.setSubject("Direct Messaging");
		msg.setText(messageDTO.getMessage());
		msg.setCc(messageDTO.getSenderEmail());
		emailSender.send(msg);
		return new ResponseEntity<ResponseDTO>(new ResponseDTO(200, HttpStatus.OK, "Message Sent"), HttpStatus.OK);

	}

	@RequestMapping(value = "/user/account", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public ResponseEntity<ResponseDTO> createAccount(@RequestBody AccountDTO accountDTO) {

		Account newAccount = objectMapper.convertValue(accountDTO, Account.class);
		accountService.createAccount(newAccount);

		return new ResponseEntity<ResponseDTO>(new ResponseDTO(200, HttpStatus.OK, "Account posted"), HttpStatus.OK);

	}

	@RequestMapping(value = "/user/account/{userId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<List<AccountDTO>> getAccounts(@PathVariable("userId") Long userId) {
		List<Account> accounts = accountService.getAccounts(userId);
		List<AccountDTO> accountDTOs = accounts.stream()
				.map(element -> objectMapper.convertValue(element, AccountDTO.class)).collect(Collectors.toList());

		return new ResponseEntity<List<AccountDTO>>(accountDTOs, HttpStatus.OK);

	}
}
