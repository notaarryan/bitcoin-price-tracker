import { useRouteError } from "react-router";

const ErrorElement = () => {
  const error = useRouteError();
  return <h1>{error}</h1>;
};

export default ErrorElement;
