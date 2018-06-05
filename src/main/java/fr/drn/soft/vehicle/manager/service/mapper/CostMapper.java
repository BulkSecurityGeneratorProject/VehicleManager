package fr.drn.soft.vehicle.manager.service.mapper;

import fr.drn.soft.vehicle.manager.domain.*;
import fr.drn.soft.vehicle.manager.service.dto.CostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Cost and its DTO CostDTO.
 */
@Mapper(componentModel = "spring", uses = {VehicleMapper.class})
public interface CostMapper extends EntityMapper<CostDTO, Cost> {

    @Mapping(source = "vehicle.id", target = "vehicleId")
    CostDTO toDto(Cost cost);

    @Mapping(source = "vehicleId", target = "vehicle")
    Cost toEntity(CostDTO costDTO);

    default Cost fromId(Long id) {
        if (id == null) {
            return null;
        }
        Cost cost = new Cost();
        cost.setId(id);
        return cost;
    }
}
