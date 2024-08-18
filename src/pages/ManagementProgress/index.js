import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatRupiah } from "../../utils/format-rupiah";
import BounceLoader from "react-spinners/BounceLoader";
import {
  LayoutOne,
  Text,
  Button,
  Table,
  InputText,
  Badge,
  ButtonCircle,
  CardAlert,
} from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { config } from "../../config";
import { setPage, setKeyword } from "../../features/Products/actions";
import { deleteProduct } from "../../api/product";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ManagementProgress = () => {
  let dispatch = useDispatch();
  const { params } = useRouteMatch();
  let [status, setStatus] = React.useState("process");
  let products = useSelector((state) => state.products);
  let [delstatus, setDelstatus] = React.useState(0);
  const history = useHistory();

  React.useEffect(() => {
    setStatus("process");
    // dispatch(fetchProducts()); //TODO fetch progress api
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, products.currentPage, products.keyword]);

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

  const handleClick = () => {
    const username = params.username;
    const projectName = params.projectName;

    history.push(`/progress/tambah/${username}/${projectName}`);
  };

  const columns = [
    {
      Header: "Gambar",
      accessor: (items) => {
        return (
          <img
            style={{ height: 40 }}
            src={`${config.api_host}/upload/${items.image_url}`}
            alt="gambarProduk"
          />
        );
      },
    },
    { Header: "Nama", accessor: "name" },
    { Header: "Harga", accessor: (items) => formatRupiah(items.price) },
    { Header: "Diskon", accessor: "discount" },
    {
      Header: "Kategori",
      accessor: (items) => {
        return <Badge color="blue">{items.category.name}</Badge>;
      },
    },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            <Link to={`/edit-produk/${items._id}`}>
              <ButtonCircle icon={<FaEdit />} />
            </Link>

            <ButtonCircle
              onClick={() => {
                if (window.confirm("Delete this product ?")) {
                  deleteProduct(items._id);
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
        <Text as="h3">{`Data Progress ${params.projectName}`}</Text>
        <br />
        <Button onClick={handleClick}>Tambah baru</Button>
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
            value={products.keyword}
            placeholder="cari progress"
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        <br />
        {products.data.length ? (
          <Table
            items={products.data}
            columns={columns}
            totalItems={products.totalItems + 15}
            page={products.currentPage}
            isLoading={products.status === "process"}
            perPage={products.perpage}
            onPageChange={(page) => dispatch(setPage(page))}
            primaryKey={"_id"}
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title={`Data Progress kosong`}
              message="Belum ada data progress."
            />
          </LayoutOne>
        )}
      </div>
    </LayoutOne>
  );
};

export default ManagementProgress;
