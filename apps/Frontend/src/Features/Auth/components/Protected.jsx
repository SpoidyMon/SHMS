import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { Navigate, Outlet, useLocation, } from 'react-router'

const Protected = ({ roles = [], children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return (
            <div className='items-center justify-center'>
                <h1>Loading ....</h1>
            </div>
        )
    }
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        )
    }
    const userRole = user.role || user.roles
    if (roles.length > 0 && !roles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children ? children : <Outlet />
}

export default Protected
