package com.company.enroller.repository;

import com.company.enroller.model.Participant;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findByLogin(String login);

    List<Participant> findAllByLoginContainingIgnoreCase(String loginFilter, Sort sort);
}
