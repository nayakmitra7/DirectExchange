package com.sjsu.cmpe275.term.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sjsu.cmpe275.term.dto.ErrorResponseDTO;
import com.sjsu.cmpe275.term.dto.UserDTO;
import com.sjsu.cmpe275.term.exceptions.GenericException;
import com.sjsu.cmpe275.term.models.User;
import com.sjsu.cmpe275.term.service.user.UserService;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	UserService userService;
	@Autowired
	private ObjectMapper objectMapper;

	@RequestMapping(value = "/user/{emailId}", method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public ResponseEntity<UserDTO> getOfferController(@PathVariable("emailId") String emailId) {
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
	public ResponseEntity<UserDTO> createUserController(@RequestBody UserDTO userDTO) {
		ErrorResponseDTO errorResponseDTO = null;
		try {
			User user = objectMapper.convertValue(userDTO, User.class);
			String nickname = user.getNickname();
			User existingUser = userService.getUserByNickname(nickname);
			if (existingUser != null) {
				errorResponseDTO = new ErrorResponseDTO(400, HttpStatus.BAD_REQUEST, "Nickname already exists");
				throw new GenericException(errorResponseDTO);
			}
			User newUser = userService.createUser(user);
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
}
