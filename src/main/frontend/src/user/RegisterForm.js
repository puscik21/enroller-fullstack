import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import AuthForm from "./AuthForm";
import {registerRequest} from "../api/authApi";
import {notifyError, notifySuccess} from "../info/notifier";


const RegisterForm = () => {
    const navigate = useNavigate();

    const onRegister = async (login, password) => {
        if (await registerRequest({login, password})) {
            notifySuccess(`User '${login}' registered successfully!`)
            navigate("/login");
        } else {
            notifyError(`Error while registering user '${login}'`)
        }
    }

    return (
        <AuthForm title="Register" onSubmit={onRegister}>
            <LoginLink>
                Already have an account? <Link to="/login">Login here</Link>
            </LoginLink>
        </AuthForm>
    );
};

export default RegisterForm;

const LoginLink = styled.p`
    text-align: center;
    margin-top: 1rem;
`;
