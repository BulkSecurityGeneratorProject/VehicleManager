package fr.drn.soft.vehicle.manager.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Cost.
 */
@Entity
@Table(name = "cost")
public class Cost implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotNull
    @Column(name = "per_day", nullable = false)
    private Double perDay;

    @NotNull
    @Column(name = "per_km", nullable = false)
    private Double perKm;

    @Column(name = "created_date_time")
    private ZonedDateTime createdDateTime;

    @Column(name = "modified_date_time")
    private ZonedDateTime modifiedDateTime;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToOne
    @JoinColumn(unique = true)
    private Vehicle vehicle;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Cost name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPerDay() {
        return perDay;
    }

    public Cost perDay(Double perDay) {
        this.perDay = perDay;
        return this;
    }

    public void setPerDay(Double perDay) {
        this.perDay = perDay;
    }

    public Double getPerKm() {
        return perKm;
    }

    public Cost perKm(Double perKm) {
        this.perKm = perKm;
        return this;
    }

    public void setPerKm(Double perKm) {
        this.perKm = perKm;
    }

    public ZonedDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public Cost createdDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
        return this;
    }

    public void setCreatedDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public ZonedDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public Cost modifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
        return this;
    }

    public void setModifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Cost deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public Cost vehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
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
        Cost cost = (Cost) o;
        if (cost.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cost.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cost{" +
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
