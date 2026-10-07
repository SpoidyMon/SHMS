import {createBrowserRouter} from "react-router"
import Login from "./Features/Auth/pages/login"
import Register from "./Features/Auth/pages/register"
import Protected from "./Features/Auth/components/protected"


export const router =createBrowserRouter([
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/",
        element:<Protected><home/></Protected>
    }
])