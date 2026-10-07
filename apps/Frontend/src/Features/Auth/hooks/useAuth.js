import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { login, register } from '../Services/Auth.services'

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const response = await login({ email, password })
            setUser(response?.user ?? null)
            return
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const response=await register({username,email,password});
            setUser(response?.user ?? null);
            return
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleLogout=async()=>{
        setLoading(true);
        try {
            await login();
            setUser(null);
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(true)
        }
    }

    return {user,setUser,loading,setLoading,handleLogin,handleRegister,handleLogout}
}

export default useAuth
