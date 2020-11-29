package com.sjsu.cmpe275.term.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjsu.cmpe275.term.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{

}
