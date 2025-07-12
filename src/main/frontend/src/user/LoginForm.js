import {useState} from "react";
import styled from "styled-components";

const LoginForm = ({onLogin, onRegister}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (areCredentialsFilled()) onLogin(login, password);
    };

    const handleRegister = () => {
        if (areCredentialsFilled()) onRegister(login, password);
    };

    const areCredentialsFilled = () => {
        if (!login || !password) {
            setError("Fill credentials");
            return false;
        }
        setError("");
        return true;
    }

    return (
        <Container>
            {error && <ErrorLabel aria-live={"polite"}>{error}</ErrorLabel>}
            <label>Login</label>
            <input
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>Login</button>
            <button type="button" className="button button-outline" onClick={handleRegister}>Register</button>
        </Container>
    )
}

const ErrorLabel = styled.span`
    color: #af1313;
    font-size: 2rem;
`

export default LoginForm;

const Container = styled.div`
    width: 50%;
    margin: 50px auto;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 320px;
    max-width: 500px;
`;
