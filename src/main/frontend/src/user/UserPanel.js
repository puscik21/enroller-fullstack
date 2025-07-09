import MeetingsPage from "../meetings/MeetingsPage";
import styled from "styled-components";

const UserPanel = ({login, onLogout}) => {
    return (
        <Container>
            <HeaderRow>
                <h2>Welcome {login}!</h2>
                <button onClick={() => onLogout()}>Log out</button>
            </HeaderRow>
            <MeetingsPage login={login} />
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
