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
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/Products/actions";
import { deleteProject } from "../../api/project";
import { fetchProject, setKeyword } from "../../features/Projects/actions";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ManagementProject = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { params } = useRouteMatch();
  const [status, setStatus] = React.useState("process");
  const [delstatus, setDelstatus] = React.useState(0);
  const projects = useSelector((state) => state.projects);
  const spesificProject = projects.data.filter(
    (data) => data.usernameClient === params.username
  );

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProject());
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, projects.keyword]);

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

  const handleClick = (projectName) => {
    const username = params.username;

    history.push(`/manajement-progress/${username}/${projectName}`);
  };

  const columns = [
    { Header: "Nama", accessor: "name" },
    { Header: "Deskripsi", accessor: "desc" },
    { Header: "Nama Client", accessor: "usernameClient" },
    // {
    //   Header: "Kategori",
    //   accessor: (items) => {
    //     return <Badge color="blue">{items.category.name}</Badge>;
    //   },
    // },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            {/* <Link to={`/manajement-progress/${items.name}`}>
              <ButtonCircle icon={<FaEdit />} />
            </Link> */}
            <ButtonCircle icon={<FaEdit />} onClick={() => handleClick(items.name)} />

            <ButtonCircle
              onClick={() => {
                if (window.confirm("Delete this product ?")) {
                  deleteProject(parseInt(items.id));
                  setDelstatus(1);
                  notifDelete();
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
        <Text as="h3">{`Project ${params.username}`}</Text>
        <br />
        <Link to={`/project/tambah/${params.username}`}>
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
            value={spesificProject.keyword}
            placeholder="cari nama project..."
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        {spesificProject.length ? (
          <Table
            items={spesificProject}
            columns={columns}
            // totalItems={projects.totalItems + 15}
            // page={projects.currentPage}
            // isLoading={projects.status === "process"}
            // perPage={projects.perpage}
            onPageChange={(page) => dispatch(setPage(page))}
            primaryKey={"_id"}
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title={`Data Project kosong`}
              message="Belum ada data project."
            />
          </LayoutOne>
        )}
      </div>
    </LayoutOne>
  );
};

export default ManagementProject;
