import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router"
import useAuth from "../hooks/useAuth"


const SetPassword = () => {
    const { token } = useSearchParams()
    const {handleSetPassword}=useAuth()
    const navigate=useNavigate()

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState({ text: "", type: "" })
    const [isPasswordSetting, setIsPasswordSetting] = useState(false)

    const ispAsswordMatching = newPassword === confirmPassword

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage({ text: "", type: "" })
        if (!token) {
            setMessage({ text: "Link has been expireed, try another link", type: "error" })
            return
        }
        if (!ispAsswordMatching) {
            setMessage({ text: "Please confirm your password correctly", type: "error" })
            return
        }
        setIsPasswordSetting(true)
        try {
            const response=await handleSetPassword({token,newPassword})
            if(response){
                setMessage({text:"Password has been set successfully",type:"success"})
                setTimeout(() => {
                    navigate("/login")
                }, 1000);
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message || "Failed to set Password";
            setMessage({ text: errorMsg, type: "error" });

        } finally {
            setIsPasswordSetting(false)
        }
    }

    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] min-h-[400px] w-[430px] p-6 content-between rounded shadow-md" >
                    <h1 className='text-[22px] font-bold'>Admin invited you as <span className='text-[#fe4c4d]'>Staff Member!!</span></h1>
                    <p className='font-[350]'>Enter password to login as a staff </p>

                    {message.text && (
                        <div className={`mt-3 p-2.5 text-sm rounded ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="form-container mt-6 text-gray-600 ">
                        <hr className='mb-5 ' />
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[8px]' >

                            <div className="input mt-[2px]">
                                <label htmlFor="email">Enter New Password</label><br />
                                <input
                                    id='newPassword'
                                    name='newPassword'
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder='New Passwrd'
                                    className='border border-gray-300 p-[5px] mt-1 w-full rounded'
                                />
                            </div>

                            <div className="input mt-[8px]">
                                <label htmlFor="email">Confirm Password</label><br />
                                <input
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Conifrm Password'
                                    className='border border-gray-300 p-[5px] mt-1 w-full rounded'
                                />
                            </div>
                            <button
                                type='submit'
                                disabled={isPasswordSetting}
                                className='bg-[#215df5] hover:bg-[#1a4cd2] transition mt-2 h-[36px] text-lg text-[#f0f0f0] p-1 rounded-[5px] disabled:opacity-50'
                            >
                                {isPasswordSetting ? "Setting Password..." : "St Password"}
                            </button>

                            <hr className='mt-[10px] mb-[10px]' />
                        </form>

                    </div>
                    {/* <div className="mt-1.5 mb-1.5 ">
                        <p className='justify-self-center content-center'>
                            <i className="fa-solid fa-arrow-left-long mr-1"></i> Back to <Link className='text-[#fe4c4d] hover:underline' to={"/login"}>Login</Link>
                        </p>
                    </div> */}

                </div>
            </div>
        </main>
    )
}

export default SetPassword
