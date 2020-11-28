package com.sjsu.cmpe275.term.models;

import java.util.Date;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import org.apache.tomcat.jni.Address;

@StaticMetamodel( Offer.class )
public class Offer_ {
    public static volatile SingularAttribute<Offer, Long> id;
    public static volatile SingularAttribute<Offer, String> sourceCountry;
    public static volatile SingularAttribute<Offer, String> sourceCurrency;
    public static volatile SingularAttribute<Offer, String> destinationCountry;
    public static volatile SingularAttribute<Offer, String> destinationCurrency;
    public static volatile SingularAttribute<Offer, Double> amount;
    public static volatile SingularAttribute<Offer, Double> amountInUSD;
    public static volatile SingularAttribute<Offer, Date> expirationDate;
    public static volatile SingularAttribute<Offer, Boolean> counterOfferAllowed;
    public static volatile SingularAttribute<Offer, Boolean> splitOfferAllowed;
    public static volatile SingularAttribute<Offer, Long> userId;

//    public static volatile SetAttribute<Person, Order> orders;
}