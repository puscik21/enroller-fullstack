export const registerRequest = async (login, password) => {
    const response = await fetch(`/api/participants`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login, password}),
    });

    if (response.ok) {
        return true;
    } else {
        // const error = await response.json().message; // TODO: Backend need to extend AuthenticationEntryPoint and AccessDeniedHandler
        console.error(`Register failed with status code: ${response.status}`);
        return false;
    }
}
