import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const GuardClientRoute = ({ children, ...rest }) => {
  let { user } = useSelector((state) => state.auth);

  return (
    <Route {...rest}>
      {user.role === "client" ? children : <Redirect to="/" />}
    </Route>
  );
};

export default GuardClientRoute;
