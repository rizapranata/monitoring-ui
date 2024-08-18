import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import {
  LayoutOne,
  Text,
  Button,
  Table,
  InputText,
  ButtonCircle,
  CardAlert,
} from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setKeyword } from "../../features/MedicalRecord/actions";

import { fetchPasiens } from "../../features/Pasien/actions";
import { fetchMedicalRec } from "../../features/MedicalRecord/actions";
import { deleteMedicalRec } from "../../api/medicalRecord";

const MedicalRecord = () => {
  let dispatch = useDispatch();
  let [delstatus, setDelstatus] = React.useState(0);
  let [status, setStatus] = React.useState("process");
  let medicalRecords = useSelector((store) => store.medicalRecords);

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchMedicalRec());
    dispatch(fetchPasiens());
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, medicalRecords.keyword]);

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

  const columns = [
    { Header: "No. Rekam Medis", accessor: "noRm" },
    { Header: "Diagnosis", accessor: "diagnosis" },
    {
      Header: "Poli Klinik",
      accessor: (data) => {
        return <Text>{data.patient.poly}</Text>;
      },
    },
    {
      Header: "Nama Pasien",
      accessor: (data) => {
        return <Text>{data.patient.name}</Text>;
      },
    },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            <Link to={`/detail-rekam-medis/${items.id}`}>
              <ButtonCircle icon={<BiCommentDetail />} />
            </Link>

            <Link to={`/rekam-mediss/${items.id}`}>
              <ButtonCircle icon={<FaEdit />} />
            </Link>

            <ButtonCircle
              onClick={() => {
                if (
                  window.confirm(
                    `Ingin menghapus rekam medis no ${items.noRm} ini?`
                  )
                ) {
                  deleteMedicalRec(items.id);
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
        <Text as="h3">Rekam Medis </Text>
        <br />
        <Link to="/rekam-mediss/tambah">
          <Button>Tambah baru</Button>
        </Link>
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
        <div className="w-full text-center mb-10 mt-5">
          <InputText
            fullRound
            value={medicalRecords.keyword}
            placeholder="cari no rekam medis.."
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        {medicalRecords.data.length ? (
          <Table
            items={medicalRecords.data}
            columns={columns}
            totalItems={medicalRecords.data.length}
            page={medicalRecords.data.currentPage}
            isLoading={medicalRecords.status === "process"}
            perPage={medicalRecords.data.perpage}
            onPageChange={(page) => dispatch(setPage(page))}
            showPagination={false}
            primaryKey={"_id"}
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title={`Data rekam medis kosong`}
              message="Tidak ada data rekam medis."
            />
          </LayoutOne>
        )}
      </div>
    </LayoutOne>
  );
};

export default MedicalRecord;
