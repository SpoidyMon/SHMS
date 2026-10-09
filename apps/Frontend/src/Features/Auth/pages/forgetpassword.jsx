import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from "../hooks/useAuth"

const Forgetpassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { handleForgetPassword } = useAuth()

    const [email, setEmail] = useState(location.state?.email || "")
    const [isResetingPd, setIsResetingPd] = useState(false)
    const [message, setMessage] = useState({ text: "", type: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        if (!email.trim()) {
            setMessage({ text: "Please enter your email address", type: "error" });
            return;
        }

        setIsResetingPd(true);
        try {
            const response = await handleForgetPassword({ email });
            if (response) {
                setMessage({ text: "OTP sent successfully to your email!", type: "success" });
                setTimeout(() => {
                    navigate("/reset-password", { state: { email } });
                }, 1000);
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message || "Failed to send reset OTP";
            setMessage({ text: errorMsg, type: "error" });
        } finally {
            setIsResetingPd(false);
        }
    }

    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] min-h-[400px] w-[420px] p-6 content-between rounded shadow-md" >
                    <h1 className='text-[22px] font-bold'>Forgot your <span className='text-[#fe4c4d]'>Password?</span></h1>
                    <p className='font-[350]'>An OTP will be sent to your <span className='font-semibold'>email</span> to reset your password.</p>

                    {message.text && (
                        <div className={`mt-3 p-2.5 text-sm rounded ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="form-container mt-6 text-gray-600 ">
                        <hr className='mb-5 ' />
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[8px]' >

                            <div className="input mt-[2px]">
                                <label htmlFor="email">Email Address</label><br />
                                <input
                                    id='email'
                                    name='email'
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Type Email'
                                    className='border border-gray-300 p-[5px] mt-1 w-full rounded'
                                />
                            </div>
                            <button
                                type='submit'
                                disabled={isResetingPd}
                                className='bg-[#215df5] hover:bg-[#1a4cd2] transition mt-2 h-[36px] text-lg text-[#f0f0f0] p-1 rounded-[5px] disabled:opacity-50'
                            >
                                {isResetingPd ? "Sending OTP..." : "Send OTP"}
                            </button>

                            <hr className='mt-[10px] mb-[10px]' />
                        </form>

                    </div>
                    <div className="mt-1.5 mb-1.5 ">
                        <p className='justify-self-center content-center'>
                            <i className="fa-solid fa-arrow-left-long mr-1"></i> Back to <Link className='text-[#fe4c4d] hover:underline' to={"/login"}>Login</Link>
                        </p>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default Forgetpassword
