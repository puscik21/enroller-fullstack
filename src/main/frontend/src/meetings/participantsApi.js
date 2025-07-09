export const signUpForMeeting = async (meetingId, login, reloadMeetings) => {
    const response = await fetch(`/api/meetings/${meetingId}/participants/${login}`, {
        method: 'POST',
    });
    if (response.ok) {
        reloadMeetings();
    }
}

export const signOutFromMeeting = async (meetingId, login, reloadMeetings) => {
    const response = await fetch(`/api/meetings/${meetingId}/participants/${login}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        reloadMeetings();
    }
}
