package fr.drn.soft.vehicle.manager.service.impl;

import fr.drn.soft.vehicle.manager.service.JobWorkerService;
import fr.drn.soft.vehicle.manager.domain.JobWorker;
import fr.drn.soft.vehicle.manager.repository.JobWorkerRepository;
import fr.drn.soft.vehicle.manager.service.dto.JobWorkerDTO;
import fr.drn.soft.vehicle.manager.service.mapper.JobWorkerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing JobWorker.
 */
@Service
@Transactional
public class JobWorkerServiceImpl implements JobWorkerService {

    private final Logger log = LoggerFactory.getLogger(JobWorkerServiceImpl.class);

    private final JobWorkerRepository jobWorkerRepository;

    private final JobWorkerMapper jobWorkerMapper;

    public JobWorkerServiceImpl(JobWorkerRepository jobWorkerRepository, JobWorkerMapper jobWorkerMapper) {
        this.jobWorkerRepository = jobWorkerRepository;
        this.jobWorkerMapper = jobWorkerMapper;
    }

    /**
     * Save a jobWorker.
     *
     * @param jobWorkerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public JobWorkerDTO save(JobWorkerDTO jobWorkerDTO) {
        log.debug("Request to save JobWorker : {}", jobWorkerDTO);
        JobWorker jobWorker = jobWorkerMapper.toEntity(jobWorkerDTO);
        jobWorker = jobWorkerRepository.save(jobWorker);
        return jobWorkerMapper.toDto(jobWorker);
    }

    /**
     * Get all the jobWorkers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<JobWorkerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all JobWorkers");
        return jobWorkerRepository.findAll(pageable)
            .map(jobWorkerMapper::toDto);
    }

    /**
     * Get one jobWorker by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public JobWorkerDTO findOne(Long id) {
        log.debug("Request to get JobWorker : {}", id);
        JobWorker jobWorker = jobWorkerRepository.findOne(id);
        return jobWorkerMapper.toDto(jobWorker);
    }

    /**
     * Delete the jobWorker by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete JobWorker : {}", id);
        jobWorkerRepository.delete(id);
    }
}
