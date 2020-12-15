package com.sjsu.cmpe275.term.service.offer;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe275.term.models.Offer;
import com.sjsu.cmpe275.term.repository.OfferRepository;
import com.sjsu.cmpe275.term.utils.Constant;

@Service
public class OfferServiceImpl implements OfferService {

	@Autowired
	OfferRepository offerRepository;
	@PersistenceUnit
	private EntityManagerFactory entityManagerFactory;

	@Override
	public Offer getOfferById(Long id) {
		Offer offer = offerRepository.findById(id).orElse(null);
		return offerRepository.getOne(id);
	}

	@Override
	public Offer getOfferById1(Long id) {
		EntityManager em = entityManagerFactory.createEntityManager();
		Offer offer = em.find(Offer.class, id);
		em.merge(offer);
		em.refresh(offer);
		em.close(); 
		return offer;
	}

//	@Override
//	public Offer getOfferById1(String id) {
//		Offer offer = offerRepository.getOfferById1(id);
//		return offer;
//	}
	@Override
	public Offer postOffer(Offer offer) {
		// TODO Auto-generated method stub
		return offerRepository.save(offer);
	}

//	@Override
//	public Page<Offer> getOffer(int pagenumber, int limit, String sourcecurrencyamount, String destinationcountry,
//			String sourcecurrency, String destinationcurrency) {
//		CriteriaBuilder builder = entityManagerFactory.getCriteriaBuilder();
//		EntityManager em= entityManagerFactory.createEntityManager();
//		CriteriaQuery<Offer> criteria = builder.createQuery( Offer.class );
//		Root<Offer> offerRoot = criteria.from( Offer.class );
//		criteria.select( offerRoot );
//		Predicate offerRestriction= builder.and(
//				//if(!destinationcurrency.equals("empty")) {
//					builder.equal( offerRoot.get( Offer_.sourceCurrency ),sourcecurrency ) 
//				//}	
//				
//				);
//		Predicate desCurrencyRestriction= builder.and(
//				//if(!destinationcurrency.equals("empty")) {
//					builder.equal( offerRoot.get( Offer_.destinationCurrency ),destinationcurrency ) 
//				//}	
//				
//				);
//				
////		if(!sourcecountry.equals("empty")) {
////			criteria.where( builder.equal( offerRoot.get( Offer_.sourceCountry ),sourcecountry ) );
////		}
////		if(!destinationcountry.equals("empty")) {
////			criteria.where( builder.equal( offerRoot.get( Offer_.destinationCountry ),destinationcountry ) );
////		}
////		if(!sourcecurrency.equals("empty")) {
////			criteria.where( builder.equal( offerRoot.get( Offer_.sourceCurrency ),sourcecurrency ) );
////		}
////		if(!destinationcurrency.equals("empty")) {
////			criteria.where( builder.equal( offerRoot.get( Offer_.destinationCurrency ),destinationcurrency ) );
////		}
//		criteria.where(builder.and(offerRestriction,desCurrencyRestriction));
//		List<Offer> people = em.createQuery( criteria ).getResultList();
//		
//		Pageable pageable=PageRequest.of(pagenumber, limit);
//		return offerRepository.findAll(pageable);		
//	}
//	
	@Override
	public List<Offer> getOffer(Long userId, Date todayDate) {
		// TODO Auto-generated method stub
		return offerRepository.getOffer(userId, todayDate);
	}

	@Override
	public List<Offer> getOwnOfferById(Long userId, Date todayDate, int openOffer) {

		return offerRepository.getOwnOfferById(userId, todayDate, openOffer);
	}

	@Override
	public List<Offer> getCloseOfferById(Long userId, Date todayDate) {

		return offerRepository.getCloseOfferById(userId, todayDate, Constant.OFFEREXPIRED, Constant.OFFERFULFILED);
	}

	@Override
	public List<Offer> getClosedTransactionOffers(Long userId, int offerStatus) {
		return offerRepository.getClosedTransactionOffers(userId, offerStatus);
	}

	@Override
	public List<Offer> getClosedTransactionOffersByMonth(Long userId, int offerStatus, int month) {
		return offerRepository.getClosedTransactionOffersByMonth(userId, offerStatus, month);
	}
}
