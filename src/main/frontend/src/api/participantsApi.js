import api from "./apiInstance";
import {notifyError} from "../info/notifier";

export const signUpForMeetingRequest = async (meetingId, login, reloadMeetings) => {
    try {
        await api.post(`/meetings/${meetingId}/participants/${login}`);
        reloadMeetings();
    } catch (error) {
        notifyError("Could not sign up for the meeting");
    }
}

export const signOutFromMeetingRequest = async (meetingId, login, reloadMeetings) => {
    try {
        await api.delete(`/meetings/${meetingId}/participants/${login}`);
        reloadMeetings();
    } catch (error) {
        notifyError("Could not sign out from the meeting");
    }
}
