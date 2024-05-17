import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const RootError = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <section id="error-page">
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.statusText}</i>
                    </p>
                </section>
            );
        }
    } else if (error instanceof Error) {
        return (
            <section id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.message}</i>
                </p>
            </section>
        );
    } else {
        return <></>;
    }
};
