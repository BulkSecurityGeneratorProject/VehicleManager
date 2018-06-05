package fr.drn.soft.vehicle.manager.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Vehicle.
 */
@Entity
@Table(name = "vehicle")
public class Vehicle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotNull
    @Size(max = 50)
    @Column(name = "number_plate", length = 50, nullable = false)
    private String numberPlate;

    @Column(name = "number_of_place")
    private Integer numberOfPlace;

    @Column(name = "created_date_time")
    private ZonedDateTime createdDateTime;

    @Column(name = "modified_date_time")
    private ZonedDateTime modifiedDateTime;

    @Column(name = "deleted")
    private Boolean deleted;

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

    public Vehicle name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumberPlate() {
        return numberPlate;
    }

    public Vehicle numberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
        return this;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public Integer getNumberOfPlace() {
        return numberOfPlace;
    }

    public Vehicle numberOfPlace(Integer numberOfPlace) {
        this.numberOfPlace = numberOfPlace;
        return this;
    }

    public void setNumberOfPlace(Integer numberOfPlace) {
        this.numberOfPlace = numberOfPlace;
    }

    public ZonedDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public Vehicle createdDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
        return this;
    }

    public void setCreatedDateTime(ZonedDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public ZonedDateTime getModifiedDateTime() {
        return modifiedDateTime;
    }

    public Vehicle modifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
        return this;
    }

    public void setModifiedDateTime(ZonedDateTime modifiedDateTime) {
        this.modifiedDateTime = modifiedDateTime;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Vehicle deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
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
        Vehicle vehicle = (Vehicle) o;
        if (vehicle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", numberPlate='" + getNumberPlate() + "'" +
            ", numberOfPlace=" + getNumberOfPlace() +
            ", createdDateTime='" + getCreatedDateTime() + "'" +
            ", modifiedDateTime='" + getModifiedDateTime() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
