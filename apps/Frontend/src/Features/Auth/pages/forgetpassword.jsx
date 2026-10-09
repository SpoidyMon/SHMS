import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import handleForgetPassword  from "../hooks/useAuth"

const Forgetpassword = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [email, setEmail] = useState(location.state?.email || "")
    const [isResetingPd, setIsResetingPd] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsResetingPd(true)
        try {
            const response=await handleForgetPassword({email})
            if(response){
                navigate("/reset-password",{state:{email}})
            }
        } catch (error) {
            console.log("Some Errors :" + error)
        } finally {
            setIsResetingPd(false)
        }
    }

    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] h-[400px] w-[420px] p-6 content-between" >
                    <h1 className='text-[22px] font-bold'>Forgot your <span className='text-[#fe4c4d]'>Password?</span></h1>
                    <p className='font-[350]'>An OTP will be sent to your <span className='font-semibold'>email</span> to reset your password.</p>

                    <div className="form-container mt-8 text-gray-600 ">
                        <hr className='mb-5 ' />
                        <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-[8px]' >

                            <div className="input mt-[2px]">
                                <label htmlFor="email">Email Address</label><br />
                                <input onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 p-[5px] mt-1 w-full' type="email" placeholder='Type Email' name='email' id='email' />
                            </div>
                            <button className='bg-[#215df5] mt-2 h-[36px] text-xl text-[#f0f0f0] p-1 rounded-[5px]'>{isResetingPd ? "Send OTP" : "Sending OTP"}</button>

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

export default Forgetpassword
