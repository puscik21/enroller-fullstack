import {useState} from "react";
import "milligram"
import styled from "styled-components";
import UserPanel from "./user/UserPanel";
import LoginForm from "./user/LoginForm";
import {loginRequest, registerRequest} from "./api/authApi";
import {ToastContainer} from "react-toastify";
import {notifyError, notifySuccess} from "./info/notifier";

function App() {
    const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"));

    // TODO: what will happen when JWT is expired
    const onLogin = async (login, password) => {
        if (await loginRequest(login, password)) {
            setLoggedInUser(localStorage.getItem("loggedInUser"));
        } else {
            notifyError("Login failed");
        }
    }

    const onRegister = async (login, password) => {
        if (await registerRequest(login, password)) {
            notifySuccess(`User '${login}' registered`)
        } else {
            notifyError(`Error while registering user '${login}'`)
        }
    }

    const onLogout = () => {
        localStorage.setItem("loggedInUser", "")
        setLoggedInUser("")
    }

    const isLoggedIn = !!loggedInUser && loggedInUser !== ""
    return (
        <Container>
            <h1>Meetings enroller system</h1>
            {isLoggedIn ? <UserPanel login={loggedInUser} onLogout={onLogout}/> :
                <LoginForm onLogin={onLogin} onRegister={onRegister}/>}
            <ToastContainer/>
        </Container>
    );
}

export default App;

const Container = styled.div`
    margin: 2rem;
`
