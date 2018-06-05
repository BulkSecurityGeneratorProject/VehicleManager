package fr.drn.soft.vehicle.manager.service;

import fr.drn.soft.vehicle.manager.service.dto.JobWorkerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing JobWorker.
 */
public interface JobWorkerService {

    /**
     * Save a jobWorker.
     *
     * @param jobWorkerDTO the entity to save
     * @return the persisted entity
     */
    JobWorkerDTO save(JobWorkerDTO jobWorkerDTO);

    /**
     * Get all the jobWorkers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<JobWorkerDTO> findAll(Pageable pageable);

    /**
     * Get the "id" jobWorker.
     *
     * @param id the id of the entity
     * @return the entity
     */
    JobWorkerDTO findOne(Long id);

    /**
     * Delete the "id" jobWorker.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
