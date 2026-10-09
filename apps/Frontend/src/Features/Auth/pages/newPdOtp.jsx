import { Link } from 'react-router'

const newPdOtp = () => {
    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] h-[540px] w-[420px] p-6 content-between" >
                    <h1 className='text-[22px] font-bold'>Reset <span className='text-[#fe4c4d]'>Password!!</span></h1>
                    <p className='font-[350]'>We send an otp to <span className='font-semibold'> Mrunaljagtap6546@gmail.com </span><br />Enter it below to reset password</p>

                    <div className="form-container mt-6 text-gray-600 ">
                        <hr className='mb-5 ' />
                        <form className='flex flex-col gap-[8px]' >
                            <p className="mt-2 text-sm text-gray-500"> Enter the 6-digit code sent to your email. </p>
                            <div className="flex justify-center gap-3 mt-4">
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

                            <div className="input mt-[2px]">
                                <label htmlFor="newPassword" className='text-sm text-gray-500'>Enter New Password</label><br />
                                <input className='border border-gray-300 p-[5px] mt-2 w-full' type="password" placeholder='Password' name='newPassword' id='newPassword' />
                            </div>

                            <button className='bg-[#215df5] mt-2 h-[36px] text-xl text-[#f0f0f0] p-1 rounded-[5px]'>Reset password</button>
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

export default newPdOtp
