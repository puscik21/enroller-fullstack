import {createContext, useContext, useEffect, useState} from "react";
import {loginRequest} from "../api/authApi";
import {notifyError} from "../info/notifier";
import {setupInterceptors} from "../api/interceptor";
import api from "../api/apiInstance";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // TODO: use token for login and roles someday
    const [token, setToken] = useState(() => localStorage.getItem("bearerToken"));
    const [loggedInUser, setLoggedInUser] = useState(() => localStorage.getItem("loggedInUser"));

    const loginUser = async (login, password) => {
        try {
            const returnedToken = await loginRequest({login, password}) || "";
            setToken(returnedToken);
            setLoggedInUser(login);
            localStorage.setItem("bearerToken", returnedToken);
            localStorage.setItem("loggedInUser", login);
        } catch (err) {
            notifyError("Could not log in");
        }
    }

    const logoutUser = () => {
        setToken(null);
        setLoggedInUser(null);
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("loggedInUser");
    }

    useEffect(() => {
        return () => {
            setupInterceptors(api, logoutUser)
        };
    }, [logoutUser]);

    return (
        <AuthContext.Provider value={{loggedInUser, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
