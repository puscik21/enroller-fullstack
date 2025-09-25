package com.company.enroller.persistence;

import com.company.enroller.exception.MeetingAlreadyExistsException;
import com.company.enroller.exception.ObjectNotFoundException;
import com.company.enroller.exception.ParticipantAlreadyInMeetingException;
import com.company.enroller.exception.ParticipantNotFoundInMeetingException;
import com.company.enroller.exception.RemovalOfMeetingsWithParticipantsException;
import com.company.enroller.model.Meeting;
import com.company.enroller.model.Participant;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final ParticipantService participantService;
    private final MeetingRepository meetingRepository;

    @Transactional(readOnly = true) // TODO: Do I need this?
    public List<Meeting> getAll() {
        return meetingRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Meeting getById(Long id) {
        return meetingRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Meeting with id '%d' not found".formatted(id)));
    }

    public List<Meeting> findMeetings(String title, String description, String participantLogin, String sortMode) {
        Specification<Meeting> spec = Specification.where(null);

        if (!title.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(root.get("title"), "%" + title + "%"));
        }
        if (!description.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.like(root.get("description"), "%" + description + "%"));
        }
        if (!participantLogin.isEmpty()) {
            Participant participant = participantService.getByLogin(participantLogin);
            spec = spec.and((root, query, cb) -> cb.isMember(participant, root.get("participant")));
        }
        return meetingRepository.findAll(spec); // TODO: Add sort
    }

//    public List<Meeting> findMeetingsOld(String title, String description, String participantLogin, String sortMode) {
//        Optional<Participant> participant = participantService.findByLogin(participantLogin);
//        String hql = "FROM Meeting as meeting WHERE title LIKE :title AND description LIKE :description ";
//        if (participant.isPresent()) {
//            hql += " AND :participant in elements(participants)";
//        }
//        if (sortMode.equals("title")) {
//            hql += " ORDER BY title";
//        }
//        Query<Meeting> query = dbSession.createQuery(hql, Meeting.class);
//        query.setParameter("title", "%" + title + "%").setParameter("description", "%" + description + "%");
//        participant.ifPresent(value -> query.setParameter("participant", value));
//        return query.list();
//    }

    @Transactional
    public Meeting add(Meeting meeting) {
        meetingRepository.findByTitleAndDate(meeting.getTitle(), meeting.getDate())
                .ifPresent(m -> {
                    throw new MeetingAlreadyExistsException(m.getTitle());
                });
        return meetingRepository.save(meeting);
    }

    @Transactional
    public void deleteById(Long id) {
        Meeting meeting = getById(id);
        if (!meeting.getParticipants().isEmpty()) {
            throw new RemovalOfMeetingsWithParticipantsException(meeting.getTitle());
        }
        meetingRepository.deleteById(id);
    }

    @Transactional
    public void addParticipant(Long id, String login) {
        Meeting meeting = getById(id);
        Participant participant = participantService.getByLogin(login);
        if (meeting.getParticipants().contains(participant)) {
            throw new ParticipantAlreadyInMeetingException(id, login);
        }
        meeting.addParticipant(participant);
    }

    @Transactional
    public void deleteParticipant(Long id, String login) {
        Meeting meeting = getById(id);
        Participant participant = participantService.getByLogin(login);
        if (!meeting.getParticipants().contains(participant)) {
            throw new ParticipantNotFoundInMeetingException(id, login);
        }
        meeting.removeParticipant(participant);
    }


    @Transactional
    public Meeting update(Long id, Meeting meeting) {
        Meeting existingMeeting = getById(id);
        meeting.setId(existingMeeting.getId());
        return meetingRepository.save(meeting);
    }
}
