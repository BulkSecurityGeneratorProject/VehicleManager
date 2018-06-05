package fr.drn.soft.vehicle.manager.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the JobWorker entity.
 */
public class JobWorkerDTO implements Serializable {

    private Long id;

    private ZonedDateTime createdDateTime;

    private ZonedDateTime modifiedDateTime;

    private Boolean deleted;

    private Long workId;

    private String workName;

    private Long driverId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getWorkId() {
        return workId;
    }

    public void setWorkId(Long jobId) {
        this.workId = jobId;
    }

    public String getWorkName() {
        return workName;
    }

    public void setWorkName(String jobName) {
        this.workName = jobName;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        JobWorkerDTO jobWorkerDTO = (JobWorkerDTO) o;
        if(jobWorkerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobWorkerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobWorkerDTO{" +
            "id=" + getId() +
            ", createdDateTime='" + getCreatedDateTime() + "'" +
            ", modifiedDateTime='" + getModifiedDateTime() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
