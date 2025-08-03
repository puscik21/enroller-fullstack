import {useEffect, useState} from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";
import {addNewMeetingRequest, deleteMeetingRequest, fetchMeetingsRequest} from "../api/meetingsApi";

const MeetingsPage = () => {
    const [meetings, setMeetings] = useState([]);
    const [isNewMeetingFormOpened, setNewMeetingFormOpened] = useState(false);

    useEffect(() => {
        fetchMeetingsRequest(setMeetings);
    }, []);

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
                    reloadMeetings={() => fetchMeetingsRequest(setMeetings)}
                />}
        </div>
    );
}

export default MeetingsPage;
