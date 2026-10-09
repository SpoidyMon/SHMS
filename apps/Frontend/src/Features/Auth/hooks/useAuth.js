import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { login,logout, register, verifyEmail, resendOtp,forgotPassword,resetPassword } from '../Services/Auth.services'

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data?.user ?? null);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyEmail = async ({ email, otp }) => {
        setLoading(true);
        try {
            const data = await verifyEmail({ email, otp })
            if (data?.user) {
                setUser(data.user);
            }
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleResendOtp = async ({ email }) => {
        try {
            const data = await resendOtp({ email });
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleForgetPassword = async ({ email }) => {
        try {
            const data = await forgotPassword({ email })
            return data
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    const handleResetPassword=async({email,otp,newPassword})=>{
        try {
            const data=await resetPassword({email,otp,newPassword})
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout, handleForgetPassword,handleResetPassword, handleVerifyEmail, handleResendOtp }
}

export default useAuth
