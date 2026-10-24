import { apiAdmin } from "../config/admin.config"

export async function createStaff({username,email,mobileNo,role}) {
    try {
        const response=await apiAdmin.post("/create-staff",{username,email,mobileNo,role})
        return response.data
    } catch (error) {
        console.log("Error in apiAdmin createStaff "+ error)
        throw error
    }
    
}

export async function listallstaff() {
    try {
        const response = await apiAdmin.get("/list-allstuff")
        return response.data
    } catch (error) {
        console.log("Error in apiAdmin List all staff " + error)
        throw error
    }
}

export async function deactivateUser({ email, id }) {
    try {
        const response = await apiAdmin.post("/deactivate", { email, id })
        return response.data
    } catch (error) {
        console.log("Error in apiAdmin Deactivate user" + error)
        throw error
    }
}

export async function deleteStaff({ email, id }) {
    try {
        const response=await apiAdmin.post("/deleteStaff",{email,id})
        return response.data
    } catch (error) {
        console.log("Error in apiAdmin Delete staff " + error)
        throw error
    }
}

