import { apiAuth } from "../config/config";

export async function register({ username, email, password }) {
    try {
        const response = await apiAuth.post("/register",
            { username, email, password }
        )
        return response;

    } catch (error) {
        console.log("Error in apiAuth Service of register : " + error)
    }
}

export async function login({ email, password }) {
    try {
        const response = await apiAuth.post("/login",
            { email, password }
        )
        return response;

    } catch (error) {
        console.log("Error in apiAuth Service of login : " + error)
    }
}

export async function logout() {
    try {
        const response = await apiAuth.get("/logout"
        )
        return response;

    } catch (error) {
        console.log("Error in apiAuth Service of logout : " + error)
    }
}

export async function getMe() {
    try {
        const response = await apiAuth.get("/get-me"
        )
        return response;

    } catch (error) {
        if (error.response?.status !== 401) {
            console.error(error)
        }
        console.log("Error in apiAuth Service of getMe : " + error)
        return null
    }
}


export async function verifyEmail({email,otp}) {
    try {
        const response = await apiAuth.post("/verify-email",
            {email,otp}
        )
        return response;

    } catch (error) {
        console.log("Error in apiAuth Service of VerifyEmail : " + error)
    }
}

export async function resendOtp({email}) {
    try {
        const response = await apiAuth.post("/resend-Otp",
            {email}
        )
        return response;

    } catch (error) {
        console.log("Error in apiAuth Service of resendOtp : " + error)
    }
}

export async function forgotPassword({email}) {
    try {
        const response = await apiAuth.get("/forget-password",
            {email}
        )
        return response;

    } catch (error) {
        console.log("Error in apiAuth Service of register : " + error)
    }
}
export async function resetPassword({email,otp,newPassword}) {
    try {
        const response = await apiAuth.get("/reset-password",
            {email,otp,newPassword}
        )
        return response;

    } catch (error) {
        console.log("Error in apiAuth Service of register : " + error)
    }
}