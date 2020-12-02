package com.sjsu.cmpe275.term.service.user;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.User;
import com.sjsu.cmpe275.term.models.User_;
import com.sjsu.cmpe275.term.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	@PersistenceUnit
	private EntityManagerFactory entityManagerFactory;

	@Override
	public User createUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User getUserByNickname(String nickname) {

		CriteriaBuilder builder = entityManagerFactory.getCriteriaBuilder();
		EntityManager em = entityManagerFactory.createEntityManager();
		CriteriaQuery<User> criteria = builder.createQuery(User.class);
		Root<User> userRoot = criteria.from(User.class);
		criteria.select(userRoot);
		criteria.where(builder.equal(userRoot.get(User_.nickname), nickname));

		List<User> returnuser = em.createQuery(criteria).getResultList();
		if (returnuser.size() == 0)
			return null;
		return returnuser.get(0);
	}

	@Override
	public User getUserByEmailId(String emailId) {

		CriteriaBuilder builder = entityManagerFactory.getCriteriaBuilder();
		EntityManager em = entityManagerFactory.createEntityManager();
		CriteriaQuery<User> criteria = builder.createQuery(User.class);
		Root<User> userRoot = criteria.from(User.class);
		criteria.select(userRoot);
		criteria.where(builder.equal(userRoot.get(User_.emailId), emailId));

		List<User> returnuser = em.createQuery(criteria).getResultList();
		if (returnuser.size() == 0)
			return null;
		return returnuser.get(0);
	}

	@Override
	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public List<User> getBusinessUsers(Long id) {
		// TODO Auto-generated method stub
		return userRepository.findBuisnessUsers(id);
	}

}
