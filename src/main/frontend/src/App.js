import {useState} from "react";
import "milligram"
import styled from "styled-components";
import UserPanel from "./user/UserPanel";
import LoginForm from "./user/LoginForm";

function App() {
    const [loggedInLogin, setLoggedInLogin] = useState("");

    const onLogin = (login) => setLoggedInLogin(login);
    const onLogout = () => setLoggedInLogin("");
    const isLoggedIn = loggedInLogin !== ""

    return (
        <Container>
            <h1>Meetings enroller system</h1>
            {isLoggedIn ? <UserPanel login={loggedInLogin} onLogout={onLogout}/> : <LoginForm onLogin={onLogin}/>}
        </Container>
    );
}

export default App;

const Container = styled.div`
    margin: 2rem;
`
