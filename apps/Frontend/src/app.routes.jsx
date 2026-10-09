import { createBrowserRouter } from "react-router"
import Login from "./Features/Auth/pages/login"
import Register from "./Features/Auth/pages/register"
import Protected from "./Features/Auth/components/protected"
import Forgetpassword from "./Features/Auth/pages/forgetpassword"
import VerifyEmail from "./Features/Auth/pages/verifyEmail"
import NewPdOtp from "./Features/Auth/pages/newPdOtp"

export const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/change-Password",
        element: <NewPdOtp/>
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
        path: "/",
        element: <Protected><home /></Protected>
    }
])