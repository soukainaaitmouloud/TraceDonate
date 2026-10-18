import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem("token");

        if (!token) {
          return <Redirect to="/auth" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default ProtectedRoute;