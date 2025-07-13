import MeetingActions from "./MeetingActions";
import {updateMeetingRequest} from "../api/meetingsApi";
import styled from "styled-components";
import {useMeetings} from "./MeetingsContext";

const MeetingsList = ({meetings, onDelete}) => {
    const {reloadMeetings} = useMeetings();

    const onUpdate = async (meeting) => {
        await updateMeetingRequest(meeting);
        await reloadMeetings();
    }

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
                    <td><Title>{meeting.title}</Title></td>
                    <td>{meeting.description}</td>
                    <td>{Array.isArray(meeting.participants) ? meeting.participants.map(participant =>
                        <p key={participant.login}>{participant.login}</p>) : null}
                    </td>
                    <td>
                        <MeetingActions
                            meeting={meeting}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            reloadMeetings={reloadMeetings}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MeetingsList;

const Title = styled.div`
    font-weight: bold;
`
