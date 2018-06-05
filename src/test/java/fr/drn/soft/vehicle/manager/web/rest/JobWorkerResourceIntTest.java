package fr.drn.soft.vehicle.manager.web.rest;

import fr.drn.soft.vehicle.manager.VehicleManagerApp;

import fr.drn.soft.vehicle.manager.domain.JobWorker;
import fr.drn.soft.vehicle.manager.repository.JobWorkerRepository;
import fr.drn.soft.vehicle.manager.service.JobWorkerService;
import fr.drn.soft.vehicle.manager.service.dto.JobWorkerDTO;
import fr.drn.soft.vehicle.manager.service.mapper.JobWorkerMapper;
import fr.drn.soft.vehicle.manager.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static fr.drn.soft.vehicle.manager.web.rest.TestUtil.sameInstant;
import static fr.drn.soft.vehicle.manager.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the JobWorkerResource REST controller.
 *
 * @see JobWorkerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleManagerApp.class)
public class JobWorkerResourceIntTest {

    private static final ZonedDateTime DEFAULT_CREATED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private JobWorkerRepository jobWorkerRepository;

    @Autowired
    private JobWorkerMapper jobWorkerMapper;

    @Autowired
    private JobWorkerService jobWorkerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restJobWorkerMockMvc;

    private JobWorker jobWorker;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JobWorkerResource jobWorkerResource = new JobWorkerResource(jobWorkerService);
        this.restJobWorkerMockMvc = MockMvcBuilders.standaloneSetup(jobWorkerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static JobWorker createEntity(EntityManager em) {
        JobWorker jobWorker = new JobWorker()
            .createdDateTime(DEFAULT_CREATED_DATE_TIME)
            .modifiedDateTime(DEFAULT_MODIFIED_DATE_TIME)
            .deleted(DEFAULT_DELETED);
        return jobWorker;
    }

    @Before
    public void initTest() {
        jobWorker = createEntity(em);
    }

    @Test
    @Transactional
    public void createJobWorker() throws Exception {
        int databaseSizeBeforeCreate = jobWorkerRepository.findAll().size();

        // Create the JobWorker
        JobWorkerDTO jobWorkerDTO = jobWorkerMapper.toDto(jobWorker);
        restJobWorkerMockMvc.perform(post("/api/job-workers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobWorkerDTO)))
            .andExpect(status().isCreated());

        // Validate the JobWorker in the database
        List<JobWorker> jobWorkerList = jobWorkerRepository.findAll();
        assertThat(jobWorkerList).hasSize(databaseSizeBeforeCreate + 1);
        JobWorker testJobWorker = jobWorkerList.get(jobWorkerList.size() - 1);
        assertThat(testJobWorker.getCreatedDateTime()).isEqualTo(DEFAULT_CREATED_DATE_TIME);
        assertThat(testJobWorker.getModifiedDateTime()).isEqualTo(DEFAULT_MODIFIED_DATE_TIME);
        assertThat(testJobWorker.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createJobWorkerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jobWorkerRepository.findAll().size();

        // Create the JobWorker with an existing ID
        jobWorker.setId(1L);
        JobWorkerDTO jobWorkerDTO = jobWorkerMapper.toDto(jobWorker);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJobWorkerMockMvc.perform(post("/api/job-workers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobWorkerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the JobWorker in the database
        List<JobWorker> jobWorkerList = jobWorkerRepository.findAll();
        assertThat(jobWorkerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllJobWorkers() throws Exception {
        // Initialize the database
        jobWorkerRepository.saveAndFlush(jobWorker);

        // Get all the jobWorkerList
        restJobWorkerMockMvc.perform(get("/api/job-workers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jobWorker.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDateTime").value(hasItem(sameInstant(DEFAULT_CREATED_DATE_TIME))))
            .andExpect(jsonPath("$.[*].modifiedDateTime").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE_TIME))))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    public void getJobWorker() throws Exception {
        // Initialize the database
        jobWorkerRepository.saveAndFlush(jobWorker);

        // Get the jobWorker
        restJobWorkerMockMvc.perform(get("/api/job-workers/{id}", jobWorker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jobWorker.getId().intValue()))
            .andExpect(jsonPath("$.createdDateTime").value(sameInstant(DEFAULT_CREATED_DATE_TIME)))
            .andExpect(jsonPath("$.modifiedDateTime").value(sameInstant(DEFAULT_MODIFIED_DATE_TIME)))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingJobWorker() throws Exception {
        // Get the jobWorker
        restJobWorkerMockMvc.perform(get("/api/job-workers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJobWorker() throws Exception {
        // Initialize the database
        jobWorkerRepository.saveAndFlush(jobWorker);
        int databaseSizeBeforeUpdate = jobWorkerRepository.findAll().size();

        // Update the jobWorker
        JobWorker updatedJobWorker = jobWorkerRepository.findOne(jobWorker.getId());
        // Disconnect from session so that the updates on updatedJobWorker are not directly saved in db
        em.detach(updatedJobWorker);
        updatedJobWorker
            .createdDateTime(UPDATED_CREATED_DATE_TIME)
            .modifiedDateTime(UPDATED_MODIFIED_DATE_TIME)
            .deleted(UPDATED_DELETED);
        JobWorkerDTO jobWorkerDTO = jobWorkerMapper.toDto(updatedJobWorker);

        restJobWorkerMockMvc.perform(put("/api/job-workers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobWorkerDTO)))
            .andExpect(status().isOk());

        // Validate the JobWorker in the database
        List<JobWorker> jobWorkerList = jobWorkerRepository.findAll();
        assertThat(jobWorkerList).hasSize(databaseSizeBeforeUpdate);
        JobWorker testJobWorker = jobWorkerList.get(jobWorkerList.size() - 1);
        assertThat(testJobWorker.getCreatedDateTime()).isEqualTo(UPDATED_CREATED_DATE_TIME);
        assertThat(testJobWorker.getModifiedDateTime()).isEqualTo(UPDATED_MODIFIED_DATE_TIME);
        assertThat(testJobWorker.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingJobWorker() throws Exception {
        int databaseSizeBeforeUpdate = jobWorkerRepository.findAll().size();

        // Create the JobWorker
        JobWorkerDTO jobWorkerDTO = jobWorkerMapper.toDto(jobWorker);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restJobWorkerMockMvc.perform(put("/api/job-workers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jobWorkerDTO)))
            .andExpect(status().isCreated());

        // Validate the JobWorker in the database
        List<JobWorker> jobWorkerList = jobWorkerRepository.findAll();
        assertThat(jobWorkerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteJobWorker() throws Exception {
        // Initialize the database
        jobWorkerRepository.saveAndFlush(jobWorker);
        int databaseSizeBeforeDelete = jobWorkerRepository.findAll().size();

        // Get the jobWorker
        restJobWorkerMockMvc.perform(delete("/api/job-workers/{id}", jobWorker.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<JobWorker> jobWorkerList = jobWorkerRepository.findAll();
        assertThat(jobWorkerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobWorker.class);
        JobWorker jobWorker1 = new JobWorker();
        jobWorker1.setId(1L);
        JobWorker jobWorker2 = new JobWorker();
        jobWorker2.setId(jobWorker1.getId());
        assertThat(jobWorker1).isEqualTo(jobWorker2);
        jobWorker2.setId(2L);
        assertThat(jobWorker1).isNotEqualTo(jobWorker2);
        jobWorker1.setId(null);
        assertThat(jobWorker1).isNotEqualTo(jobWorker2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(JobWorkerDTO.class);
        JobWorkerDTO jobWorkerDTO1 = new JobWorkerDTO();
        jobWorkerDTO1.setId(1L);
        JobWorkerDTO jobWorkerDTO2 = new JobWorkerDTO();
        assertThat(jobWorkerDTO1).isNotEqualTo(jobWorkerDTO2);
        jobWorkerDTO2.setId(jobWorkerDTO1.getId());
        assertThat(jobWorkerDTO1).isEqualTo(jobWorkerDTO2);
        jobWorkerDTO2.setId(2L);
        assertThat(jobWorkerDTO1).isNotEqualTo(jobWorkerDTO2);
        jobWorkerDTO1.setId(null);
        assertThat(jobWorkerDTO1).isNotEqualTo(jobWorkerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(jobWorkerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(jobWorkerMapper.fromId(null)).isNull();
    }
}
