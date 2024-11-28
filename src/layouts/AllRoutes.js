// ** Import from react dom
import { Route, Routes, Navigate } from "react-router-dom";
import "assets/scss/theme.scss";
import ProspectForm from "components/dashboard/prospectos/addform";
import DashboardIndex from "layouts/dashboard/DashboardIndex";
import AuthLayout from "layouts/dashboard/AuthLayout";
import DashboardIndexCompact from "layouts/dashboard/DashboardIndexCompact"; // ( added in v1.3.0 )
import DashboardIndexTop from "layouts/dashboard/DashboardIndexTop"; // ( added in v1.3.0 )
import ChatLayout from "./dashboard/ChatLayout"; // ( added in v2.0.0 )
import Cotizador from "components/dashboard/prospectos/Cotizador";
import Overview from "components/dashboard/bienvenido/Overview";
import Metrics from "components/dashboard/analytics/Metrics";
import Instructor from "components/dashboard/prospectos/Instructor";
import SignIn from "components/dashboard/authentication/SignIn";
import SignUp from "components/dashboard/authentication/SignUp";
import ForgetPassword from "components/dashboard/authentication/ForgetPassword";
import General from "components/dashboard/settings/General";
import CustomToast from "components/dashboard/authentication/Toast";
import Google from "components/dashboard/settings/Google";
import Social from "components/dashboard/settings/Social";
import SocialLogin from "components/dashboard/settings/SocialLogin";
import SMTPServer from "components/dashboard/settings/SMTPServer";
import ProjectOverview from "components/dashboard/projects/single/masdetalles/cards";
import ProjectPrestadores from "components/dashboard/prestadores/Planesheader";
import Datatables from "components/dashboard/tables/Datatables";
// ** Boostrap components
import NotfoundPage from "components/notfound/notfoundpage";
// Mentor Pages (v2.3.
import Checkout from "components/dashboard/checkout/Checkout";
import NavbarVertical from "./dashboard/NavbarVertical";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Routes with DefaultLayout */}
      <Route path="/" element={<SignIn />} />
      <Route element={<NavbarVertical />}></Route>
      {/* Routes with BlankLayout */}
      {/* Routes with AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/authentication/sign-in" element={<SignIn />} />
        <Route path="/authentication/sign-up" element={<SignUp />} />
        <Route
          path="/authentication/forget-password"
          element={<ForgetPassword />}
        />
      </Route>
      {/* Routes (DASHBOARD ROUTERS) with DashboardIndex */}
      <Route element={<DashboardIndex />}>
        <Route path="/overview" element={<Overview />} />
        <Route path="/dashboard/analytics" element={<Metrics />} />
        <Route path="/user/instructor" element={<Instructor />} />
        <Route
          path="/prestadores/projectprestadores"
          element={<ProjectPrestadores />}
        />
        <Route path="/user/Cotizador" element={<Cotizador />} />
        <Route path="/user/addform" element={<ProspectForm />} />

        <Route path="/dashboard/checkout/Checkout" element={<Checkout />} />
        <Route
          path="/dashboard/projects/single/overview"
          element={<ProjectOverview />}
        />
        <Route
          path="/dashboard/layouts/layout-vertical"
          element={<Overview />}
        />
        {/* SETTINGS ROUTERS */}
        <Route path="/settings/general" element={<General />} />
        {/* PROJECTS ROUTERS */}

        {/* ** Dashboard - Tables Pages ( v2.2.0 ) */}
      </Route>
      {/* Routes with EcommerceLayout (v2.2.0) */}
      {/* ** Dashboard - Ecommerce -> Customers Pages ( v2.2.0 ) */}
      {/* Routes with ChatLayout */}
      {/* Routes with DashboardIndexTop */}
      {/* Routes with DashboardIndexCompact */}
      {/*Redirect*/}
      <Route path="/error" element={<NotfoundPage />} /> {/* Ruta para error */}
      {/* Redirección de rutas no definidas a la ruta de error */}
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
};

export default AllRoutes;
