import React from 'react'
import { Link } from 'react-router'

const login = () => {
  return (
    <main>
      <div className='h-screen w-full bg-[#c5bee5] justify-items-center content-center'>
        <div className="box-container bg-[#ffffff] h-[400px] w-[420px] p-6 content-between" >
          <h1 className='text-[22px] font-bold'>Welcome <span className='text-[#fe4c4d]'>Back!!</span></h1>
          <p className='font-[350]'>Provide following information to <span className='font-semibold'>Login</span></p>

          <div className="form-container mt-10 text-gray-600 ">
            <hr className='mb-5 ' />
            <form className='flex flex-col gap-[8px]' >

              <div className="input mt-[2px]">
                <label htmlFor="email">Email Address</label><br />
                <input className='border border-gray-300 p-[5px] mt-1 w-full' type="email" placeholder='Type Email' name='email' id='email' />
              </div>

              {/* <div className="input mt-[2px]">
                <label htmlFor="role">Your Role</label><br />
                <select name="role" id="role" className='border border-gray-300 p-[5px] mt-1 w-full'>
                  <option value="" selected className=' text-gray-400'>Select a Role</option>
                  <option value="Admin" >Admin</option>
                  <option value="Supervisor" >SuperVisor</option>
                  <option value="Manager" >Manager</option>
                  <option value="Chef" >Chef</option>
                  <option value="Waiter" >Waiter</option>
                </select>
              </div> */}

              <div className="input mt-[2px]">
                <label htmlFor="password">Enter Password</label><br />
                <input className='border border-gray-300 p-[5px] mt-1 w-full' type="password" placeholder='Password' name='password' id='password' />
                <p className='flex  justify-end'><Link className='text-[#fe4c4d] text-[12px] font-medium ' to={"/forget-password"}>Forgot Password?</Link></p>
              </div>

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

export default login
