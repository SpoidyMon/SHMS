import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth';

const NewPdOtp = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { handleResetPassword, handleResendOtp } = useAuth()

    const [email, setEmail] = useState(location.state?.email || "")
    const [otp, setOtp] = useState(["", "", "", "", "", "", "",]);
    const [newPassword, setNewPassword] = useState("")
    const [timer, setTimer] = useState(60)
    const [message, setMessage] = useState({ text: "", type: "" })
    const [isResetingPd, setIsResetingPd] = useState(false)
    const [isResending, setIsResending] = useState(false)

    const inputRefs = useRef([])

    useEffect(() => {
        if (timer <= 0) return
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000);

        return () => clearInterval(interval)
    }, [timer])

    const formatTimer = (seconds) => {
        const mins = seconds / 60;
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const handleOtpChange = (index, value) => {
        const cleanValue = value.replace(/[^0-9]/g, '')
        const newOtp = [...otp]
        newOtp[index] = cleanValue.slice(-1)

        if (cleanValue && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getdata('text').replace(/[^0-9]/g, '').slice(0 - 6);
        if (!pasteData) return

        const newOtp = [...otp]  // for half paste
        for (let i = 0; i < pasteData.length; i++) {
            newOtp[i] = pasteData[i]
        }
        setOtp(newOtp);

        const focusIndex = Math.min(pasteData.length, 5)
        inputRefs.current[focusIndex]?.focus();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (!email.trim()) {
            setMessage({ text: 'Please enter Email Address', type: 'error' })
            return
        }
        if (!newPassword.trim()) {
            setMessage({ text: 'Please enter New Password', type: 'error' })
            return
        }

        const fullOtp = otp.join("")
        if (fullOtp.length === 6) {
            setMessage({ text: "Please enter the complete 6-digit OTP code", type: "error" })
            return
        }

        setIsResetingPd(true);
        try {
            const response = await handleResetPassword({ email, otp, newPassword })
            if (response) {
                setMessage({ text: 'Email Verified Successfully', type: 'success' })
                setTimeout(() => {
                    navigate('/login')
                }, 1500)
            }
        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message || "Verification Failed"
            setMessage({ text: errorMsg, type: "error" })
        } finally {
            setIsResetingPd(true)
        }

    }
    const handleResend = async () => {
        if (timer > 0 || isResending) return
        if (!email.trim()) {
            setMessage({ text: 'Please enter your Email to send Otp', type: 'error' })
        }
        setIsResending(true);
        setMessage({ text: "", type: "" })

        try {
            await handleResendOtp({ email })
            setMessage({ text: "A new OTP has been sent to your email!", type: "success" })
            setTimer(60)
            setOtp(["", "", "", "", "", ""])
            inputRefs.current[0]?.focus()

        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message || "Failed to resend Otp"
            setMessage({ text: errorMsg, type: "error" })
        } finally {
            setIsResending(false)
        }
    }

    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] h-[540px] w-[420px] p-6 content-between" >
                    <h1 className='text-[22px] font-bold'>Reset <span className='text-[#fe4c4d]'>Password!!</span></h1>
                    <p className='font-[350]'>We send an otp to <span className='font-semibold'>{email !== "" ? email : "registered email"}</span><br />Enter it below to reset password</p>

                    <div className="form-container mt-6 text-gray-600 ">
                        <hr className='mb-5 ' />
                        {message.text && (
                            <div className={`p-2.5 mb-4 text-sm rounded ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col gap-[8px]' >

                            <div>
                                <p className="mt-2 text-sm text-gray-500"> Enter the 6-digit code sent to your email. </p>
                                <div className="flex justify-center gap-2 mt-2" onPaste={handlePaste}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            className="w-11 h-12 rounded-lg border border-gray-300 text-center text-xl 
                                                font-semibold outline-none focus:border-[#fe4c4d] focus:ring-2 focus:ring-red-100 transition"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-2 text-center ">
                                <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                                    <span className="text-gray-500"> Resend available in : </span>
                                    <span className="font-semibold text-gray-700"> {formatTimer(timer)} </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={timer > 0 || isResending}
                                    className={`mt-2 text-sm font-semibold transition ${timer > 0 || isResending ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-[#fe4c4d] hover:underline'}`}
                                >
                                    {isResending ? "Sending..." : "Resend OTP"}
                                </button>
                            </div>

                            <div className="input mt-[2px]">
                                <label htmlFor="newPassword" className='text-sm text-gray-500'>Enter New Password</label><br />
                                <input onChange={(e) => { setNewPassword(e.target.value) }} className='border border-gray-300 p-[5px] mt-2 w-full' type="password" placeholder='Password' name='newPassword' id='newPassword' />
                            </div>

                            <button  type='submit' className='bg-[#215df5] mt-2 h-[36px] text-xl text-[#f0f0f0] p-1 rounded-[5px]'>{isResetingPd ? "Reset Password" : "Reseting..."}</button>
                            <hr className='mt-[10px] mb-[10px]' />
                        </form>

                    </div>
                    <div className="mt-1.5 mb-1.5 ">
                        <p className='justify-self-center content-center '><i class="fa-solid fa-arrow-left-long"></i>   Back to <Link className='text-[#fe4c4d]' to={"/register"}>Login</Link></p>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default NewPdOtp
