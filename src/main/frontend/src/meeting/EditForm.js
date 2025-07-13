import styled from "styled-components";
import {useState} from "react";

const EditForm = ({meeting, onUpdate, onClose}) => {
    const [title, setTitle] = useState(meeting.title);
    const [description, setDescription] = useState(meeting.description);

    const handleSave = () => {
        const newMeeting = {...meeting, title, description};
        onUpdate(newMeeting);
        onClose();
    }

    return (
        <Container>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea value={description} onChange={e => setDescription(e.target.value)}/>
            <ButtonGroup>
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </ButtonGroup>
        </Container>
    )
}

export default EditForm;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;

    input {
        font-weight: bold;
    }
    input, textarea {
        font-size: 1.3rem;
    }
`;

const ButtonGroup = styled.div`
    justify-content: flex-end;
    display: flex;
    gap: 2rem;
`;
