import {useState} from "react";
import "milligram"
import styled from "styled-components";
import UserPanel from "./user/UserPanel";
import LoginForm from "./user/LoginForm";
import {loginRequest} from "./api/authApi";

function App() {
    const [loggedInUser, setLoggedInUser] = useState("");

    // TODO: what will happen when JWT is expired
    const onLogin = async (login) => {
        if (await loginRequest(login, "password")) {
            setLoggedInUser(localStorage.getItem("loggedInUser"));
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
            {isLoggedIn ? <UserPanel login={loggedInUser} onLogout={onLogout}/> : <LoginForm onLogin={onLogin}/>}
        </Container>
    );
}

export default App;

const Container = styled.div`
    margin: 2rem;
`
