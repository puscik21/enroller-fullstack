import {createContext, useContext, useEffect, useState} from "react";
import {deleteMeetingRequest, fetchMeetingsRequest, updateMeetingRequest} from "../api/meetingsApi";

const MeetingsContext = createContext();

export const MeetingsProvider = ({children}) => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        reloadMeetings();
    }, []);

    // TODO: fix bug of querying meetigns 2 times
    const reloadMeetings = async () => {
        const fetchedMeetings = await fetchMeetingsRequest();
        setMeetings(fetchedMeetings)
        // TODO: in catch notify with toast
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
        <MeetingsContext.Provider value={{meetings, setMeetings, reloadMeetings, onUpdate, deleteMeeting}}>
            {children}
        </MeetingsContext.Provider>
    );
}

export const useMeetings = () => useContext(MeetingsContext);
