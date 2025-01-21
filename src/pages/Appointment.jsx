import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Appointment = () => {
  const { providerId } = useParams(); // Get ID from the URL
  const { providers, token, getProviders, backendURL } = useContext(AppContext); // Get providers from context

  const [providerInfo, setProviderInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const [providerOpenings, setProviderOpenings] = useState([]);
  const [openingIndex, setOpeningIndex] = useState(0); // Add this state to track the selected index

  const [openingTime, setOpeningTime] = useState(null);

  const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Captured ID from URL:", providerId);
    console.log("Providers from Context:", providers);

    if (providers && providerId) {
      const provider = providers.find((p) => p.providerId === providerId);
      setProviderInfo(provider || null);
    }
    setLoading(false); // Set loading to false after attempting to fetch
  }, [providers, providerId]);

  useEffect(() => {
    if (providerInfo) {
      getOpenings();
    }
  }, [providerInfo]);

  const getOpenings = async () => {
    setProviderOpenings([]); // Reset openings before populating
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDt = new Date(today);
      currentDt.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(17, 0, 0, 0);

      // Set start time to 8 AM for all days
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

        // Set 15 min intervals
        currentDt.setMinutes(currentDt.getMinutes() + 15);
      }

      setProviderOpenings((prev) => [...prev, openings]);
      console.log(openings);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      console.log("Login to book");
      return navigate("/login");
    }

    try {
      const selectedSlot = providerOpenings[openingIndex][0]; // Select the first slot of the current day's openings

      if (!selectedSlot || !openingTime) {
        console.log("No slot selected or no time chosen");
        return;
      }

      const date = selectedSlot.dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const slotTime = openingTime; // Use the selected opening time

      const { data } = await axios.post(
        backendURL + "/api/client/book-appointment",
        { providerId, slotDate, slotTime }
      );

      if (data.success) {
        console.log(data.message);
        getProviders();
        navigate("/my-appointment");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
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
        <div className="flex gap-5 items center w-full mt-4">
          {providerOpenings.length &&
            providerOpenings.map((item, index) => (
              <div
                className={`text-center py-5 min-w-16 rounded-md cursor-pointer ${
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
                onClickCapture={() => setOpeningTime(item.time)}
                className={`text-md font-semibold flex-shrink-0 px-1 py-2 rounded-md cursor-pointer  ${
                  item.time === openingTime
                    ? "bg-primary text-white"
                    : "text-black-400 border border-gray-400"
                }`}
                key={index}
                onClick={() => setOpeningTime(item.time)} // Update the selected opening time
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button
          onClick={bookAppointment}
          className="bg-primary text-white px-8 rounded-full text-sm my-10 px-10 py-2 md:block"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
