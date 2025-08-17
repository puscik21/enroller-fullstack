import "milligram"
import styled from "styled-components";
import UserPanel from "./user/UserPanel";
import LoginForm from "./user/LoginForm";
import {registerRequest} from "./api/authApi";
import {ToastContainer} from "react-toastify";
import {notifyError, notifySuccess} from "./info/notifier";
import {useAuth} from "./auth/AuthContext";
import {Route, Routes, useNavigate} from "react-router-dom";
import RegisterForm from "./user/RegisterForm";

const App = () => {
    const {loginUser} = useAuth();
    const navigate = useNavigate();

    // TODO: what will happen when JWT is expired
    // TODO: Move to LoginForm
    const onLogin = async (login, password) => {
        try {
            await loginUser(login, password)
            navigate("/")
        } catch (error) {
            notifyError("Login failed");
        }
    }

    // TODO: Move to RegisterForm
    const onRegister = async (login, password) => {
        if (await registerRequest({login, password})) {
            notifySuccess(`User '${login}' registered successfully!`)
            navigate("/login");
        } else {
            notifyError(`Error while registering user '${login}'`)
        }
    }

    return (
        <Container>
            <h1>Meetings enroller system</h1>
            <Routes>
                <Route path="/" element={<UserPanel/>}/>
                <Route path="/login" element={<LoginForm onLogin={onLogin}/>}/>
                <Route path="/register" element={<RegisterForm onRegister={onRegister}/>}/>
            </Routes>
            <ToastContainer/>
        </Container>
    );
}

export default App;

const Container = styled.div`
    margin: 2rem;
`
