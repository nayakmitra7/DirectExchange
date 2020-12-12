package com.sjsu.cmpe275.term.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.Country;

public interface CountryRepository extends JpaRepository<Country, Long>{
	@Query("Select c1 from Country c1 where c1.country  in (SELECT distinct countryName FROM Account a1 where a1.userId=:userId and (transactionType = 'Both' or transactionType = 'Send'))")
	List<Country> findUserSendCountries(@Param("userId") Long userId);
	@Query("Select c1 from Country c1 where c1.country in (SELECT distinct countryName FROM Account a1 where a1.userId=:userId and (transactionType = 'Both' or transactionType = 'Recieve'))")
	List<Country> findUserReceiveCountries(@Param("userId") Long userId);
}
