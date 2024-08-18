import React from "react";
import { number, oneOfType, string, func, shape } from "prop-types";
import { Select } from "upkit";
import axios from "axios";
import { config } from "../../config";

const SelectCategory = ({ value, onChange }) => {
  let [categories, setCategories] = React.useState([]);
  let [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    setIsFetching(true);

    axios
      .get(`${config.api_host}/api/categories`)
      .then(({ data }) => {
        if (!data.error) {
          setCategories(data.data);
        }
      })
      .finally((_) => setIsFetching(false));
  }, []);

  return (
    <Select
      options={categories.map((category) => ({
        label: category.name,
        value: category._id,
      }))}
      value={value}
      onChange={onChange}
      isLoading={isFetching}
      sDisabled={isFetching || !categories.length}
    />
  );
};

SelectCategory.propTypes = {
  onChange: func,
  value: shape({ label: string, value: oneOfType([string, number]) }),
};

export default SelectCategory;
