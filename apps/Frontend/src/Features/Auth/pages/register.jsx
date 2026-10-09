import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()

    const { loading, handleRegister } = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")  //need to be added to register same for role
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handleRegister({ username, email, password });
            if (response?.user) {
                console.log("User Registered");
                navigate("/verify-email",{state:{email}})
            }
        } catch (error) {
            console.log("Some Errors :"+error)
        }
    }

    if (loading) {
        return (
            <main><h1>Loading...</h1></main>
        )
    }

    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] h-[650px] w-[420px] p-6" >
                    <h1 className='text-[22px] font-bold'>Let's <span className='text-[#fe4c4d]'>Get Started!</span></h1>
                    <p className='font-[350]'>Provide following information to <span className='font-semibold'>Sign Up</span></p>

                    <div className="form-container mt-10 text-gray-600 ">
                        <hr className='mb-5 ' />
                        <form onSubmit={(e) => { handleSubmit(e) }} className='flex flex-col gap-[8px]' >
                            <div className="input mt-[2px]">
                                <label htmlFor="username">Enter Username</label><br />
                                <input onChange={(e) => { setUsername(e.target.value) }} className='border border-gray-300 p-[5px] mt-1 w-full' type="text" placeholder='Type Username' name='username' id='username' />
                            </div>

                            <div className="input mt-[2px]">
                                <label htmlFor="email">Email Address</label><br />
                                <input onChange={(e) => { setEmail(e.target.value) }} className='border border-gray-300 p-[5px] mt-1 w-full' type="email" placeholder='Type Email' name='email' id='email' />
                            </div>

                            <div className="inpu mt-[2px]t">
                                <label htmlFor="mobileNumber">Mobile No</label><br />
                                <input onChange={(e) => { setMobileNo(e.target.value) }} className='border border-gray-300 p-[5px] mt-1 w-full' type="tel" placeholder='Type Mobile Number' name='mobileNumber' id='mobileNumber' />
                            </div>

                            <div className="input mt-[2px]">
                                <label htmlFor="role">Your Role</label><br />
                                <select value={role} onChange={(e) => { setRole(e.target.value) }} name="role" id="role" className='border border-gray-300 p-[5px] mt-1 w-full'>
                                    <option value="" disabled className=' text-gray-400'>Select a Role</option>
                                    <option value="Admin" >Admin</option>
                                    <option value="Supervisor" >SuperVisor</option>
                                    <option value="Manager" >Manager</option>
                                    <option value="Chef" >Chef</option>
                                    <option value="Waiter" >Waiter</option>
                                </select>
                            </div>

                            <div className="input mt-[2px]">
                                <label htmlFor="password">Enter Password</label><br />
                                <input onChange={(e) => { setPassword(e.target.value) }} className='border border-gray-300 p-[5px] mt-1 w-full' type="password" placeholder='Password' name='password' id='password' />
                            </div>

                            {/* <div className="input mt-[2px]">
                                <label htmlFor="confirmpassword">Confirm Password</label><br />
                                <input className='border border-gray-300 p-[5px] mt-1 w-full' type="password" placeholder='Password' name='confirmpassword' id='confirmpassword' />
                            </div> */}

                            <hr className='mt-[10px] mb-[10px]' />
                            <button type='submit' className='bg-[#215df5] mt-2 h-[36px] text-xl text-[#f0f0f0] p-1 rounded-[5px]'>Register Now</button>

                        </form>
                    </div>
                    <div className="mt-1.5">
                        <p>Already have an account <Link className='text-[#fe4c4d]' to={"/login"}>Login Now!!</Link></p>
                    </div>

                </div>
            </div>
        </main >
    )
}

export default Register
