import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import React, { lazy, Suspense } from "react";
import Loading from "./components/Loading";
import { ROUTES } from "./constants/routePaths";
import "@mdi/font/css/materialdesignicons.min.css";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Counsellors = lazy(() => import("./pages/Counsellors"));
const Profile = lazy(() => import("./pages/Profile"));
const Notifications = lazy(() => import("./pages/Notifications"));
const ApplyCounsellor = lazy(() => import("./pages/ApplyCounsellor"));
const Error = lazy(() => import("./pages/Error"));
const Chatbot = lazy(() => import("./components/chatbot/Chatbot"));

function App() {
  return (
    <Router>
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route
            path={ROUTES.REGISTER}
            element={
              <Public>
                <Register />
              </Public>
            }
          />
          <Route path={ROUTES.COUNSELLORS} element={<Counsellors />} />
          <Route
            path={ROUTES.APPOINTMENTS}
            element={
              <Protected>
                <Appointments />
              </Protected>
            }
          />
          <Route
            path={ROUTES.NOTIFICATIONS}
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />
          <Route
            path={ROUTES.APPLY_FOR_COUNSELLOR}
            element={
              <Protected>
                <ApplyCounsellor />
              </Protected>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path={ROUTES.DASHBOARD.USERS}
            element={
              <Admin>
                <Dashboard type={"users"} />
              </Admin>
            }
          />
          <Route
            path={ROUTES.DASHBOARD.PROFILE}
            element={
              <Admin>
                <Dashboard type={"profile"} />
              </Admin>
            }
          />
          <Route
            path={ROUTES.DASHBOARD.COUNSELLORS}
            element={
              <Admin>
                <Dashboard type={"counsellors"} />
              </Admin>
            }
          />
          <Route
            path={ROUTES.DASHBOARD.APPOINTMENTS}
            element={
              <Protected>
                <Dashboard type={"appointments"} />
              </Protected>
            }
          />
          <Route
            path={ROUTES.DASHBOARD.APPLICATIONS}
            element={
              <Protected>
                <Dashboard type={"applications"} />
              </Protected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
      <Chatbot />
    </Router>
  );
}

export default App;
