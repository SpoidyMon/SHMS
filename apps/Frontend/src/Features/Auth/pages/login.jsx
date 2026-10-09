import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin } = useAuth()
  const [islogin, setIslogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleFPClick = (e) => {
    e.preventDefault()
    navigate("/forget-password", { state: { email } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setIslogin(true);
    try {
      const response = await handleLogin({ email, password })
      if (response?.user) {
        navigate("/", { state: { email } })
      } else {
        setErrorMessage(response?.message || "Login failed. Please check your credentials.")
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message || "An error occurred during login.")
    } finally {
      setIslogin(false)
    }
  }

  return (
    <main>
      <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
        <div className="box-container bg-[#ffffff] min-h-[430px] w-[420px] p-6 content-between rounded shadow-md" >
          <h1 className='text-[22px] font-bold'>Welcome <span className='text-[#fe4c4d]'>Back!!</span></h1>
          <p className='font-[350]'>Provide following information to <span className='font-semibold'>Login</span></p>

          {errorMessage && (
            <div className="mt-3 p-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
              {errorMessage}
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
                <p onClick={handleFPClick} className='flex justify-end cursor-pointer mt-1'>
                  <span className='text-[#fe4c4d] text-[12px] font-medium hover:underline'>Forgot Password?</span>
                </p>
              </div>

              <button
                type='submit'
                disabled={islogin}
                className='bg-[#215df5] hover:bg-[#1a4cd2] transition mt-2 h-[36px] text-lg text-[#f0f0f0] p-1 rounded-[5px] disabled:opacity-50'
              >
                {islogin ? "Logging In..." : "Login"}
              </button>
              <hr className='mt-[10px] mb-[10px]' />
            </form>

          </div>
          <div className="mt-1.5 mb-1.5 ">
            <p>Didn't have an account? <Link className='text-[#fe4c4d] hover:underline' to={"/register"}>Register here!!</Link></p>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Login
