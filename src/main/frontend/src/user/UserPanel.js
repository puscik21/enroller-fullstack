import MeetingsPage from "../meeting/MeetingsPage";
import styled from "styled-components";
import {useAuth} from "../auth/AuthContext";
import {MeetingsProvider} from "../meeting/MeetingsContext";

const UserPanel = ({onLogout}) => {
    const {loggedInUser} = useAuth()

    return (
        <Container>
            <HeaderRow>
                <h2>Welcome {loggedInUser}!</h2>
                <button onClick={() => onLogout()}>Log out</button>
            </HeaderRow>
            <MeetingsProvider>
                <MeetingsPage/>
            </MeetingsProvider>
        </Container>
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
