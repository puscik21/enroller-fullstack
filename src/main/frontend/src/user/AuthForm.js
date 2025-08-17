import {useState} from "react";
import styled from "styled-components";
import {ClipLoader} from "react-spinners";

const AuthForm = ({title, onSubmit, children}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (areCredentialsFilled()) {
            setIsLoading(true);
            try {
                await onSubmit(login, password);
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
            <h2>{title}</h2>
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
            <button type="button" onClick={handleSubmit}>
                {isLoading ? <ClipLoader size={16} color="#fff"/> : title}
            </button>
            {children}
        </Container>
    );
};

export default AuthForm;

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
