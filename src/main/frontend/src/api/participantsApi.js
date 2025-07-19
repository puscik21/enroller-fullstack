export const signUpForMeetingRequest = async (meetingId, login, reloadMeetings) => {
    // TODO: use axios
    const response = await fetch(`/api/meetings/${meetingId}/participants/${login}`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
        },
    });
    if (response.ok) {
        reloadMeetings();
    }
}

export const signOutFromMeetingRequest = async (meetingId, login, reloadMeetings) => {
    // TODO: use axios
    const response = await fetch(`/api/meetings/${meetingId}/participants/${login}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("bearerToken")}`,
        },
    });
    if (response.ok) {
        reloadMeetings();
    }
}
