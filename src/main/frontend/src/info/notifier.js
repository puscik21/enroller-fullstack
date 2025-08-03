import {toast} from "react-toastify";
import {defaultToastOptions} from "./toastOptions";

export const notifySuccess = (message) => toast.success(message, defaultToastOptions())

export const notifyError = (message) => toast.error(message, defaultToastOptions())
