import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()

    const { handleRegister } = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        setIsRegistering(true);
        try {
            const response = await handleRegister({ username, email, password });
            if (response?.user) {
                navigate("/verify-email", { state: { email } })
            } else {
                setErrorMessage(response?.message || "Registration failed. Please try again.")
            }
        } catch (error) {
            setErrorMessage(error?.response?.data?.message || error.message || "An error occurred during registration.")
        } finally {
            setIsRegistering(false);
        }
    }

    return (
        <main>
            <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
                <div className="box-container bg-[#ffffff] min-h-[600px] w-[420px] p-6 rounded shadow-md" >
                    <h1 className='text-[22px] font-bold'>Let's <span className='text-[#fe4c4d]'>Get Started!</span></h1>
                    <p className='font-[350]'>Provide following information to <span className='font-semibold'>Sign Up</span></p>

                    {errorMessage && (
                        <div className="mt-3 p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                            {errorMessage}
                        </div>
                    )}

                    <div className="form-container mt-6 text-gray-600 ">
                        <hr className='mb-5 ' />
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[8px]' >
                            <div className="input mt-[2px]">
                                <label htmlFor="username">Enter Username</label><br />
                                <input
                                    id='username'
                                    name='username'
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='Type Username'
                                    className='border border-gray-300 p-[5px] mt-1 w-full rounded'
                                />
                            </div>

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

                            <div className="input mt-[2px]">
                                <label htmlFor="mobileNumber">Mobile No</label><br />
                                <input
                                    id='mobileNumber'
                                    name='mobileNumber'
                                    type="tel"
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    placeholder='Type Mobile Number'
                                    className='border border-gray-300 p-[5px] mt-1 w-full rounded'
                                />
                            </div>

                            <div className="input mt-[2px]">
                                <label htmlFor="role">Your Role</label><br />
                                <select
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className='border border-gray-300 p-[5px] mt-1 w-full rounded'
                                >
                                    <option value="" disabled className=' text-gray-400'>Select a Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Supervisor">SuperVisor</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Chef">Chef</option>
                                    <option value="Waiter">Waiter</option>
                                </select>
                            </div>

                            <div className="input mt-[2px]">
                                <label htmlFor="password">Enter Password</label><br />
                                <input
                                    id='password'
                                    name='password'
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                    className='border border-gray-300 p-[5px] mt-1 w-full rounded'
                                />
                            </div>

                            <hr className='mt-[10px] mb-[10px]' />
                            <button
                                type='submit'
                                disabled={isRegistering}
                                className='bg-[#215df5] hover:bg-[#1a4cd2] transition mt-2 h-[36px] text-lg text-[#f0f0f0] p-1 rounded-[5px] disabled:opacity-50'
                            >
                                {isRegistering ? "Registering..." : "Register Now"}
                            </button>

                        </form>
                    </div>
                    <div className="mt-1.5">
                        <p>Already have an account? <Link className='text-[#fe4c4d] hover:underline' to={"/login"}>Login Now!!</Link></p>
                    </div>

                </div>
            </div>
        </main >
    )
}

export default Register
