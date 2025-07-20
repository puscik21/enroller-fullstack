import styled from "styled-components";
import {signOutFromMeetingRequest, signUpForMeetingRequest} from "../api/participantsApi";
import {useAuth} from "../auth/AuthContext";
import {useState} from "react";
import EditForm from "./EditForm";
import {useMeetings} from "./MeetingsContext";

const MeetingActions = ({meeting}) => {
    const [isEditing, setIsEditing] = useState(false);
    const {reloadMeetings, onUpdate} = useMeetings();

    return (
        isEditing
            ? <EditForm meeting={meeting} onUpdate={onUpdate} onClose={() => setIsEditing(false)}/>
            : <ButtonGroup>
                <SignInForMeetingButton meeting={meeting} reloadMeetings={reloadMeetings}/>
                <SignOutFromMeetingButton meeting={meeting} reloadMeetings={reloadMeetings}/>
                <button className="button button-outline" onClick={() => setIsEditing(true)}>Edit</button>
                <RemoveEmptyMeetingButton meeting={meeting}/>
            </ButtonGroup>
    )
}

const SignInForMeetingButton = ({meeting, reloadMeetings}) => {
    const {loggedInUser} = useAuth();

    if (isUserParticipant(meeting, loggedInUser)) return null;
    return (
        <button onClick={() => signUpForMeetingRequest(meeting.id, loggedInUser, reloadMeetings)}>Sign in</button>
    )
}

const SignOutFromMeetingButton = ({meeting, reloadMeetings}) => {
    const {loggedInUser} = useAuth();

    if (!isUserParticipant(meeting, loggedInUser)) return null;
    return (
        <button className="button button-outline"
                onClick={() => signOutFromMeetingRequest(meeting.id, loggedInUser, reloadMeetings)}>
            Sign out
        </button>
    )
}

const RemoveEmptyMeetingButton = ({meeting}) => {
    const {deleteMeeting} = useMeetings();

    return (!meeting.participants || meeting.participants.length === 0) &&
        <button className="button button-clear" onClick={() => deleteMeeting(meeting)}>Delete meeting</button>;
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
