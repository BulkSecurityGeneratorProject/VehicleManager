package fr.drn.soft.vehicle.manager.repository;

import fr.drn.soft.vehicle.manager.domain.JobWorker;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the JobWorker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JobWorkerRepository extends JpaRepository<JobWorker, Long> {

}
