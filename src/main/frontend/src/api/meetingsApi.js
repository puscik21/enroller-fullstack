// TODO: more generic API

import {notifyError} from "../info/notifier";
import api from "./apiInstance";

export const fetchMeetingsRequest = async () => {
    try {
        const response = await api.get("/meetings");
        return response.data;
    } catch (error) {
        notifyError("Meetings not found");
        throw error;
    }
}

export const addNewMeetingRequest = async (meeting) => {
    try {
        // TODO: use axios
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            // TODO: Possibly add some pop-up in such case
            console.error("Could not add a meeting");
        }
    } catch (err) {
        console.error("Adding meeting error:", err);
    }
}

// TODO: get rid of setMeetings and meetings here
export const deleteMeetingRequest = async (meeting, meetings, setMeetings) => {
    // TODO: use axios
    const response = await fetch(`/api/meetings/${meeting.id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
        },
    });

    if (response.ok) {
        // TODO: probably fetch meetings again after deletion
        const nextMeetings = meetings.filter(m => m.id !== meeting.id);
        setMeetings(nextMeetings);
    } else {
        const text = await response.text();
        // TODO: use toast
        console.error('Błąd przy usuwaniu:', response.status, text);
        alert(`Nie udało się usunąć spotkania (${response.status}): ${text}`);
    }
}

export const updateMeetingRequest = async (meeting) => {
    // TODO: use axios
    const response = await fetch(`/api/meetings/${meeting.id}`, {
        method: 'PUT',
        body: JSON.stringify(meeting),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
        },
    });

    if (response.ok) {
        // TODO: probably some improvement
        // const nextMeetings = meetings.filter(m => m.id !== meeting.id);
        // setMeetings(nextMeetings);
    } else {
        const text = await response.text();
        console.error('Błąd przy usuwaniu:', response.status, text);
        alert(`Nie udało się usunąć spotkania (${response.status}): ${text}`);
        throw new Error(response.text || `Failed to update meeting: ${meeting.id}`);
    }
}
