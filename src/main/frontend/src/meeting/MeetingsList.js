import MeetingActions from "./MeetingActions";
import styled from "styled-components";
import {useMeetings} from "./MeetingsContext";

const MeetingsList = () => {
    const {meetings} = useMeetings();

    if (meetings.length === 0) return null;
    return (
        <Container>
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
                            <MeetingActions meeting={meeting}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
}

export default MeetingsList;

const Container = styled.div`
    margin: 50px auto;
`

const Title = styled.div`
    font-weight: bold;
`
