import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import {
  LayoutOne,
  Text,
  Table,
  ButtonCircle,
  Badge,
  Button,
  CardAlert,
} from "upkit";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { userManagementData } from "../../hooks/userManagement";
import { deleteUser } from "../../api/user";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ManagementUser = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  if (user === null || user === undefined) {
    history.push("/login");
  }
  
  let dispatch = useDispatch();
  let [error, setError] = React.useState(false);
  let { role } = useParams();
  let { data, limit, page, status, count, setSearch, setPage, setDelstatus } =
    userManagementData();
  let dataAdmin = data.filter((item) => item.role === role);

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

  if (status === "error") {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
      </LayoutOne>
    );
  }

  const columns = [
    { Header: "Username", accessor: "username" },
    { Header: "Nama", accessor: "name" },
    {
      Header: "Status",
      accessor: (items) =>
        items.status ? (
          <Badge color="green">Aktif</Badge>
        ) : (
          <Badge color="red">Tidak Aktif</Badge>
        ),
    },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            <Link to={`/user-details/${items.username}`}>
              <ButtonCircle icon={<BiCommentDetail />} />
            </Link>

            <Link to={`/user-update/${items.username}`}>
              <ButtonCircle icon={<FaEdit />} />
            </Link>

            <ButtonCircle
              onClick={() => {
                if (
                  window.confirm(`Ingin menghapus admin ${items.username}?`)
                ) {
                  deleteUser(items.username).then((response) => {
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
        <Text as="h3">Menejemen {role === "admin" ? "Admin" : "Client"}</Text>
        <br />
        {role === "admin" ? (
          <Link to="/user-tambah/admin">
            <Button>Tambah Admin</Button>
          </Link>
        ) : (
          <Link to="/user-tambah/client">
            <Button>Tambah Client</Button>
          </Link>
        )}

        <br />
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
        {dataAdmin.length ? (
          <Table
            items={dataAdmin}
            showPagination={false}
            columns={columns}
            totalItems={dataAdmin.length}
            page={dataAdmin.currentPage}
            isLoading={status === "process"}
            perPage={dataAdmin.perpage}
            onPageChange={(page) => dispatch(setPage(page))}
            primaryKey={"_id"}
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title={`User ${role === "admin" ? "Admin" : "Client"} kosong`}
              message="Belum ada data user."
            />
          </LayoutOne>
        )}
      </div>
      <br />
      {error ? (
        <LayoutOne size="medium">
          <CardAlert
            title="Perhatian!"
            message="User ini tidak bisa dihapus karena memiliki hubungan dengan data pasien."
          />
        </LayoutOne>
      ) : (
        ""
      )}
    </LayoutOne>
  );
};

export default ManagementUser;
