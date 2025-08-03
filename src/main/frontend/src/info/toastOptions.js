import {Bounce} from "react-toastify";

export const defaultToastOptions = (position = "top-right") => {
    return ({
            position: position,
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: false,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        }
    )
}
