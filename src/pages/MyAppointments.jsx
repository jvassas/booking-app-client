import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { providers } = useContext(AppContext);

  return (
    <div>
      <p className="sm:ml-50 sm:pl-4 mt-4 font-medium text-3xl text-gray-700">
        My Appointments
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {providers.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border"
            key={index}
          >
            <div className="flex-1 text-md text-black p-7">
              <p>
                Dr. {item.firstName} {item.lastName}
              </p>
              {/* Address */}
              <p>
                <span>Date and Time:</span> 22, January, 2025 | 9:30 AM
              </p>
            </div>
            <div></div>
            <div className="pt-10 pr-5">
              <button className="bg-white text-red-500 border border-red-500 border-2 px-5 rounded-md font-md hidden md:block
              hover:bg-red-500 hover:text-white"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
