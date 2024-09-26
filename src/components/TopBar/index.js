import * as React from "react";
import { useSelector } from "react-redux";
import StoreLogo from "../StoreLogo";
import { Responsive, ButtonCircle, Text } from "upkit";
import { Link } from "react-router-dom";
import FaUser from "@meronex/icons/fa/FaUser";

export default function TopBar() {
  let auth = useSelector((state) => state.auth);

  return (
    <Responsive desktop={2} justify="between" items="center">
      <div className="mt-5">
        <StoreLogo />
      </div>
      {/* <div>
        <Home/>
      </div> */}

      <div className="mr-5 text-right mt-5">
        <Link to={auth?.user ? "/account" : "/login"}>
          <div className="mr-2 inline-block text-red-600 font-bold">
            {auth?.user !== null ? auth?.user?.name : "Anonymouse"}
          </div>
          <ButtonCircle icon={<FaUser />} />
        </Link>
      </div>
    </Responsive>
  );
}
