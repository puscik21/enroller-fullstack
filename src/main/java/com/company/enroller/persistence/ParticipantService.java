package com.company.enroller.persistence;

import com.company.enroller.controllers.utils.SortOrder;
import com.company.enroller.exception.ObjectNotFoundException;
import com.company.enroller.exception.ParticipantAlreadyExistsException;
import com.company.enroller.model.Participant;
import lombok.RequiredArgsConstructor;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final Session dbSession;

    private final PasswordEncoder passwordEncoder;

    public List<Participant> getAll(String filter, String sortBy, SortOrder sortOrder) {
        StringBuilder hql = new StringBuilder("FROM Participant");
        hql = addFilter(hql, filter)
                .append(" ORDER BY %s %s".formatted(sortBy, sortOrder.toString()));

        Query<Participant> query = dbSession.createQuery(hql.toString(), Participant.class);
        if (StringUtils.hasText(filter)) {
            query.setParameter("filter", "%" + filter + "%");
        }
        return query.list();
    }

    private StringBuilder addFilter(StringBuilder hql, String key) {
        if (StringUtils.hasText(key)) {
            hql.append(" WHERE login LIKE :filter");
        }
        return hql;
    }

    public Participant getByLogin(String login) {
        return findByLogin(login)
                .orElseThrow(() -> new ObjectNotFoundException("Participant with login '%s' not found".formatted(login)));
    }

    public Optional<Participant> findByLogin(String login) {
        String hql = "FROM Participant WHERE login = :login";
        Query<Participant> query = dbSession.createQuery(hql, Participant.class);
        query.setParameter("login", login);
        return query.getResultStream().findFirst();
    }

    public Participant register(Participant participant) {
        if (findByLogin(participant.getLogin()).isPresent()) {
            throw new ParticipantAlreadyExistsException(participant.getLogin());
        }
        Transaction transaction = dbSession.beginTransaction();
        dbSession.save(setEncodedPassword(participant));
        transaction.commit();
        return participant;
    }

    public Participant update(String login, Participant participant) {
        getByLogin(login);
        participant.setLogin(login);
        Transaction transaction = dbSession.beginTransaction();
        dbSession.merge(setEncodedPassword(participant));
        transaction.commit();
        return participant;
    }

    private Participant setEncodedPassword(Participant participant) {
        String hashedPassword = passwordEncoder.encode(participant.getPassword());
        participant.setPassword(hashedPassword);
        return participant;
    }

    public void removeByLogin(String login) {
        Participant participant = getByLogin(login);
        Transaction transaction = dbSession.beginTransaction();
        dbSession.delete(participant);
        transaction.commit();
    }
}
