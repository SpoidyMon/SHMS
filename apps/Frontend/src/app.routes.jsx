import { createBrowserRouter } from "react-router"
import Login from "./Features/Auth/pages/login"
import Register from "./Features/Auth/pages/register"
import Protected from "./Features/Auth/components/Protected"
import Forgetpassword from "./Features/Auth/pages/forgetpassword"
import VerifyEmail from "./Features/Auth/pages/verifyEmail"
import NewPdOtp from "./Features/Auth/pages/newPdOtp"
import Home from "./Features/Dashboard/components/home"

export const router = createBrowserRouter([
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
        path: "/",
        element: <Protected><Home /></Protected>
    }
])