import {useState} from "react";

const LoginForm = ({onLogin}) => {
    const [login, setLogin] = useState("");

    return (
        <div>
            <label>Login by e-mail:</label>
            <input type="text" value={login} onChange={e => setLogin(e.target.value)}/>
            <button onClick={() => onLogin(login)}>Login</button>
        </div>
    )
}

export default LoginForm;
