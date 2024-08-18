import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { LayoutOne, Badge, Text, Table, ButtonCircle, Responsive } from "upkit";
import BounceLoader from "react-spinners/BounceLoader";
import AiFillPrinter from "@meronex/icons/ai/AiFillPrinter";
import TopBar from "../../components/TopBar";
import { useSelector } from "react-redux";
import { getDetailPrintMedicalRecord } from "../../api/printMedicalRecord";
import { convertIsoToIndonesianFormat } from "../../utils/convertDateTime";
import { jsPDF } from "jspdf";
import StoreLogo from "../../components/StoreLogo";

export default function PreviewToConvertPDF() {
  const certificateTemplateRef = React.useRef(null);
  const [printMedicalRecData, setPrintMedicalRecData] = React.useState(null);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");
  let { params } = useRouteMatch();

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "pt",
      orientation: "p",
      lineHeight: 0.6,
    });

    doc.setFont("Arial", "normal");
    doc.setFontSize(8);

    doc.html(certificateTemplateRef.current, {
      async callback(doc) {
        doc.save(`rekam-medis-${printMedicalRecData?.data?.noRm}`);
      },
    });
  };

  React.useEffect(() => {
    getDetailPrintMedicalRecord(params?.medicalRecordId)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidak diketahui");
        }

        setPrintMedicalRecData(data);
      })
      .finally(() => setStatus("idle"));
  }, [params]);

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
      <Responsive desktop={2} justify="stretch" items="center">
        <div>
          <Text as="h3"> Preview Rekam Medis </Text>
        </div>
        <div className="ml-20 pl-20">
          <ButtonCircle onClick={handleGeneratePdf} icon={<AiFillPrinter />} />
        </div>
      </Responsive>

      <br />
      <div ref={certificateTemplateRef} className="flex justify-start">
        {/* <div className=" flex justify-start" style={styles.container}>
          <table border="1">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">
                  <StoreLogo />
                </th>
                <th className="py-2 px-4 border-b text-sm">
                  No: {printMedicalRecData?.data?.noRm}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 border-b text-sm">No Rekam Medis</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.noRm}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Nama pasien</td>
                <td className="px-4 border-b text-sm">
                  <b>{printMedicalRecData?.data?.patient.name}</b>
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Jenis Kelamin</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.patient?.gender}
                </td>
              </tr>

              <tr>
                <td className="px-4 border-b text-sm">Umur</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.patient.age}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Tanggal Lahir</td>
                <td className="px-4 border-b text-sm">
                  {convertIsoToIndonesianFormat(
                    printMedicalRecData?.data?.patient.birth
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Alamat</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.patient?.address}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Keluhan</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.problem}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Diagnosis</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.diagnosis}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Poli Klinik</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.doctorPolyName}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Catatan</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.note}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Tanggal</td>
                <td className="px-4 border-b text-sm">
                  {convertIsoToIndonesianFormat(
                    printMedicalRecData?.data?.createdAt
                  )}
                </td>
              </tr>
              <tr>
                <td className="px-4 border-b text-sm">Nama Dokter</td>
                <td className="px-4 border-b text-sm">
                  {printMedicalRecData?.data?.doctorName}
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className="w-4/5">
          <Table
            showPagination={false}
            isLoading={printMedicalRecData?.data?.status === "process"}
            items={[
              {
                label: "No Rekam Medis",
                value: printMedicalRecData?.data?.noRm,
              },
              {
                label: "Nama pasien",
                value: <b>{printMedicalRecData?.data?.patient.name}</b>,
              },
              {
                label: "Jenis kelamin",
                value: printMedicalRecData?.data?.patient?.gender,
              },
              { label: "Umur", value: printMedicalRecData?.data?.patient.age },
              {
                label: "Tanggal lahir",
                value: convertIsoToIndonesianFormat(
                  printMedicalRecData?.data?.patient.birth
                ),
              },
              {
                label: "Alamat",
                value: printMedicalRecData?.data?.patient?.address,
              },
              { label: "Keluhan", value: printMedicalRecData?.data?.problem },
              {
                label: "Diagnosis",
                value: printMedicalRecData?.data?.diagnosis,
              },
              {
                label: "Poli klinik",
                value: printMedicalRecData?.data?.doctorPolyName,
              },
              { label: "Catatan", value: printMedicalRecData?.data?.note },
              {
                label: "Tanggal rekam medis",
                value: convertIsoToIndonesianFormat(
                  printMedicalRecData?.data?.createdAt
                ),
              },
              {
                label: "Nama dokter",
                value: (
                  <div>
                    {printMedicalRecData?.data?.doctorName} <br /> #
                    {printMedicalRecData?.data?.doctorSpecialist} <br />{" "}
                  </div>
                ),
              },
            ]}
            columns={[
              { Header: "", accessor: "label" },
              { Header: "", accessor: "value" },
            ]}
          />
        </div>
      </div>
    </LayoutOne>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    width: "446px",
    height: "331px",
  },
  contentContainer: {
    width: "446px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contentCard: {
    zIndex: 1,
    backgroundColor: "black",
  },
  title: {
    fontFamily: "Anton, Anton-Regular",
    fontSize: "1rem",
    color: "white",
    textAlign: "center",
  },
  imgContainer: {
    width: "300px",
  },
  img: {
    display: "block",
    width: "100%",
    height: "100%",
  },
};
