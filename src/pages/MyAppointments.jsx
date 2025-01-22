import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MyAppointments = () => {
  const { providers } = useContext(AppContext);
  const { backendURL, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Format Date
  const openingDtFormatter = (openingDate) => {
    const [day, month, year] = openingDate.split("_").map(Number);
    const monthName = months[month - 1]; // Subtract 1 because array is 0-indexed
    return `${monthName} ${day}, ${year}`;
  };

  // Format time
  const removeLeadingZero = (timeString) => {
    return timeString.replace(/^0/, "");
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendURL + "/api/client/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/client/cancel-appointment",
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        console.log("Appointment canceled successfully.");
        getUserAppointments();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="sm:ml-50 sm:pl-4 mt-4 font-medium text-3xl text-gray-700">
        My Appointments
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {/* Filter out completed appointments before rendering */}
        {appointments
          .filter((item) => !item.completed) // Exclude completed appointments
          .map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border"
              key={index}
            >
              <div className="flex-1 text-md text-black p-7">
                <p>
                  Dr. {item.providerData.firstName} {item.providerData.lastName}
                </p>
                <p>
                  <span>Date and Time:</span>{" "}
                  {openingDtFormatter(item.openingDate)} at{" "}
                  {removeLeadingZero(item.openingTime)}
                </p>
              </div>

              {!item.cancelled && !item.completed && (
                <div className="pt-10 pr-5">
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-white text-red-500 border border-red-500 border-2 px-5 rounded-md font-md hidden md:block hover:bg-red-500 hover:text-white"
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
