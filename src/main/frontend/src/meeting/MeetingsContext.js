import {createContext, useContext, useEffect, useState} from "react";
import {fetchMeetingsRequest} from "../api/meetingsApi";


const MeetingsContext = createContext();

export const MeetingsProvider = ({children}) => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        reloadMeetings()
    }, []);

    // TODO: fix bug of querying meetigns 2 times
    const reloadMeetings = async () => {
        const fetchedMeetings = await fetchMeetingsRequest();
        setMeetings(fetchedMeetings)
        // TODO: in catch notify with toast
    }

    // TODO: updatedMeeting, onDelete

    return (
        <MeetingsContext.Provider value={{meetings, setMeetings, reloadMeetings}}>
            {children}
        </MeetingsContext.Provider>
    );
}

export const useMeetings = () => useContext(MeetingsContext);
