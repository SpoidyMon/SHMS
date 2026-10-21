import { createBrowserRouter } from "react-router"
import Login from "./Features/Auth/pages/login"
import Register from "./Features/Auth/pages/register"
import Protected from "./Features/Auth/components/Protected"
import Forgetpassword from "./Features/Auth/pages/forgetpassword"
import VerifyEmail from "./Features/Auth/pages/verifyEmail"
import NewPdOtp from "./Features/Auth/pages/newPdOtp"
import Home from "./Features/Dashboard/components/home"
import Unauthorized from "./Features/Auth/pages/unauthorized"
import AdminDashboard from "./Features/Admin/pages/adminDashboard"
import ManagerDashboard from "./Features/Manager/pages/dashboard"
import SupervisorDashboard from "./Features/Supervisor/pages/supervisorDashboard"
import ChefDashboard from "./Features/Chef/pages/chefDashboard"
import WaiterDashboard from "./Features/Waiter/pages/waiterDashboard"
import SetPassword from "./Features/Auth/pages/setPassword"

export const router = createBrowserRouter([

    //Public Routes
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/forget-password",
        element: <Forgetpassword />
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />
    },
    {
        path: "/change-Password",
        element: <NewPdOtp />
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    },
    {
        path:"/set-password",
        element:<SetPassword/>
    },
    {
        path: "/admin/dashboard",
        element: <Protected roles={["ADMIN"]}><AdminDashboard /></Protected>
    },
    {
        path: "/manager/dashboard",
        element: <Protected roles={["MANAGER", "ADMIN"]}><ManagerDashboard /></Protected>
    },
    {
        path: "/supervisor/dashboard",
        element: <Protected roles={["SUPERVISOR", "ADMIN"]}><SupervisorDashboard /></Protected>
    },
    {
        path: "/chef/dashboard",
        element: <Protected roles={["CHEF", "ADMIN"]}><ChefDashboard /></Protected>
    },
    {
        path: "/waiter/dashboard",
        element: <Protected roles={["WAITER", "ADMIN"]}><WaiterDashboard /></Protected>
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    }
])