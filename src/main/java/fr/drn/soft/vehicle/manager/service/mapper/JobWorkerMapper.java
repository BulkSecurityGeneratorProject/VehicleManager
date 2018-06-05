package fr.drn.soft.vehicle.manager.service.mapper;

import fr.drn.soft.vehicle.manager.domain.*;
import fr.drn.soft.vehicle.manager.service.dto.JobWorkerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity JobWorker and its DTO JobWorkerDTO.
 */
@Mapper(componentModel = "spring", uses = {JobMapper.class, DriverMapper.class})
public interface JobWorkerMapper extends EntityMapper<JobWorkerDTO, JobWorker> {

    @Mapping(source = "work.id", target = "workId")
    @Mapping(source = "work.name", target = "workName")
    @Mapping(source = "driver.id", target = "driverId")
    JobWorkerDTO toDto(JobWorker jobWorker);

    @Mapping(source = "workId", target = "work")
    @Mapping(source = "driverId", target = "driver")
    JobWorker toEntity(JobWorkerDTO jobWorkerDTO);

    default JobWorker fromId(Long id) {
        if (id == null) {
            return null;
        }
        JobWorker jobWorker = new JobWorker();
        jobWorker.setId(id);
        return jobWorker;
    }
}
