import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { token, setToken, clientData } = useContext(AppContext);

  const navigate = useNavigate();

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* Show navigation only if token is true */}
      {token && clientData ? (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
          <ul className="hidden md:flex items-start gap-5 font-medium">
            <NavLink to="/">
              <li className="py-1">Home</li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/providers">
              <li className="py-1">Providers</li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/contact">
              <li className="py-1">Contact</li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/my-appointments">
              <li className="py-1">My Appointments</li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
            </NavLink>
            <NavLink to="/my-profile">
              <li className="py-1">My Profile</li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
            </NavLink>
            <p onClick={logout} className="hover:text-black cursor-pointer">
              <li className="py-1">Logout</li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
            </p>
          </ul>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-8 rounded-full font-light hidden md:block"
        ></button>
      )}
    </div>
  );
};

export default Nav;
