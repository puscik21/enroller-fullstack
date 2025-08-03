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
        await reloadMeetings();
    }

    const updateMeeting = async (meeting) => {
        const newMeeting = await updateMeetingRequest(meeting);
        if (newMeeting === undefined) {
            return
        }
        await reloadMeetings();
    }

    const deleteMeeting = async (meeting) => {
        await deleteMeetingRequest(meeting);
        await reloadMeetings();
    }

    return (
        <MeetingsContext.Provider
            value={{meetings, reloadMeetings, addNewMeeting, updateMeeting, deleteMeeting}}>
            {children}
        </MeetingsContext.Provider>
    );
}

export const useMeetings = () => useContext(MeetingsContext);
