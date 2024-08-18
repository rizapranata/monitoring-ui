import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "upkit/dist/style.min.css";
import store from "./app/store";
import Home from "./pages/Home";
import { listen } from "./app/listener";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";
import UserAddressAdd from "./pages/UserAddressAdd";
import UserAddress from "./pages/UserAddress";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import UserAccount from "./pages/UserAccount";
import UserOrders from "./pages/UserOrders";
import Logout from "./pages/Logout";
import GuardRoute from "./components/GuardRoute";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import GuardAdminRoute from "./components/GuardAdminRoute";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import ManagementPatient from "./pages/ManagementPatient";
import PatientAdd from "./pages/PatientAdd";
import PatientEdit from "./pages/PatientEdit";
import GuardDoctorRoute from "./components/GuardDoctorRoute";
import MedicalRecord from "./pages/MedicalRecord";
import MedicalRecordAdd from "./pages/MedicalRecordAdd";
import MedicalRecordEdit from "./pages/MedicalRecordEdit";
import MedicalRecordDetails from "./pages/MedicalRecordDetails";
import DetailsPatient from "./pages/DetailsPatient";
import PrintMedicalRecord from "./pages/PrintMedicalRecord";
import PreviewToConvertPDF from "./pages/PreviewToConvertPDF";
import GuardSuperAdminRoute from "./components/GuardSuperAdminRoute";
import UserDetails from "./pages/UserDetails";
import ManagementUserAdd from "./pages/ManagementUserAdd";
import ManagementUser from "./pages/ManagementUser";
import UserUpdate from "./pages/UserEdit";
import ProgressAdd from "./pages/ProgressAdd";
import ManagementProgress from "./pages/ManagementProgress";
import ProjectAdd from "./pages/ProjectAdd";
import ManagementProject from "./pages/ManagementProject";
import ProjectClient from "./pages/ManagementProject/projectClient";

function App() {
  React.useEffect(() => {
    listen();
    // getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <GuardRoute path="/logout">
            <Logout />
          </GuardRoute>
          <GuardRoute path="/pesanan">
            <UserOrders />
          </GuardRoute>
          <GuardRoute path="/account">
            <UserAccount />
          </GuardRoute>
          <GuardRoute path="/invoice/:order_id">
            <Invoice />
          </GuardRoute>
          <GuardRoute path="/checkout">
            <Checkout />
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman/tambah">
            <UserAddressAdd />
          </GuardRoute>
          <GuardRoute path="/alamat-pengiriman">
            <UserAddress />
          </GuardRoute>
          <GuestOnlyRoute path="/register/berhasil">
            <RegisterSuccess />
          </GuestOnlyRoute>
          <GuardAdminRoute path="/manajemen-produk/tambah">
            <ProductAdd />
          </GuardAdminRoute>
          <GuardAdminRoute path="/edit-produk/:product_id">
            <ProductEdit />
          </GuardAdminRoute>
          <GuardAdminRoute path="/manajement-progress/:username/:projectName">
            <ManagementProgress />
          </GuardAdminRoute>
          <GuardAdminRoute path="/project/tambah/:username">
            <ProjectAdd />
          </GuardAdminRoute>
          <GuardAdminRoute path="/manajement-project/:username">
            <ManagementProject />
          </GuardAdminRoute>
          <GuardAdminRoute path="/progress/tambah/:username/:projectName">
            <ProgressAdd />
          </GuardAdminRoute>
          <GuardAdminRoute path="/project-client">
            <ProjectClient />
          </GuardAdminRoute>
          <GuardDoctorRoute path="/rekam-medis">
            <MedicalRecord />
          </GuardDoctorRoute>
          <GuardSuperAdminRoute path="/user/:role">
            <ManagementUser />
          </GuardSuperAdminRoute>
          <GuardSuperAdminRoute path="/user-update/:username">
            <UserUpdate />
          </GuardSuperAdminRoute>
          <GuardSuperAdminRoute path="/user-tambah/:roleUser">
            <ManagementUserAdd />
          </GuardSuperAdminRoute>
          <GuardSuperAdminRoute path="/user-details/:username">
            <UserDetails />
          </GuardSuperAdminRoute>
          <GuardDoctorRoute path="/rekam-mediss/tambah">
            <MedicalRecordAdd />
          </GuardDoctorRoute>
          <GuardDoctorRoute path="/rekam-mediss/:medicalRecordId">
            <MedicalRecordEdit />
          </GuardDoctorRoute>
          <GuardDoctorRoute path="/detail-rekam-medis/:medicalRecordId">
            <MedicalRecordDetails />
          </GuardDoctorRoute>
          <GuardAdminRoute path="/print-rekam-medis">
            <PrintMedicalRecord />
          </GuardAdminRoute>
          <GuardAdminRoute path="/preview-convert-pdf/:medicalRecordId">
            <PreviewToConvertPDF />
          </GuardAdminRoute>
          <GuardAdminRoute path="/edit-patient/:patientId">
            <PatientEdit />
          </GuardAdminRoute>
          <GuardAdminRoute path="/details-patient/:patientId">
            <DetailsPatient />
          </GuardAdminRoute>
          <GuardAdminRoute path="/manajemen-patient/tambah">
            <PatientAdd />
          </GuardAdminRoute>
          <GuardAdminRoute path="/manajemen-patient">
            <ManagementPatient />
          </GuardAdminRoute>
          <GuestOnlyRoute path="/register">
            <Register />
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/login">
            <Login />
          </GuestOnlyRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
