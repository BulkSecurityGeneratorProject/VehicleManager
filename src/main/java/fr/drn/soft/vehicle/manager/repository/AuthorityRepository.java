package fr.drn.soft.vehicle.manager.repository;

import fr.drn.soft.vehicle.manager.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
