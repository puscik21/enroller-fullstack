import MeetingsPage from "../meeting/MeetingsPage";
import styled from "styled-components";
import {useAuth} from "../auth/AuthContext";
import {MeetingsProvider} from "../meeting/MeetingsContext";
import {useNavigate} from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

const UserPanel = () => {
    const {loggedInUser, logoutUser} = useAuth()
    const navigate = useNavigate();

    const onLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <ProtectedRoute>
            <Container>
                <HeaderRow>
                    <h2>Welcome {loggedInUser}!</h2>
                    <button onClick={() => onLogout()}>Log out</button>
                </HeaderRow>
                <MeetingsProvider>
                    <MeetingsPage/>
                </MeetingsProvider>
            </Container>
        </ProtectedRoute>
    )
}

export default UserPanel;

const Container = styled.div`
    margin: 1rem;
`

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;
