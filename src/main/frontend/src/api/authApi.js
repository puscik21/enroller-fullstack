import api from "./apiInstance";
import {notifyError} from "../info/notifier";

export const loginRequest = async (credentials) => {
    try {
        const response = await api.post("/login", credentials);
        if (response.status === 200) {
            return response.data.token;
        } else {
            notifyError(response.data.message || `Login failed with status code: ${response.status}`);
        }
    } catch (error) {
        notifyError(`Error occurred while trying to login: ${error}`)
    }
}

export const registerRequest = async (credentials) => {
    try {
        const response = await api.post("/participants", credentials);
        return response.status === 201;
    } catch (error) {
        return false;
    }
}
