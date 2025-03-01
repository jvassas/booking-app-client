import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { token, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* Show main navigation only if token is true */}
      {token ? (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
          <ul className="hidden md:flex items-start gap-5 font-medium">
            <NavLink to="/">
              <li className="py-1">
                Home
                <hr className="border-none outline-none h-0.5 bg-primary w-full m-auto hidden" />
              </li>
            </NavLink>
            <NavLink to="/providers">
              <li className="py-1">
                Providers
                <hr className="border-none outline-none h-0.5 bg-primary w-full m-auto hidden" />
              </li>
            </NavLink>
            <NavLink to="/my-appointments">
              <li className="py-1">
                My Appointments
                <hr className="border-none outline-none h-0.5 bg-primary w-full m-auto hidden" />
              </li>
            </NavLink>
            <li
              onClick={logout}
              className="py-1 hover:text-black cursor-pointer"
            >
              Logout
              <hr className="border-none outline-none h-0.5 bg-primary w-full m-auto hidden" />
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
            <ul className="hidden md:flex items-start gap-5 font-medium">
              <NavLink to="/">
                <li className="py-1">
                  HOME
                  <hr className="border-none outline-none h-0.5 bg-primary w-full m-auto hidden" />
                </li>
              </NavLink>
              <NavLink to="/providers">
                <li className="py-1">
                  PROVIDERS
                  <hr className="border-none outline-none h-0.5 bg-primary w-full m-auto hidden" />
                </li>
              </NavLink>
              <NavLink to="/login">
                <li className="py-1">
                  LOGIN
                  <hr className="border-none outline-none h-0.5 bg-primary w-full m-auto hidden" />
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
