import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {

      const links =<>

               <li className='font-medium '><NavLink className={({isActive})=> isActive ? "bg-green-300 border border-green-500" :"" } to='/'>Home</NavLink></li>
               <li className='font-medium '><NavLink className={({isActive})=> isActive ? "bg-green-300 border border-green-500" :"" } to='schedule'>Schedule</NavLink></li>
               <li className='font-medium '><NavLink className={({isActive})=> isActive ? "bg-green-300 border border-green-500" :"" } to='budget'>Budget Tracker</NavLink></li>
               <li className='font-medium '><NavLink className={({isActive})=> isActive ? "bg-green-300 border border-green-500" :"" } to='studyPlan'>Study Planer</NavLink></li>
               <li className='font-medium '><NavLink className={({isActive})=> isActive ? "bg-green-300 border border-green-500" :"" } to='note'>Note</NavLink></li>
               <li className='font-medium '><NavLink className={({isActive})=> isActive ? "bg-green-300 border border-green-500" :"" } to='dictionary'>Dictionary</NavLink></li>
               <li className='font-medium '><NavLink className={({isActive})=> isActive ? "bg-green-300 border border-green-500" :"" } to='translator'>Translator</NavLink></li>
      </>


    return (
        <div>
            <div className="navbar bg-base-200 shadow-sm px-10 py-4  top-0 fixed z-50">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {
            links
        }
      </ul>
    </div>
    <h2 className="btn btn-ghost text-3xl font-bold text-black">Edu<span className='text-orange-500'>Mate</span></h2>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end gap-2">
    <Link className="btn border border-green-500">Login</Link>
    <Link className="btn border border-green-500">Registration</Link>
  </div>
</div>
        </div>
    );
};

export default Navbar;