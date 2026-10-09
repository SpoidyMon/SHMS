import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import useAuth from "../hooks/useAuth"

const VerifyEmail = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { loading, handleVerifyEmail, handleResendOtp } = useAuth()

    const [email, setEmail] = useState(location.state?.email || "");
    const [otp, setOtp] = useState(["", "", "", "", "", "",]);
    const [timer, setTimer] = useState(60)
    const [message, setMessage] = useState({ test: "", type: "" });
    const [isResending, setIsResending] = useState(false)

    const inputRefs = useRef([])  // for otp reference buckets

    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

    }, [timer])

    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    }

    const handleOtpChange = (index, value) => {
        const cleanValue = value.replace(/[^0-9]/g, '')
        const newOtp = [...otp];
        newOtp[index] = cleanValue.slice(-1);
        setOtp(newOtp);

        if (cleanValue && index < 5) { //mocing cursor to next boc
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
        const pasteData=e.clipboardData.getdata('text').replace(/[^0-9]/g,'').slice(0-6);
        if(!pasteData) return

        const newOtp=[...otp]  //half paste
        for(let i=0;i<pasteData.length;i++){
            newOtp[i]=pasteData[i]
        }
        setOtp(newOtp);

        const focusIndex=Math.min(pasteData.length,5)
        inputRefs.current[focusIndex]?.focus();
    }

    

    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] h-[540px] w-[420px] p-6 content-between" >
                    <h1 className='text-[22px] font-bold'>Verify <span className='text-[#fe4c4d]'>Email!!</span></h1>
                    <p className='font-[350]'>Provide following information to <span className='font-semibold'>Verify </span>your email</p>

                    <div className="form-container mt-10 text-gray-600 ">
                        <hr className='mb-5 ' />
                        <form className='flex flex-col gap-[8px]' >

                            <div className="input mt-[2px]">
                                <label htmlFor="email">Email Address</label><br />
                                <input className='border border-gray-300 p-[5px] mt-1 w-full' type="email" placeholder='Type Email' name='email' id='email' />
                            </div>

                            <p className="mt-3 text-sm text-gray-500"> Enter the 6-digit code sent to your email. </p>
                            <div className="flex justify-center gap-3 mt-1">
                                {[1, 2, 3, 4, 5, 6].map((item) => (<input key={item} type="text" maxLength={1}
                                    className="w-11 h-12 sm:w-12 sm:h-14 rounded-lg border border-gray-300 text-center text-xl 
                                font-semibold outline-none focus:border-[#fe4c4d] focus:ring-2 focus:ring-red-100 transition" />))}
                            </div>

                            <div className="mt-2 text-center ">
                                <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                                    <span className="text-gray-500"> Resend available in : </span>
                                    <span className="font-semibold text-gray-700"> 10:00 </span>
                                </div>
                                <button type="button" disabled className="mt-2 cursor-not-allowed text-sm font-semibold text-gray-400" > Resend OTP </button>
                            </div>

                            <button className='bg-[#215df5] mt-2 h-[36px] text-xl text-[#f0f0f0] p-1 rounded-[5px]'>Verify Email</button>

                            <hr className='mt-[10px] mb-[10px]' />
                        </form>

                    </div>
                    <div className="mt-1.5 mb-1.5 ">
                        <p>Didn't have an account <Link className='text-[#fe4c4d]' to={"/register"}> Register here!!</Link></p>
                    </div>

                </div>
            </div>
        </main>
    )
}

export default VerifyEmail
