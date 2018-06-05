package fr.drn.soft.vehicle.manager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Driver.
 */
@Entity
@Table(name = "driver")
public class Driver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "first_name", length = 100, nullable = false)
    private String firstName;

    @NotNull
    @Size(max = 100)
    @Column(name = "last_name", length = 100, nullable = false)
    private String lastName;

    @NotNull
    @Size(max = 100)
    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @NotNull
    @Size(max = 255)
    @Column(name = "business_identification", length = 255, nullable = false)
    private String businessIdentification;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "hire_date")
    private ZonedDateTime hireDate;

    @Column(name = "created_date_time")
    private ZonedDateTime createdDateTime;

    @Column(name = "modified_date_time")
    private ZonedDateTime modifiedDateTime;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "driver")
    @JsonIgnore
    private Set<JobWorker> jobs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Driver firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Driver lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Driver email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBusinessIdentification() {
        return businessIdentification;
    }

    public Driver businessIdentification(String businessIdentification) {
        this.businessIdentification = businessIdentification;
        return this;
    }

    public void setBusinessIdentification(String businessIdentification) {
        this.businessIdentification = businessIdentification;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Driver phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public ZonedDateTime getHireDate() {
        return hireDate;
    }

    public Driver hireDate(ZonedDateTime hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(ZonedDateTime hireDate) {
        this.hireDate = hireDate;
    }

    public ZonedDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public Driver createdDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
        return this;
    }

    public void setCreatedDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public ZonedDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public Driver modifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
        return this;
    }

    public void setModifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Driver deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Set<JobWorker> getJobs() {
        return jobs;
    }

    public Driver jobs(Set<JobWorker> jobWorkers) {
        this.jobs = jobWorkers;
        return this;
    }

    public Driver addJob(JobWorker jobWorker) {
        this.jobs.add(jobWorker);
        jobWorker.setDriver(this);
        return this;
    }

    public Driver removeJob(JobWorker jobWorker) {
        this.jobs.remove(jobWorker);
        jobWorker.setDriver(null);
        return this;
    }

    public void setJobs(Set<JobWorker> jobWorkers) {
        this.jobs = jobWorkers;
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
        Driver driver = (Driver) o;
        if (driver.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), driver.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Driver{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", businessIdentification='" + getBusinessIdentification() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", createdDateTime='" + getCreatedDateTime() + "'" +
            ", modifiedDateTime='" + getModifiedDateTime() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
