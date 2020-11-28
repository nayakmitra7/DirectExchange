package com.sjsu.cmpe275.term.service.user;

import com.sjsu.cmpe275.term.models.User;

public interface UserService {
	public User createUser(User user);
	public User getUserByNickname(String nickname);
	public User getUserByEmailId(String emailId);
}
