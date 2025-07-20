import {createContext, useContext, useEffect, useState} from "react";
import {
    addNewMeetingRequest,
    deleteMeetingRequest,
    fetchMeetingsRequest,
    updateMeetingRequest,
} from "../api/meetingsApi";

const MeetingsContext = createContext();

export const MeetingsProvider = ({children}) => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        reloadMeetings();
    }, []);

    const reloadMeetings = async () => {
        const fetchedMeetings = await fetchMeetingsRequest();
        setMeetings(fetchedMeetings)
    }

    const addNewMeeting = async (meeting) => {
        const newMeeting = await addNewMeetingRequest(meeting)
        if (newMeeting === undefined) {
            return
        }
        const nextMeetings = [...meetings, newMeeting];
        setMeetings(nextMeetings);
    }

    // TODO: updateMeeting
    const onUpdate = async (meeting) => {
        await updateMeetingRequest(meeting);
        await reloadMeetings();
    }

    const deleteMeeting = async (meeting) => {
        // const fetchedMeetings =
        await deleteMeetingRequest(meeting, meetings, setMeetings);
        // setMeetings(fetchedMeetings)
        // TODO: in catch notify with toast
    }

    // TODO: remove setMeetings from Provider
    return (
        <MeetingsContext.Provider
            value={{meetings, setMeetings, reloadMeetings, addNewMeeting, onUpdate, deleteMeeting}}>
            {children}
        </MeetingsContext.Provider>
    );
}

export const useMeetings = () => useContext(MeetingsContext);
