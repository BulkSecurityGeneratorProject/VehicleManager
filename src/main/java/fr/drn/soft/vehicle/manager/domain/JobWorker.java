package fr.drn.soft.vehicle.manager.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A JobWorker.
 */
@Entity
@Table(name = "job_worker")
public class JobWorker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_date_time")
    private ZonedDateTime createdDateTime;

    @Column(name = "modified_date_time")
    private ZonedDateTime modifiedDateTime;

    @Column(name = "deleted")
    private Boolean deleted;

    @ManyToOne
    private Job work;

    @ManyToOne
    private Driver driver;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public JobWorker createdDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
        return this;
    }

    public void setCreatedDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public ZonedDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public JobWorker modifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
        return this;
    }

    public void setModifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public JobWorker deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Job getWork() {
        return work;
    }

    public JobWorker work(Job job) {
        this.work = job;
        return this;
    }

    public void setWork(Job job) {
        this.work = job;
    }

    public Driver getDriver() {
        return driver;
    }

    public JobWorker driver(Driver driver) {
        this.driver = driver;
        return this;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        JobWorker jobWorker = (JobWorker) o;
        if (jobWorker.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), jobWorker.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "JobWorker{" +
            "id=" + getId() +
            ", createdDateTime='" + getCreatedDateTime() + "'" +
            ", modifiedDateTime='" + getModifiedDateTime() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
