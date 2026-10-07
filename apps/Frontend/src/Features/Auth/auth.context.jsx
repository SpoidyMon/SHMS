import { createContext, useEffect, useState } from "react"
import { getMe } from "./Services/Auth.services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const response = await getMe();
                setUser(response.user)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        getAndSetUser();
    },[])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )

}