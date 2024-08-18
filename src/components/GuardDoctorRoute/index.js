import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const GuardDoctorRoute = ({ children, ...rest }) => {
  let { user } = useSelector((state) => state.auth);

  return (
    <Route {...rest}>
      {user.role === "doctor" ? children : <Redirect to="/" />}
    </Route>
  );
};

export default GuardDoctorRoute;
