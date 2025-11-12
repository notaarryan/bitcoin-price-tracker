import { useRouteError, isRouteErrorResponse } from "react-router";

const ErrorElement = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <h1>
        Error {error.status}: {error.statusText}
      </h1>
    );
  } else if (error instanceof Error) {
    return <h1>{error.message}</h1>;
  } else {
    return <h1>Something went wrong</h1>;
  }
};

export default ErrorElement;
