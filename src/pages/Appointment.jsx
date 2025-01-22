import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Appointment = () => {
  const { providerId } = useParams();
  const { providers, token, getProviders, backendURL } = useContext(AppContext);

  const [providerInfo, setProviderInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [providerOpenings, setProviderOpenings] = useState([]);
  const [openingIndex, setOpeningIndex] = useState(0);
  const [openingTime, setOpeningTime] = useState(null);

  const [showModal, setShowModal] = useState(false); // Modal state
  const [confirmationLoading, setConfirmationLoading] = useState(false); // Loading state for modal confirmation

  const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];
  const navigate = useNavigate();

  useEffect(() => {
    if (providers && providerId) {
      const provider = providers.find((p) => p.providerId === providerId);
      setProviderInfo(provider || null);
    }
    setLoading(false);
  }, [providers, providerId]);

  useEffect(() => {
    if (providerInfo) {
      getOpenings();
    }
  }, [providerInfo]);

  const getOpenings = async () => {
    setProviderOpenings([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDt = new Date(today);
      currentDt.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(17, 0, 0, 0);

      currentDt.setHours(8);
      currentDt.setMinutes(0);

      let openings = [];
      while (currentDt < endTime) {
        let formattedTime = currentDt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        openings.push({
          dateTime: new Date(currentDt),
          time: formattedTime,
        });

        currentDt.setMinutes(currentDt.getMinutes() + 15);
      }

      setProviderOpenings((prev) => [...prev, openings]);
    }
  };

  const handleReserveClick = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!openingTime) {
      alert("Please select a time before reserving.");
      return;
    }

    setShowModal(true); // Show confirmation modal
  };

  const confirmReservation = async () => {
    setConfirmationLoading(true);
    const date = providerOpenings[openingIndex][0].dateTime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const openingDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        `${backendURL}/api/client/book-appointment`,
        { providerId, openingDate, openingTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        alert("Appointment successfully booked!");
        getProviders();
        navigate("/my-appointments");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("This time is unavailable");
    } finally {
      setConfirmationLoading(false);
      setShowModal(false);
    }
  };

  if (loading) {
    return <div>Loading provider information...</div>;
  }

  if (!providerInfo) {
    return <div>No provider found for this ID.</div>;
  }

  return (
    <div>
      <h1 className="sm:ml-50 sm:pl-4 mt-4 text-center font-medium text-3xl text-gray-700">
        Provider Availability
      </h1>
      <p className="sm:ml-50 sm:pl-4 mt-4 font-medium text-xl text-gray-700 font-bold">
        Dr. {providerInfo.firstName} {providerInfo.lastName}
      </p>
      <div className="sm:ml-50 sm:pl-4 mt-4 font-medium text-gray-700">
        <h2>Days</h2>
        <div className="flex gap-5 items-center w-full mt-4">
          {providerOpenings.length &&
            providerOpenings.map((item, index) => (
              <div
                className={`text-center py-5 min-w-16 rounded-md cursor-pointer shadow-lg	 ${
                  openingIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
                key={index}
                onClick={() => setOpeningIndex(index)}
              >
                <p className="text-xs p-3">
                  {item[0] ? daysOfWeek[item[0].dateTime.getDay()] : ""}
                </p>
                <p>{item[0] ? item[0].dateTime.getDate() : ""}</p>
              </div>
            ))}
        </div>
        <h2 className="mt-4 font-medium text-gray-700">Appointments</h2>
        <div className="flex gap-5 items-center w-full overflow-x-scroll mt-10 pb-10">
          {providerOpenings.length &&
            providerOpenings[openingIndex].map((item, index) => (
              <p
                onClick={() => setOpeningTime(item.time)}
                className={`text-md font-semibold flex-shrink-0 px-1 py-2 rounded-md cursor-pointer shadow-lg	 ${
                  item.time === openingTime
                    ? "bg-primary text-white"
                    : "text-black-400 border border-gray-400"
                }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button
          onClick={handleReserveClick}
          className="bg-primary text-black px-8 rounded-full text-sm my-10 px-10 py-2 md:block"
        >
          Reserve Appointment
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">
              Confirm Appointment Reservation
            </h2>
            <p className="mb-4">
              Are you sure you want to reserve this appointment?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 border rounded hover:bg-white hover:text-red-500 hover:border-red-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmReservation}
                className={`bg-primary text-white px-4 py-2 border rounded hover:bg-white hover:text-primary hover:border-primary ${
                  confirmationLoading ? "opacity-50" : ""
                }`}
                disabled={confirmationLoading}
              >
                {confirmationLoading ? "Confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
