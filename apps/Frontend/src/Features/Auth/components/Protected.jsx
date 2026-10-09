import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { Navigate } from 'react-router'


const Protected = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <main><h1>Loading...</h1></main>
        )
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }


    return children
}

export default Protected
