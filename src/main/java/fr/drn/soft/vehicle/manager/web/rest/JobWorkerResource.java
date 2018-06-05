package fr.drn.soft.vehicle.manager.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.drn.soft.vehicle.manager.service.JobWorkerService;
import fr.drn.soft.vehicle.manager.web.rest.errors.BadRequestAlertException;
import fr.drn.soft.vehicle.manager.web.rest.util.HeaderUtil;
import fr.drn.soft.vehicle.manager.web.rest.util.PaginationUtil;
import fr.drn.soft.vehicle.manager.service.dto.JobWorkerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing JobWorker.
 */
@RestController
@RequestMapping("/api")
public class JobWorkerResource {

    private final Logger log = LoggerFactory.getLogger(JobWorkerResource.class);

    private static final String ENTITY_NAME = "jobWorker";

    private final JobWorkerService jobWorkerService;

    public JobWorkerResource(JobWorkerService jobWorkerService) {
        this.jobWorkerService = jobWorkerService;
    }

    /**
     * POST  /job-workers : Create a new jobWorker.
     *
     * @param jobWorkerDTO the jobWorkerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new jobWorkerDTO, or with status 400 (Bad Request) if the jobWorker has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/job-workers")
    @Timed
    public ResponseEntity<JobWorkerDTO> createJobWorker(@RequestBody JobWorkerDTO jobWorkerDTO) throws URISyntaxException {
        log.debug("REST request to save JobWorker : {}", jobWorkerDTO);
        if (jobWorkerDTO.getId() != null) {
            throw new BadRequestAlertException("A new jobWorker cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JobWorkerDTO result = jobWorkerService.save(jobWorkerDTO);
        return ResponseEntity.created(new URI("/api/job-workers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /job-workers : Updates an existing jobWorker.
     *
     * @param jobWorkerDTO the jobWorkerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated jobWorkerDTO,
     * or with status 400 (Bad Request) if the jobWorkerDTO is not valid,
     * or with status 500 (Internal Server Error) if the jobWorkerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/job-workers")
    @Timed
    public ResponseEntity<JobWorkerDTO> updateJobWorker(@RequestBody JobWorkerDTO jobWorkerDTO) throws URISyntaxException {
        log.debug("REST request to update JobWorker : {}", jobWorkerDTO);
        if (jobWorkerDTO.getId() == null) {
            return createJobWorker(jobWorkerDTO);
        }
        JobWorkerDTO result = jobWorkerService.save(jobWorkerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, jobWorkerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /job-workers : get all the jobWorkers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of jobWorkers in body
     */
    @GetMapping("/job-workers")
    @Timed
    public ResponseEntity<List<JobWorkerDTO>> getAllJobWorkers(Pageable pageable) {
        log.debug("REST request to get a page of JobWorkers");
        Page<JobWorkerDTO> page = jobWorkerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/job-workers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /job-workers/:id : get the "id" jobWorker.
     *
     * @param id the id of the jobWorkerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the jobWorkerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/job-workers/{id}")
    @Timed
    public ResponseEntity<JobWorkerDTO> getJobWorker(@PathVariable Long id) {
        log.debug("REST request to get JobWorker : {}", id);
        JobWorkerDTO jobWorkerDTO = jobWorkerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(jobWorkerDTO));
    }

    /**
     * DELETE  /job-workers/:id : delete the "id" jobWorker.
     *
     * @param id the id of the jobWorkerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/job-workers/{id}")
    @Timed
    public ResponseEntity<Void> deleteJobWorker(@PathVariable Long id) {
        log.debug("REST request to delete JobWorker : {}", id);
        jobWorkerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
