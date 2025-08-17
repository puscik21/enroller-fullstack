import "milligram"
import styled from "styled-components";
import UserPanel from "./user/UserPanel";
import LoginForm from "./user/LoginForm";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import RegisterForm from "./user/RegisterForm";
import ErrorPage from "./info/ErrorPage";

const App = () => {
    return (
        <Container>
            <h1>Meetings enroller system</h1>
            <Routes>
                {/*TODO: fix default element to navigate to "/" path */}
                <Route path="*" element={<UserPanel/>}/>
                <Route path="/" element={<UserPanel/>} errorElement={<ErrorPage/>}/>
                <Route path="/login" element={<LoginForm/>} errorElement={<ErrorPage/>}/>
                <Route path="/register" element={<RegisterForm/>} errorElement={<ErrorPage/>}/>
            </Routes>
            <ToastContainer/>
        </Container>
    );
}

export default App;

const Container = styled.div`
    margin: 2rem;
`
