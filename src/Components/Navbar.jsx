import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const links = (
    <>
      <li className="font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-green-300 border border-green-500 px-3 py-1 rounded-lg" : "px-3 py-1 rounded-lg"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li className="font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-green-300 border border-green-500 px-3 py-1 rounded-lg" : "px-3 py-1 rounded-lg"
          }
          to="/schedule"
        >
          Schedule
        </NavLink>
      </li>
      <li className="font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-green-300 border border-green-500 px-3 py-1 rounded-lg" : "px-3 py-1 rounded-lg"
          }
          to="/budget"
        >
          Budget Tracker
        </NavLink>
      </li>
      <li className="font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-green-300 border border-green-500 px-3 py-1 rounded-lg" : "px-3 py-1 rounded-lg"
          }
          to="/studyPlan"
        >
          Study Planner
        </NavLink>
      </li>
      <li className="font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-green-300 border border-green-500 px-3 py-1 rounded-lg" : "px-3 py-1 rounded-lg"
          }
          to="/notes"
        >
          Note
        </NavLink>
      </li>
      <li className="font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-green-300 border border-green-500 px-3 py-1 rounded-lg" : "px-3 py-1 rounded-lg"
          }
          to="/dictionary"
        >
          Dictionary
        </NavLink>
      </li>
      <li className="font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-green-300 border border-green-500 px-3 py-1 rounded-lg" : "px-3 py-1 rounded-lg"
          }
          to="/translator"
        >
          Translator
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full shadow bg-base-200">
      <div className="navbar px-6 py-3">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-56 p-3 shadow bg-base-100 rounded-lg"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="text-2xl md:text-3xl font-bold">
            Edu<span className="text-orange-500">Mate</span>
          </Link>
        </div>

        {/* Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2">{links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          <Link className="btn border border-green-500 px-4 py-2">Login</Link>
          <Link className="btn border border-green-500 px-4 py-2">Registration</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
