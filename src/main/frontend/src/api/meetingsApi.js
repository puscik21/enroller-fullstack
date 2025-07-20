// TODO: more generic API

import {notifyError} from "../info/notifier";
import api from "./apiInstance";

export const fetchMeetingsRequest = async () => {
    try {
        const response = await api.get("/meetings");
        return response.data;
    } catch (error) {
        notifyError("Meetings not found");
    }
}

export const addNewMeetingRequest = async (meeting) => {
    try {
        const response = await api.post(`/meetings`, JSON.stringify(meeting));
        return response.data;
    } catch (error) {
        notifyError("Could not add the meeting");
    }
}

export const deleteMeetingRequest = async (meeting) => {
    try {
        const response = await api.delete(`/meetings/${meeting.id}`);
        return response.data;
    } catch (error) {
        notifyError("Error while deleting the meeting");
    }
}

export const updateMeetingRequest = async (meeting) => {
    try {
        const response = await api.put(`/meetings/${meeting.id}`, JSON.stringify(meeting));
        return response.data;
    } catch (error) {
        notifyError("Error while updating the meeting");
    }
}
