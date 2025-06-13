package com.company.enroller.persistence;

import com.company.enroller.exception.MeetingAlreadyExistsException;
import com.company.enroller.exception.ObjectNotFoundException;
import com.company.enroller.exception.ParticipantAlreadyInMeetingException;
import com.company.enroller.exception.ParticipantNotFoundInMeetingException;
import com.company.enroller.exception.RemovalOfMeetingsWithParticipantsException;
import com.company.enroller.model.Meeting;
import com.company.enroller.model.Participant;
import lombok.RequiredArgsConstructor;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final Session dbSession;

    private final ParticipantService participantService;

    public List<Meeting> getAll() {
        String hql = "FROM Meeting";
        org.hibernate.query.Query query = dbSession.createQuery(hql);
        return query.list();
    }

    public Meeting getById(Long id) {
        return findById(id).orElseThrow(() -> new ObjectNotFoundException("Meeting with id '%d' not found".formatted(id)));
    }

    private Optional<Meeting> findById(long id) {
        String hql = "From Meeting where id = :id";
        org.hibernate.query.Query query = dbSession.createQuery(hql);
        query.setParameter("id", id);
        return query.getResultStream().findFirst();
    }

    public List<Meeting> findMeetings(String title, String description, String participantLogin, String sortMode) {
        Optional<Participant> participant = participantService.findByLogin(participantLogin);
        String hql = "FROM Meeting as meeting WHERE title LIKE :title AND description LIKE :description ";
        if (participant.isPresent()) {
            hql += " AND :participant in elements(participants)";
        }
        if (sortMode.equals("title")) {
            hql += " ORDER BY title";
        }
        Query<Meeting> query = dbSession.createQuery(hql, Meeting.class);
        query.setParameter("title", "%" + title + "%").setParameter("description", "%" + description + "%");
        participant.ifPresent(value -> query.setParameter("participant", value));
        return query.list();
    }

    public void deleteById(Long id) {
        Meeting meeting = getById(id);
        if (!meeting.getParticipants().isEmpty()) {
            throw new RemovalOfMeetingsWithParticipantsException(meeting.getTitle());
        }
        Transaction transaction = dbSession.beginTransaction();
        dbSession.delete(meeting);
        transaction.commit();
    }

    public void addParticipant(Long id, String login) {
        Meeting meeting = getById(id);
        Participant participant = participantService.getByLogin(login);
        if (meeting.getParticipants().contains(participant)) {
            throw new ParticipantAlreadyInMeetingException(id, login);
        }

        Transaction transaction = dbSession.beginTransaction();
        meeting.addParticipant(participant);
        dbSession.merge(meeting);
        transaction.commit();
    }

    public void deleteParticipant(Long id, String login) {
        Meeting meeting = getById(id);
        Participant participant = participantService.getByLogin(login);
        if (!meeting.getParticipants().contains(participant)) {
            throw new ParticipantNotFoundInMeetingException(id, login);
        }

        Transaction transaction = dbSession.beginTransaction();
        meeting.removeParticipant(participant);
        dbSession.merge(meeting);
        transaction.commit();
    }

    public Meeting add(Meeting meeting) {
        if (alreadyExist(meeting)) {
            throw new MeetingAlreadyExistsException(meeting.getTitle());
        }
        meeting.setId(null);
        Transaction transaction = dbSession.beginTransaction();
        dbSession.save(meeting);
        transaction.commit();
        return meeting;
    }

    public Meeting update(Long id, Meeting meeting) {
        getById(id);
        meeting.setId(id);
        Transaction transaction = dbSession.beginTransaction();
        dbSession.merge(meeting);
        transaction.commit();
        return meeting;
    }

    private boolean alreadyExist(Meeting meeting) {
        String hql = "FROM Meeting WHERE title=:title AND date=:date";
        Query query = dbSession.createQuery(hql);
        Collection resultList = query.setParameter("title", meeting.getTitle()).setParameter("date", meeting.getDate())
                .list();
        return query.list().size() != 0;
    }

}
