import styled from "styled-components";
import {signOutFromMeeting, signUpForMeeting} from "./participantsApi";

const MeetingActions = ({meeting, login, onDelete, reloadMeetings}) => {
    return (
        <ButtonGroup>
            <SignInForMeetingButton meeting={meeting} login={login} reloadMeetings={reloadMeetings}/>
            <SignOutFromMeetingButton meeting={meeting} login={login} reloadMeetings={reloadMeetings}/>
            <RemoveEmptyMeetingButton meeting={meeting} onDelete={onDelete}/>
        </ButtonGroup>
    )
}

const SignInForMeetingButton = ({meeting, login, reloadMeetings}) => {
    if (isUserParticipant(meeting, login)) return null;
    return (
        <button onClick={() => signUpForMeeting(meeting.id, login, reloadMeetings)}>Sign in</button>
    )
}

const SignOutFromMeetingButton = ({meeting, login, reloadMeetings}) => {
    if (!isUserParticipant(meeting, login)) return null;
    return (
        <button className="button button-outline"
                onClick={() => signOutFromMeeting(meeting.id, login, reloadMeetings)}>
            Sign out
        </button>
    )
}

const RemoveEmptyMeetingButton = ({meeting, onDelete}) => {
    return (!meeting.participants || meeting.participants.length === 0) &&
        <button className="button button-clear" onClick={() => onDelete(meeting)}>Delete meeting</button>;
}

const isUserParticipant = (meeting, login) => {
    return meeting.participants && meeting.participants.some(p => p.login === login);
}


export default MeetingActions;

const ButtonGroup = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
`;
