import * as React from "react";
import { Link } from "react-router-dom";
import { config } from "../../config";
import ZoStethoscope from "@meronex/icons/fa/FaTools";

export default function StoreLogo() {
  return (
    <Link to="/">
      <div className="text-red-600 font-bold text-4x1 flex justify-start">
        <div className="pt-1 pr-1"><ZoStethoscope/></div>
        <div>{config.site_title}</div>
      </div>
    </Link>
  );
}
