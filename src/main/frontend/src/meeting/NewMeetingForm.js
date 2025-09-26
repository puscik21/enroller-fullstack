import {useState} from "react";

const NewMeetingForm = ({onSubmit}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const submit = (event) => {
        event.preventDefault();
        if (title !== "") {
            const todayFormatted = new Date().toISOString().split('T')[0]
            onSubmit({title, description, date: todayFormatted})
        }
    }

    return (
        <form onSubmit={submit}>
            <h3>Add new meeting</h3>
            <label>Title</label>
            <input type="text" value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <label>Description</label>
            <textarea value={description}
                      onChange={(e) => setDescription(e.target.value)}></textarea>
            <button>Add</button>
        </form>
    );
}

export default NewMeetingForm
