import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, Text, Button, Table, InputText, ButtonCircle, CardAlert } from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setKeyword,
  setKeywordNoRm,
} from "../../features/Pasien/actions";

import { fetchPasiens } from "../../features/Pasien/actions";
import { deletePatient } from "../../api/pasien";

const ManagementPatient = () => {
  let dispatch = useDispatch();
  let [error, setError] = React.useState(false);
  let [status, setStatus] = React.useState("process");
  let patients = useSelector((state) => state.patients);

  let [delstatus, setDelstatus] = React.useState(0);

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchPasiens());
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, patients.keyword]);

  const notifDeleteSuccess = () =>
    toast.success("Delete Success !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifDeleteError = () =>
    toast.error("Delete failed !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const columns = [
    { Header: "No. RM", accessor: "noRm" },
    { Header: "Nama", accessor: "name" },
    { Header: "Poliklinik", accessor: "poly" },
    { Header: "Jenis Kelamin", accessor: "gender" },
    { Header: "Umur", accessor: "age" },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            <Link to={`/details-patient/${items.id}`}>
              <ButtonCircle icon={<BiCommentDetail />} />
            </Link>

            <Link to={`/edit-patient/${items.id}`}>
              <ButtonCircle icon={<FaEdit />} />
            </Link>

            <ButtonCircle
              onClick={() => {
                if (
                  window.confirm(`Ingin menghapus pasien an ${items.name}?`)
                ) {
                  deletePatient(items.id).then((response) => {
                    const { data } = response;
                    if (data.error) {
                      setError(true);
                      notifDeleteError();
                    } else {
                      setError(false);
                      notifDeleteSuccess();
                    }
                  });
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
        <Text as="h3"> Manajemen Data Pasien </Text>
        <br />
        <Link to="/manajemen-patient/tambah">
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
        <br />
        <div className="w-full text-center mb-10 mt-5">
          <InputText
            fullRound
            value={patients.keyword}
            placeholder="cari nama pasien.."
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        {patients.data.length ? (
          <Table
            items={patients.data}
            columns={columns}
            totalItems={patients.totalItems + 15}
            page={patients.currentPage}
            isLoading={patients.status === "process"}
            perPage={patients.size}
            onPageChange={(page) => dispatch(setPage(page))}
            showPagination={false}
            primaryKey={"_id"}
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title={`Data pasien kosong`}
              message="Belum ada data pasien."
            />
          </LayoutOne>
        )}
      </div>
      <br/>
      {error ? (
        <LayoutOne size="medium">
          <CardAlert
            title="Perhatian!"
            message="Pasien ini tidak bisa dihapus karena memiliki hubungan dengan data rekam medis."
          />
        </LayoutOne>
      ) : (
        ""
      )}
    </LayoutOne>
  );
};

export default ManagementPatient;
