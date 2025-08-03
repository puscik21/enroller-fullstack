import {useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";
import {useMeetings} from "./MeetingsContext";

const MeetingsPage = () => {
    const [isNewMeetingFormOpened, setNewMeetingFormOpened] = useState(false);
    const {meetings, addNewMeeting} = useMeetings();

    const handleNewMeeting = async (meeting) => {
        await addNewMeeting(meeting);
        setNewMeetingFormOpened(false);
    }

    const AddNewMeetingButton = () => (
        <button onClick={() => setNewMeetingFormOpened(true)}>Add new meeting</button>
    )

    return (
        <div>
            <h2>Meetings ({meetings.length})</h2>
            {isNewMeetingFormOpened
                ? <NewMeetingForm onSubmit={meeting => handleNewMeeting(meeting)}/>
                : <AddNewMeetingButton/>}
            {meetings.length > 0 && <MeetingsList/>}
        </div>
    );
}

export default MeetingsPage;
