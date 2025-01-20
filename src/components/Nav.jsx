import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Nav = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false)
    const [token, setToken ] = useState(true)

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to='/'>
            <li className="py-1">Home</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to='/providers'>
            <li className="py-1">Providers</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to='/contact'>
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to='/my-appointments'>
            <li className="py-1">My Appointments</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to='/my-profile'>
            <li className="py-1">My Profile</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <p onClick={() =>setToken(false)}className='hover:text-black cursor-pointer'>
            <li className="py-1">Logout</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </p>
      </ul>

      {/* <div className="flex items-center gap-4">
        {
            token 
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <div className='absolute top-0 right-1 pt-10 text-base font-small text-gray-600 z-20'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={() =>navigate('/my-appointments')}  className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={() =>navigate('/my-profile')}  className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={() =>setToken(false)}className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            : <button onClick={() =>navigate('/login')} className="bg-primary text-white px-8 rounded-md font-light hidden md:block">Create Account</button>
        }
      </div> */}
    </div>
  )
}

export default Nav
