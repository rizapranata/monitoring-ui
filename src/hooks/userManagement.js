/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { getAllUser } from "../api/user";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export function userManagementData() {
  let [data, setData] = React.useState([]);
  let [count, setCount] = React.useState(0);
  let [search, setSearch] = React.useState("");
  let [status, setStatus] = React.useState(statuslist.idle);
  let [page, setPage] = React.useState(1);
  let [limit, setLimit] = React.useState(10);
  let [delstatus, setDelstatus] = React.useState(0);

  let fetchUsers = React.useCallback(
    async function () {
      setStatus(statuslist.process);
      let {
        data: { data, count, error },
      } = await getAllUser(search);

      if (error) {
        setStatus(statuslist.error);
        return;
      }

      setStatus(statuslist.success);
      setData(data);
      setCount(count);
      setDelstatus(0);
    },
    [page, limit, delstatus]
  );

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    data,
    count,
    status,
    page,
    limit,
    setPage,
    setLimit,
    setSearch,
    setDelstatus
  };
}
