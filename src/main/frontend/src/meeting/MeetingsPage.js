import {useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";
import {addNewMeetingRequest, deleteMeetingRequest} from "../api/meetingsApi";
import {useMeetings} from "./MeetingsContext";

const MeetingsPage = () => {
    const {meetings, setMeetings} = useMeetings();
    const [isNewMeetingFormOpened, setNewMeetingFormOpened] = useState(false);

    const handleNewMeeting = async (meeting) => {
        const addedMeeting = await addNewMeetingRequest(meeting)
        if (addedMeeting === undefined) {
            return
        }
        const nextMeetings = [...meetings, addedMeeting];
        setMeetings(nextMeetings);
        setNewMeetingFormOpened(false);
    }

    const AddNewMeetingButton = () => (
        <button onClick={() => setNewMeetingFormOpened(true)}>Add new meeting</button>
    )

    return (
        <div>
            <h2>Meetings ({meetings.length})</h2>
            {isNewMeetingFormOpened ?
                <NewMeetingForm onSubmit={meeting => handleNewMeeting(meeting)}/>
                : <AddNewMeetingButton/>}
            {meetings.length > 0 &&
                <MeetingsList
                    meetings={meetings}
                    onDelete={meeting => deleteMeetingRequest(meeting, meetings, setMeetings)}
                />}
        </div>
    );
}

export default MeetingsPage;
