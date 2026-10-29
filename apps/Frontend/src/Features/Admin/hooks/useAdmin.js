import { useContext } from "react"
import { AuthContext } from "../../Auth/auth.context"
import { createStaff, deactivateUser, deleteStaff, listallstaff } from "../services/Admin.services"


const useAdmin = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)

    const handleCreateStaff = async ({ username, email, mobileNo, role }) => {
        setLoading(true)
        try {
            const response = await createStaff({ username, email, mobileNo, role })
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleListAllStuff = async () => {
        setLoading(true)
        try {
            const response = await listallstaff()
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleDeactivateUser = async ({email,id}) => {
        setLoading(true)
        try {
            const response = await deactivateUser({email,id})
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteUser = async ({email,id}) => {
        setLoading(true)
        try {
            const response = await deleteStaff({email,id})
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return (user, setUser, loading, setLoading, handleCreateStaff,handleDeactivateUser,handleDeleteUser,handleListAllStuff)
}

export default useAdmin
