import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import {
  LayoutOne,
  Text,
  Table,
  ButtonCircle,
  Badge,
  CardAlert,
  InputText,
} from "upkit";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { userManagementData } from "../../hooks/userManagement";
import { useParams } from "react-router-dom";
import { getAllProject } from "../../api/project";

const ProjectClient = () => {
  const [statusData, setStatusData] = React.useState("process");
  const [allProject, setAllProject] = React.useState([]);
  const { role } = useParams();
  const { data, setPage, setSearch, status, page, limit } =
    userManagementData();
  const dataClient = data.filter((item) => item.role === "client");

  React.useEffect(() => {
    setStatusData("process");
    getAllProject()
      .then(({ data }) => {
        setAllProject(data.data);
      })
      .finally(() => setStatusData("success"));
  }, []);

  const columns = [
    { Header: "Nama Client", accessor: "name" },
    {
      Header: "Jumlah Project",
      accessor: (items) => {
        const projectAmount = allProject?.filter(
          (data) => data.usernameClient === items.username
        );

        if (projectAmount?.length > 0) {
          return <Badge color="green">{projectAmount?.length}</Badge>;
        } else {
          return <Badge color="red">0</Badge>;
        }
      },
    },
    {
      Header: "Action",
      accessor: (items) => {
        const projectAmount = allProject?.filter(
          (data) => data.usernameClient === items.username
        );
        return (
          <div>
            {/* <Link to={`/user-details/${items.username}`}>
              <ButtonCircle icon={<BiCommentDetail />} />
            </Link> */}
            <Link
              to={`manajement-project/${items.username}/${projectAmount?.length}`}
            >
              <ButtonCircle icon={<FaEdit />} />
            </Link>
          </div>
        );
      },
    },
  ];

  if (statusData === "process") {
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
        <div className="w-full text-center mb-10 mt-5">
          <InputText
            fullRound
            placeholder="cari nama customer..."
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {status === "success" ? (
          <Table
            primaryKey={"id"}
            items={dataClient}
            columns={columns}
            totalItems={dataClient.length}
            page={page}
            isLoading={status === "process"}
            perPage={limit}
            onPageChange={(page) => setPage(page)}
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
