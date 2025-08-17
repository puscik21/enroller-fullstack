import { useState } from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const RegisterForm = ({ onRegister }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (areCredentialsFilled()) {
            setIsLoading(true);
            try {
                await onRegister(login, password);
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
    };

    return (
        <Container>
            <h2>Register</h2>
            {error && <ErrorLabel aria-live={"polite"}>{error}</ErrorLabel>}
            <label>Login</label>
            <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>
                {isLoading ? <ClipLoader size={16} color="#fff" /> : "Register"}
            </button>
            <LoginLink>
                Already have an account? <Link to="/login">Login here</Link>
            </LoginLink>
        </Container>
    );
};

export default RegisterForm;

const ErrorLabel = styled.span`
    color: #af1313;
    font-size: 1.6rem;
`;

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

const LoginLink = styled.p`
    text-align: center;
    margin-top: 1rem;
`;
