package com.sjsu.cmpe275.term.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
	@Query("Select a1 from Account a1 where a1.userId = :userId")
	List<Account> getAccounts(@Param("userId") Long userId);
}
