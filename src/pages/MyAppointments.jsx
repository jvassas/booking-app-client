import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MyAppointments = () => {
  const { providers } = useContext(AppContext);
  const { backendURL, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Selected appointment for cancellation

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
    } finally {
      setShowModal(false); // Close modal after cancellation
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const handleCancelClick = (appointmentId) => {
    setSelectedAppointment(appointmentId); // Store the appointment ID
    setShowModal(true); // Show the confirmation modal
  };

  return (
    <div>
      {/* Show my appointments only if token is true */}
      {token && (
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
                  className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-2 border rounded-md shadow-lg"
                  key={index}
                >
                  <div className="flex-1 text-md text-black p-7">
                    <p>
                      Dr. {item.providerData.firstName}{" "}
                      {item.providerData.lastName}
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
                        onClick={() => handleCancelClick(item._id)}
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
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-medium text-gray-700">
              Are you sure you want to cancel this appointment?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => cancelAppointment(selectedAppointment)}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Cancel Appointment
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
