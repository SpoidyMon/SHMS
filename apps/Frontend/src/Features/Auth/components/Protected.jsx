import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { Navigate, Outlet, useLocation, } from 'react-router'

const Protected = ({ roles = [] }) => {
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
    if (roles.length > 0 && !roles.includes(user.roles)) {
        <Navigate to="unauthorized" replace />
    }

    return <Outlet />
}

export default Protected
