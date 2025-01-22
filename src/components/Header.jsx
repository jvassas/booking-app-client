import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  return (
    <div>
      <div>
        <div className="sm:ml-50 sm:pl-4 mt-4 text-center font-medium text-gray-700">
          <p className="text-4xl px-8 my-5 mx-auto"> The Appointment Hub</p>

          <p className="text-lg px-8 my-5 mx-auto">
            Find & Book Today: Login or Register to Explore Our Provider Network
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
