import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { LayoutOne, Text, Table, Badge } from "upkit";
import { getInvoiceByOrderId } from "../../api/invoice";
import BounceLoader from "react-spinners/BounceLoader";
import StatusLabel from "../../components/StatusLabel";
import TopBar from "../../components/TopBar";
import { formatRupiah } from "../../utils/format-rupiah";
import { config } from "../../config";
import { getDetailMedicalRecord } from "../../api/medicalRecord";
import { convertIsoToIndonesianFormat } from "../../utils/convertDateTime";
import { useSelector } from "react-redux";

export default function MedicalRecordDetails() {
  const [medicalRecData, setMedicalRecData] = React.useState(null);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");
  let { user } = useSelector((store) => store.auth);
  let { params } = useRouteMatch();

  React.useEffect(() => {
    getDetailMedicalRecord(params?.medicalRecordId)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }

        setMedicalRecData(data);
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
      <Text as="h3"> Detail Rekam Medis </Text>
      <br />

      <Table
        showPagination={false}
        isLoading={medicalRecData?.data?.status === "process"}
        items={[
          {
            label: "No Rekam Medis",
            value: <Badge color="green">{medicalRecData?.data?.noRm}</Badge>,
          },
          {
            label: "Nama pasien",
            value: <b>{medicalRecData?.data?.patient.name}</b>,
          },
          {
            label: "Jenis Kelamin",
            value: medicalRecData?.data?.patient?.gender,
          },
          { label: "Umur", value: medicalRecData?.data?.patient.age },
          {
            label: "Tanggal lahir",
            value: convertIsoToIndonesianFormat(
              medicalRecData?.data?.patient.birth
            ),
          },
          { label: "Alamat", value: medicalRecData?.data?.patient?.address },
          { label: "Keluhan", value: medicalRecData?.data?.problem },
          {
            label: "Diagnosis",
            value: medicalRecData?.data?.diagnosis,
          },
          { label: "Poli klinik", value: user.poliName },
          { label: "Catatan", value: medicalRecData?.data?.note },
          {
            label: "Tanggal pembuatan",
            value: convertIsoToIndonesianFormat(
              medicalRecData?.data?.createdAt
            ),
          },
          {
            label: "Nama dokter",
            value: (
              <div>
                {user.name} <br /> <br /> #{user.specialist} <br />{" "}
              </div>
            ),
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
