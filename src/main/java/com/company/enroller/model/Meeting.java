package com.company.enroller.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "meeting")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String date;

    //    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "meeting_participant", joinColumns = {@JoinColumn(name = "meeting_id")}, inverseJoinColumns = {
            @JoinColumn(name = "participant_login")})
    Set<Participant> participants = new HashSet<>();

    public long getId() {
        return id;
    }

    public void addParticipant(Participant participant) {
        this.participants.add(participant);
    }

    public void removeParticipant(Participant participant) {
        this.participants.remove(participant);
    }
}
