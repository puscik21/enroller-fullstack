export const loginRequest = async (login, password) => {
    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login, password}),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("loggedInUser", login);
        localStorage.setItem("bearerToken", data.token);
        return true;
    } else {
        // const error = await response.json().message; // TODO: Backend need to extend AuthenticationEntryPoint and AccessDeniedHandler
        console.error(`Login failed with status code: ${response.status}`);
        return false;
    }
}
