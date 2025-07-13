export const loginRequest = async (credentials) => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (response.ok) {
        return data.token
    } else {
        // TODO: Backend need to extend AuthenticationEntryPoint and AccessDeniedHandler to make 'data.message work'
        throw new Error(data.message || `Login failed with status code: ${response.status}`);
    }
}

export const registerRequest = async (credentials) => {
    const response = await fetch(`/api/participants`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
    });

    if (response.ok) {
        return true;
    } else {
        // const error = await response.json().message; // TODO: Backend need to extend AuthenticationEntryPoint and AccessDeniedHandler
        console.error(`Register failed with status code: ${response.status}`);
        return false;
    }
}
