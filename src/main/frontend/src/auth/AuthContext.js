import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // TODO: use token for login and roles someday
    const [token, setToken] = useState(() => localStorage.getItem("bearerToken"));
    const [loggedInUser, setLoggedInUser] = useState(() => localStorage.getItem("loggedInUser"));

    const loginUser = async (login, password) => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({login, password}),
        });

        const data = await response.json();
        if (response.ok) {
            setToken(data.token);
            setLoggedInUser(login)
            localStorage.setItem("bearerToken", data.token);
            localStorage.setItem("loggedInUser", login);
        } else {
            // TODO: Backend need to extend AuthenticationEntryPoint and AccessDeniedHandler to make 'data.message work'
            throw new Error(data.message || `Login failed with status code: ${response.status}`);
        }
    }

    const logoutUser = () => {
        setToken(null);
        setLoggedInUser(null);
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("loggedInUser");
    }

    return (
        <AuthContext.Provider value={{loggedInUser, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
