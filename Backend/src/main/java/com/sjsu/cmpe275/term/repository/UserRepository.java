package com.sjsu.cmpe275.term.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sjsu.cmpe275.term.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
	@Query("select u1 from User u1 where u1.id in (select DISTINCT offerUserId1 from Transaction t where t.tranStatus = 1 and t.offerUserId1 = :userId or t.offerUserId2 = :userId or t.offerUserId3 = :userId ) or u1.id in(select DISTINCT t1.offerUserId2 as o2 from Transaction t1 where t1.tranStatus = 1 and t1.offerUserId1 = :userId or t1.offerUserId2 = :userId or t1.offerUserId3 = :userId ) or u1.id in (select DISTINCT offerUserId3 as o3 from Transaction t2 where t2.tranStatus = 1 and t2.offerUserId1 = :userId or t2.offerUserId2 = :userId or t2.offerUserId3 = :userId  ) ")
	List<User> findBuisnessUsers(@Param("userId") Long userId);
}
