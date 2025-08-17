import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {notifyError} from "../info/notifier";
import {useAuth} from "../auth/AuthContext";
import AuthForm from "./AuthForm";

const LoginForm = () => {
    const {loginUser} = useAuth();
    const navigate = useNavigate();

    // TODO: what will happen when JWT is expired?
    const onLogin = async (login, password) => {
        try {
            await loginUser(login, password)
            navigate("/")
        } catch (error) {
            notifyError("Login failed");
        }
    }

    return (
        <AuthForm title="Login" onSubmit={onLogin}>
            <RegisterLink>
                Don't have an account? <Link to="/register">Register here</Link>
            </RegisterLink>
        </AuthForm>
    );
}

export default LoginForm;

const RegisterLink = styled.p`
    text-align: center;
    margin-top: 1rem;
`;
