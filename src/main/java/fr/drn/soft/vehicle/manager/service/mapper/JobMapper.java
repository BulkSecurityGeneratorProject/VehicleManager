package fr.drn.soft.vehicle.manager.service.mapper;

import fr.drn.soft.vehicle.manager.domain.*;
import fr.drn.soft.vehicle.manager.service.dto.JobDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Job and its DTO JobDTO.
 */
@Mapper(componentModel = "spring", uses = {VehicleMapper.class})
public interface JobMapper extends EntityMapper<JobDTO, Job> {

    @Mapping(source = "vehicle.id", target = "vehicleId")
    @Mapping(source = "vehicle.name", target = "vehicleName")
    JobDTO toDto(Job job);

    @Mapping(source = "vehicleId", target = "vehicle")
    Job toEntity(JobDTO jobDTO);

    default Job fromId(Long id) {
        if (id == null) {
            return null;
        }
        Job job = new Job();
        job.setId(id);
        return job;
    }
}
