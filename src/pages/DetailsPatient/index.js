import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { LayoutOne, Text, Table, Badge } from "upkit";
import BounceLoader from "react-spinners/BounceLoader";
import TopBar from "../../components/TopBar";
import { convertIsoToIndonesianFormat } from "../../utils/convertDateTime";
import { getPatientId } from "../../api/pasien";

export default function DetailsPatient() {
  const [dataPatient, setDataPatient] = React.useState(null);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("process");
  const { params } = useRouteMatch();

  React.useEffect(() => {
    getPatientId(params?.patientId)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }

        setDataPatient(data);
      })
      .finally(() => setStatus("idle"));
  }, [params]);

  console.log("Detail RM:", dataPatient);

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
      <Text as="h3"> Detail Data Pasien </Text>
      <br />

      <Table
        showPagination={false}
        isLoading={dataPatient?.data?.status === "process"}
        items={[
          {
            label: "No Rekam Medis",
            value: <Badge color="green">{dataPatient?.data?.noRm}</Badge>,
          },
          {
            label: "Nama pasien",
            value: <b>{dataPatient?.data?.name}</b>,
          },
          {
            label: "Jenis kelamin",
            value: dataPatient?.data?.gender,
          },
          { label: "Umur", value: dataPatient?.data?.age },
          {
            label: "Tanggal lahir",
            value: convertIsoToIndonesianFormat(
              dataPatient?.data?.birth
            ),
          },
          { label: "Alamat", value: dataPatient?.data?.address },
          { label: "No. Telp", value: dataPatient?.data?.phone },
          { label: "Email", value: dataPatient?.data?.email },
          { label: "Poli klinik", value: dataPatient?.data?.poly },
        ]}
        columns={[
          { Header: "", accessor: "label" },
          { Header: "", accessor: "value" },
        ]}
      />
    </LayoutOne>
  );
}
