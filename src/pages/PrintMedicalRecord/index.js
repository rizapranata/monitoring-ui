import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, Text, Table, InputText, ButtonCircle, CardAlert } from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import AiFillPrinter from "@meronex/icons/ai/AiFillPrinter";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import FaTrash from "@meronex/icons/fa/FaTrash";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch } from "react-redux";
import { setKeyword } from "../../features/Products/actions";
import { convertIsoToIndonesianFormat } from "../../utils/convertDateTime";
import { deletePrintMedicalRec } from "../../api/printMedicalRecord";
import { usePrintMedicalRecordData } from "../../hooks/printMedicalRecord";

const PrintMedicalRecord = () => {
  let dispatch = useDispatch();
  let { data, limit, page, status, count, setSearch, setPage, setDelstatus } =
    usePrintMedicalRecordData();

  console.log("data:", data);

  React.useEffect(() => {
    setDelstatus(0);
  }, [data]);

  const notifDelete = () =>
    toast.success("Delete Success !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  if (status === "error") {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
      </LayoutOne>
    );
  }

  const columns = [
    { Header: "No. Rekam Medis", accessor: "noRm" },
    {
      Header: "Nama Pasien",
      accessor: (data) => {
        return <Text>{data.patient.name}</Text>;
      },
    },
    {
      Header: "Tanggal Pembuatan",
      accessor: (data) => {
        return <Text>{convertIsoToIndonesianFormat(data.createdAt)}</Text>;
      },
    },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            <Link to={`/preview-convert-pdf/${items.id}`}>
              <ButtonCircle icon={<BiCommentDetail />} />
            </Link>

            <ButtonCircle
              onClick={() => {
                if (window.confirm(`Ingin menghapus rekam medis no ${items.noRm} ini?`)) {
                  deletePrintMedicalRec(items.id);
                  notifDelete();
                  setDelstatus(1);
                }
              }}
              icon={<FaTrash />}
            />
          </div>
        );
      },
    },
  ];

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
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text as="h3">Cetak Rekam Medis ke PDF </Text>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <br />
        <br />
        {/* <div className="w-full text-center mb-10 mt-5">
          <InputText
            fullRound
            // value={data}
            placeholder="cari pasien"
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log("search:", e.target.value);
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div> */}
        {data.length ? (
          <Table
            items={data}
            columns={columns}
            totalItems={data.length}
            page={data.currentPage}
            isLoading={status === "process"}
            perPage={data.perpage}
            onPageChange={(page) => dispatch(setPage(page))}
            primaryKey={"_id"}
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title="Data tidak tersedia!"
              message="Belum ada data rekam medis."
            />
          </LayoutOne>
        )}
      </div>
    </LayoutOne>
  );
};

export default PrintMedicalRecord;
