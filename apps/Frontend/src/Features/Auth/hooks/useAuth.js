import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { login, register, verifyEmail, resendOtp } from '../Services/Auth.services'

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
            const data = await register({ username, email, password });
            // setUser(data?.user ?? null);dont
            return data;
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await login();
            setUser(null);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(true)
        }
    }

    const handleVerifyEmail = async ({ email, otp }) => {
        setLoading(true);
        try {
            const data = await verifyEmail({ email, otp })
            if (data?.uer) {
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

    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout, handleVerifyEmail,handleResendOtp }
}

export default useAuth
