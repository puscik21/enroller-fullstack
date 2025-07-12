import MeetingActions from "./MeetingActions";

const MeetingsList = ({meetings, login, onDelete, reloadMeetings}) => {
    if (meetings.length === 0) return null;
    return (
        <table>
            <thead>
            <tr>
                <th>Meeting's title</th>
                <th>Description</th>
                <th>Participants</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {meetings.map(meeting => (
                <tr key={meeting.id}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>{Array.isArray(meeting.participants) ? meeting.participants.map(participant =>
                        <p key={participant.login}>{participant.login}</p>) : null}
                    </td>
                    <td><MeetingActions meeting={meeting} login={login} onDelete={onDelete}
                                        reloadMeetings={reloadMeetings}/>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MeetingsList;
