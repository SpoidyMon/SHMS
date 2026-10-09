import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth()
  const [islogin, setIslogin] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleFPCLick=async(e)=>{
        e.preventDefault()
        navigate("/forget-password",{state:{email}})
    }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIslogin(true);
    try {
      const response = await handleLogin({ email, password })
      if (response?.user) {
        console.log("User logged in successfully");
        navigate("/", { state: { email } })
      }
    } catch (error) {
      console.log("Some Errors :" + error)
    } finally {
      setIslogin(false)
    }
  }


  return (
    <main>
      <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
        <div className="box-container bg-[#ffffff] h-[430px] w-[420px] p-6 content-between" >
          <h1 className='text-[22px] font-bold'>Welcome <span className='text-[#fe4c4d]'>Back!!</span></h1>
          <p className='font-[350]'>Provide following information to <span className='font-semibold'>Login</span></p>

          <div className="form-container mt-10 text-gray-600 ">
            <hr className='mb-5 ' />
            <form onSubmit={(e) => { handleSubmit(e) }} className='flex flex-col gap-[8px]' >

              <div className="input mt-[2px]">
                <label htmlFor="email">Email Address</label><br />
                <input onChange={(e) => { setEmail(e.target.value) }} className='border border-gray-300 p-[5px] mt-1 w-full' type="email" placeholder='Type Email' name='email' id='email' />
              </div>

              <div className="input mt-[2px]">
                <label htmlFor="password">Enter Password</label><br />
                <input onChange={(e) => { setPassword(e.target.value) }} className='border border-gray-300 p-[5px] mt-1 w-full' type="password" placeholder='Password' name='password' id='password' />
                <p onClick={(e) => { handleFPCLick(e) }} className='flex  justify-end'><span className='text-[#fe4c4d] text-[12px] font-medium ' >Forgot Password?</span></p>
              </div>

              <button type='submit' className='bg-[#215df5] mt-2 h-[36px] text-xl text-[#f0f0f0] p-1 rounded-[5px]'>{islogin ? "Logging In..." : "Login"}</button>
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

export default Login
