import App from "../App.jsx";
import ErrorElement from "../ErrorElement.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
  },
];

export default routes;
