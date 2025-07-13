// TODO: more generic API

export const fetchMeetingsRequest = async (setMeetings) => {
    const response = await fetch(`/api/meetings`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
        },
    });
    if (response.ok) {
        const meetings = await response.json();
        setMeetings(meetings);
    }
}

export const addNewMeetingRequest = async (meeting) => {
    try {
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

export const deleteMeetingRequest = async (meeting, meetings, setMeetings) => {
    console.log("Usuwam spotkanie o id:", meeting.id);
    const response = await fetch(`/api/meetings/${meeting.id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
        },
    });

    if (response.ok) {
        const nextMeetings = meetings.filter(m => m.id !== meeting.id);
        setMeetings(nextMeetings);
    } else {
        const text = await response.text();
        console.error('Błąd przy usuwaniu:', response.status, text);
        alert(`Nie udało się usunąć spotkania (${response.status}): ${text}`);
    }
}

export const updateMeetingRequest = async (meeting) => {
    console.log("Edytuje spotkanie o id:", meeting.id); // TODO: remove any console logs
    const response = await fetch(`/api/meetings/${meeting.id}`, {
        method: 'PUT',
        body: JSON.stringify(meeting),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
        },
    });

    if (response.ok) {
        // const nextMeetings = meetings.filter(m => m.id !== meeting.id);
        // setMeetings(nextMeetings);
    } else {
        const text = await response.text();
        console.error('Błąd przy usuwaniu:', response.status, text);
        alert(`Nie udało się usunąć spotkania (${response.status}): ${text}`);
        throw new Error(response.text || `Failed to update meeting: ${meeting.id}`);
    }
}
