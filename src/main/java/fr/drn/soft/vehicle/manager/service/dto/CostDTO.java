package fr.drn.soft.vehicle.manager.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Cost entity.
 */
public class CostDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String name;

    @NotNull
    private Double perDay;

    @NotNull
    private Double perKm;

    private ZonedDateTime createdDateTime;

    private ZonedDateTime modifiedDateTime;

    private Boolean deleted;

    private Long vehicleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPerDay() {
        return perDay;
    }

    public void setPerDay(Double perDay) {
        this.perDay = perDay;
    }

    public Double getPerKm() {
        return perKm;
    }

    public void setPerKm(Double perKm) {
        this.perKm = perKm;
    }

    public ZonedDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public ZonedDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public void setModifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CostDTO costDTO = (CostDTO) o;
        if(costDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), costDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CostDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", perDay=" + getPerDay() +
            ", perKm=" + getPerKm() +
            ", createdDateTime='" + getCreatedDateTime() + "'" +
            ", modifiedDateTime='" + getModifiedDateTime() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
