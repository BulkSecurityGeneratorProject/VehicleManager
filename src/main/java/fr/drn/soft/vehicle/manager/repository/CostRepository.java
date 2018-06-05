package fr.drn.soft.vehicle.manager.repository;

import fr.drn.soft.vehicle.manager.domain.Cost;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cost entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostRepository extends JpaRepository<Cost, Long> {

}
