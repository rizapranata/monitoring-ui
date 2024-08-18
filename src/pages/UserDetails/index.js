import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { LayoutOne, Text, Table, Badge } from "upkit";
import BounceLoader from "react-spinners/BounceLoader";
import TopBar from "../../components/TopBar";
import { getDetailUser } from "../../api/user";

export default function UserDetails() {
  const [usernameData, setUsernameData] = React.useState(null);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");
  let { params } = useRouteMatch();

  React.useEffect(() => {
    getDetailUser(params.username)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }

        setUsernameData(data);
      })
      .finally(() => setStatus("idle"));
  }, [params]);

  if (error.length) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
        {error}
      </LayoutOne>
    );
  }

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Detail {usernameData?.data?.role === "admin" ? "Admin" : "Client" } </Text>
      <br />

      <Table
        showPagination={false}
        isLoading={usernameData?.data?.status === "process"}
        items={[
          { label: "Username", value: usernameData?.data?.username },
          { label: "Nama Lengkap", value: usernameData?.data?.name },
          {
            label: "Status",
            value: usernameData?.data?.status ? (
              <Badge color="green">Aktif</Badge>
            ) : (
              <Badge color="red">Tidak aktif</Badge>
            ),
          },
          {
            label: "Email",
            value: usernameData?.data?.email,
          },
          {
            label: "No. Telp",
            value: usernameData?.data?.phone,
          },
        ]}
        columns={[
          { Header: "", accessor: "label" },
          { Header: "", accessor: "value" },
        ]}
      />
    </LayoutOne>
  );
}
