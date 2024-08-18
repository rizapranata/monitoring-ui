import axios from "axios";
import React from "react";
import { number, oneOfType, string, func, shape } from "prop-types";
import { config } from "../../config";
import { Select } from "upkit";

const SelectPoly = ({ value, onChange }) => {
  let [polyclinics, setPolyclinics] = React.useState([]);
  let [isFetching, setIsFetching] = React.useState(false);

  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  React.useEffect(() => {
    setIsFetching(true);

    axios
      .get(`${config.api_host}/api/polyclinics`, {
        headers: {
          authorization: `${token}`,
        },
      })
      .then(({ data }) => {
        if (!data.error) {
          setPolyclinics(data.data);
        }
      })
      .finally((_) => setIsFetching(false));
  }, []);

  return (
    <Select
      options={polyclinics.map((poly) => ({
        label: poly.name,
        value: poly.name,
      }))}
      value={value}
      onChange={onChange}
      isLoading={isFetching}
    />
  );
};

SelectPoly.propTypes = {
  onChange: func,
  value: shape({ label: string, value: oneOfType([string, number]) }),
};

export default SelectPoly;
