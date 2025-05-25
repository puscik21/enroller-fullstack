export default function MeetingsList({ meetings, onDelete, username, reloadMeetings }) {

    async function subscribe(meetingId) {
        console.log("Zapisuję się na spotkanie o ID:", meetingId);
        const response = await fetch(`/api/meetings/${meetingId}/participants/${username}`, {
            method: 'POST'
        });
        if (response.ok) {
            reloadMeetings();
        }
    }

    async function unsubscribe(meetingId) {
        const response = await fetch(`/api/meetings/${meetingId}/participants/${username}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            reloadMeetings();
        }
    }

    function isUserParticipant(meeting) {
        return meeting.participants && meeting.participants.some(p => p.login === username);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Nazwa spotkania</th>
                    <th>Opis</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {meetings.map((meeting) => (
                    <tr key={meeting.id}>
                        <td>{meeting.title}</td>
                        <td>{meeting.description}</td>
                        <td>
                            {isUserParticipant(meeting) ? (
                                <button onClick={() => unsubscribe(meeting.id)}>Wypisz się</button>
                            ) : (
                                <button onClick={() => subscribe(meeting.id)}>Zapisz się</button>
                            )}
                            {" "}
                            {meeting.participants.length === 0 && (
                                <button onClick={() => onDelete(meeting)}>Usuń</button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
