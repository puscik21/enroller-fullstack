import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <ErrorContainer>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </ErrorContainer>
    );
}

export default ErrorPage;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    text-align: center;
`;
