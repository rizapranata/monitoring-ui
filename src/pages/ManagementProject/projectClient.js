import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, Text, Table, ButtonCircle, Badge, CardAlert } from "upkit";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import FaEdit from "@meronex/icons/fa/FaEdit";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { userManagementData } from "../../hooks/userManagement";
import { useParams } from "react-router-dom";
import { fetchProject } from "../../features/Projects/actions";

const ProjectClient = () => {
  let dispatch = useDispatch();
  const [status, setStatus] = React.useState("process");
  const projects = useSelector((state) => state.projects);
  const { role } = useParams();
  const { data, limit, page, count, setSearch, setPage, setDelstatus } =
    userManagementData();
  const dataClient = data.filter((item) => item.role === "client");

  const checkTotalProject = (client) => {
    const total = projects.data.filter(
      (data) => data.usernameClient === client
    );

    return total.length;
  };

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProject());
    setStatus("success");
  }, [dispatch]);

  const columns = [
    { Header: "Nama Client", accessor: "name" },
    {
      Header: "Jumlah Project",
      accessor: (items) => {
        if (checkTotalProject(items.username) > 0) {
          return (
            <Badge color="green">{checkTotalProject(items.username)}</Badge>
          );
        } else {
          return <Badge color="red">0</Badge>;
        }
      },
    },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            {/* <Link to={`/user-details/${items.username}`}>
              <ButtonCircle icon={<BiCommentDetail />} />
            </Link> */}
            <Link to={`manajement-project/${items.username}`}>
              <ButtonCircle icon={<FaEdit />} />
            </Link>
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
        <Text as="h3">Project Clients</Text>
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
        {dataClient.length ? (
          <Table
            items={dataClient}
            showPagination={false}
            columns={columns}
            totalItems={dataClient.length}
            page={dataClient.currentPage}
            isLoading={status === "process"}
            perPage={dataClient.perpage}
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
    </LayoutOne>
  );
};

export default ProjectClient;
