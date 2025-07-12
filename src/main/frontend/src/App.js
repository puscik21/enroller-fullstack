import {useState} from "react";
import "milligram"
import styled from "styled-components";
import UserPanel from "./user/UserPanel";
import LoginForm from "./user/LoginForm";
import {loginRequest, registerRequest} from "./api/authApi";

function App() {
    const [loggedInUser, setLoggedInUser] = useState("");

    // TODO: what will happen when JWT is expired
    const onLogin = async (login, password) => {
        if (await loginRequest(login, password)) {
            setLoggedInUser(localStorage.getItem("loggedInUser"));
        }
    }

    const onRegister = async (login, password) => {
        if (await registerRequest(login, password)) {
            console.log("Yupiiii !!!") // TODO: use toasts
        }
    }

    const onLogout = () => {
        localStorage.setItem("loggedInUser", "")
        setLoggedInUser("")
    }

    const isLoggedIn = loggedInUser !== ""
    return (
        <Container>
            <h1>Meetings enroller system</h1>
            {isLoggedIn ? <UserPanel login={loggedInUser} onLogout={onLogout}/> :
                <LoginForm onLogin={onLogin} onRegister={onRegister}/>}
        </Container>
    );
}

export default App;

const Container = styled.div`
    margin: 2rem;
`
