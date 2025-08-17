import {useState} from "react";
import styled from "styled-components";
import {ClipLoader} from "react-spinners";
import {Link} from "react-router-dom";

const LoginForm = ({onLogin}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (areCredentialsFilled()) {
            setIsLoading(true);
            try {
                await onLogin(login, password);
            } finally {
                setIsLoading(false);
            }
        }
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
            <h2>Login</h2>
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
            <button type="button" onClick={handleLogin}>
                {isLoading ? <ClipLoader size={16} color="#fff"/> : "Login"}
            </button>
            <RegisterLink>
                Don't have an account? <Link to="/register">Register here</Link>
            </RegisterLink>
        </Container>
    );
}

export default LoginForm;

const ErrorLabel = styled.span`
    color: #af1313;
    font-size: 2rem;
`

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

const RegisterLink = styled.p`
    text-align: center;
    margin-top: 1rem;
`;
