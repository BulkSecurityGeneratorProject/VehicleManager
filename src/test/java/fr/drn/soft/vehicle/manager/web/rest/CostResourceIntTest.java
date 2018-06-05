package fr.drn.soft.vehicle.manager.web.rest;

import fr.drn.soft.vehicle.manager.VehicleManagerApp;

import fr.drn.soft.vehicle.manager.domain.Cost;
import fr.drn.soft.vehicle.manager.repository.CostRepository;
import fr.drn.soft.vehicle.manager.service.CostService;
import fr.drn.soft.vehicle.manager.service.dto.CostDTO;
import fr.drn.soft.vehicle.manager.service.mapper.CostMapper;
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
 * Test class for the CostResource REST controller.
 *
 * @see CostResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleManagerApp.class)
public class CostResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_PER_DAY = 1D;
    private static final Double UPDATED_PER_DAY = 2D;

    private static final Double DEFAULT_PER_KM = 1D;
    private static final Double UPDATED_PER_KM = 2D;

    private static final ZonedDateTime DEFAULT_CREATED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private CostRepository costRepository;

    @Autowired
    private CostMapper costMapper;

    @Autowired
    private CostService costService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCostMockMvc;

    private Cost cost;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CostResource costResource = new CostResource(costService);
        this.restCostMockMvc = MockMvcBuilders.standaloneSetup(costResource)
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
    public static Cost createEntity(EntityManager em) {
        Cost cost = new Cost()
            .name(DEFAULT_NAME)
            .perDay(DEFAULT_PER_DAY)
            .perKm(DEFAULT_PER_KM)
            .createdDateTime(DEFAULT_CREATED_DATE_TIME)
            .modifiedDateTime(DEFAULT_MODIFIED_DATE_TIME)
            .deleted(DEFAULT_DELETED);
        return cost;
    }

    @Before
    public void initTest() {
        cost = createEntity(em);
    }

    @Test
    @Transactional
    public void createCost() throws Exception {
        int databaseSizeBeforeCreate = costRepository.findAll().size();

        // Create the Cost
        CostDTO costDTO = costMapper.toDto(cost);
        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costDTO)))
            .andExpect(status().isCreated());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeCreate + 1);
        Cost testCost = costList.get(costList.size() - 1);
        assertThat(testCost.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCost.getPerDay()).isEqualTo(DEFAULT_PER_DAY);
        assertThat(testCost.getPerKm()).isEqualTo(DEFAULT_PER_KM);
        assertThat(testCost.getCreatedDateTime()).isEqualTo(DEFAULT_CREATED_DATE_TIME);
        assertThat(testCost.getModifiedDateTime()).isEqualTo(DEFAULT_MODIFIED_DATE_TIME);
        assertThat(testCost.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createCostWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = costRepository.findAll().size();

        // Create the Cost with an existing ID
        cost.setId(1L);
        CostDTO costDTO = costMapper.toDto(cost);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = costRepository.findAll().size();
        // set the field null
        cost.setName(null);

        // Create the Cost, which fails.
        CostDTO costDTO = costMapper.toDto(cost);

        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costDTO)))
            .andExpect(status().isBadRequest());

        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPerDayIsRequired() throws Exception {
        int databaseSizeBeforeTest = costRepository.findAll().size();
        // set the field null
        cost.setPerDay(null);

        // Create the Cost, which fails.
        CostDTO costDTO = costMapper.toDto(cost);

        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costDTO)))
            .andExpect(status().isBadRequest());

        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPerKmIsRequired() throws Exception {
        int databaseSizeBeforeTest = costRepository.findAll().size();
        // set the field null
        cost.setPerKm(null);

        // Create the Cost, which fails.
        CostDTO costDTO = costMapper.toDto(cost);

        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costDTO)))
            .andExpect(status().isBadRequest());

        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCosts() throws Exception {
        // Initialize the database
        costRepository.saveAndFlush(cost);

        // Get all the costList
        restCostMockMvc.perform(get("/api/costs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cost.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].perDay").value(hasItem(DEFAULT_PER_DAY.doubleValue())))
            .andExpect(jsonPath("$.[*].perKm").value(hasItem(DEFAULT_PER_KM.doubleValue())))
            .andExpect(jsonPath("$.[*].createdDateTime").value(hasItem(sameInstant(DEFAULT_CREATED_DATE_TIME))))
            .andExpect(jsonPath("$.[*].modifiedDateTime").value(hasItem(sameInstant(DEFAULT_MODIFIED_DATE_TIME))))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }

    @Test
    @Transactional
    public void getCost() throws Exception {
        // Initialize the database
        costRepository.saveAndFlush(cost);

        // Get the cost
        restCostMockMvc.perform(get("/api/costs/{id}", cost.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cost.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.perDay").value(DEFAULT_PER_DAY.doubleValue()))
            .andExpect(jsonPath("$.perKm").value(DEFAULT_PER_KM.doubleValue()))
            .andExpect(jsonPath("$.createdDateTime").value(sameInstant(DEFAULT_CREATED_DATE_TIME)))
            .andExpect(jsonPath("$.modifiedDateTime").value(sameInstant(DEFAULT_MODIFIED_DATE_TIME)))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCost() throws Exception {
        // Get the cost
        restCostMockMvc.perform(get("/api/costs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCost() throws Exception {
        // Initialize the database
        costRepository.saveAndFlush(cost);
        int databaseSizeBeforeUpdate = costRepository.findAll().size();

        // Update the cost
        Cost updatedCost = costRepository.findOne(cost.getId());
        // Disconnect from session so that the updates on updatedCost are not directly saved in db
        em.detach(updatedCost);
        updatedCost
            .name(UPDATED_NAME)
            .perDay(UPDATED_PER_DAY)
            .perKm(UPDATED_PER_KM)
            .createdDateTime(UPDATED_CREATED_DATE_TIME)
            .modifiedDateTime(UPDATED_MODIFIED_DATE_TIME)
            .deleted(UPDATED_DELETED);
        CostDTO costDTO = costMapper.toDto(updatedCost);

        restCostMockMvc.perform(put("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costDTO)))
            .andExpect(status().isOk());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeUpdate);
        Cost testCost = costList.get(costList.size() - 1);
        assertThat(testCost.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCost.getPerDay()).isEqualTo(UPDATED_PER_DAY);
        assertThat(testCost.getPerKm()).isEqualTo(UPDATED_PER_KM);
        assertThat(testCost.getCreatedDateTime()).isEqualTo(UPDATED_CREATED_DATE_TIME);
        assertThat(testCost.getModifiedDateTime()).isEqualTo(UPDATED_MODIFIED_DATE_TIME);
        assertThat(testCost.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingCost() throws Exception {
        int databaseSizeBeforeUpdate = costRepository.findAll().size();

        // Create the Cost
        CostDTO costDTO = costMapper.toDto(cost);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCostMockMvc.perform(put("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(costDTO)))
            .andExpect(status().isCreated());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCost() throws Exception {
        // Initialize the database
        costRepository.saveAndFlush(cost);
        int databaseSizeBeforeDelete = costRepository.findAll().size();

        // Get the cost
        restCostMockMvc.perform(delete("/api/costs/{id}", cost.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cost.class);
        Cost cost1 = new Cost();
        cost1.setId(1L);
        Cost cost2 = new Cost();
        cost2.setId(cost1.getId());
        assertThat(cost1).isEqualTo(cost2);
        cost2.setId(2L);
        assertThat(cost1).isNotEqualTo(cost2);
        cost1.setId(null);
        assertThat(cost1).isNotEqualTo(cost2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CostDTO.class);
        CostDTO costDTO1 = new CostDTO();
        costDTO1.setId(1L);
        CostDTO costDTO2 = new CostDTO();
        assertThat(costDTO1).isNotEqualTo(costDTO2);
        costDTO2.setId(costDTO1.getId());
        assertThat(costDTO1).isEqualTo(costDTO2);
        costDTO2.setId(2L);
        assertThat(costDTO1).isNotEqualTo(costDTO2);
        costDTO1.setId(null);
        assertThat(costDTO1).isNotEqualTo(costDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(costMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(costMapper.fromId(null)).isNull();
    }
}
