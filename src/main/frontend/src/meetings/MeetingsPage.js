import { useState, useEffect } from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({ username }) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    useEffect(() => {
        fetchMeetings();
    }, []);

    async function fetchMeetings() {
        const response = await fetch(`/api/meetings`);
        if (response.ok) {
            const meetings = await response.json();
            setMeetings(meetings);
        }
    }

    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const addedMeeting = await response.json();
            const nextMeetings = [...meetings, addedMeeting];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
    }

    async function handleDeleteMeeting(meeting) {
        console.log("Usuwam spotkanie o id:", meeting.id);
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
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

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={handleNewMeeting} />
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <MeetingsList
                    meetings={meetings}
                    username={username}
                    onDelete={handleDeleteMeeting}
                    reloadMeetings={fetchMeetings}
                />}
        </div>
    );
}
