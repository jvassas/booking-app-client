import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Appointment = () => {
  const { id } = useParams(); // Get ID from the URL
  const { providers } = useContext(AppContext); // Get providers from context

  const [providerInfo, setProviderInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const [providerOpenings, setProviderOpenings] = useState([]);
  const [openingIndex, setOpeningIndex] = useState(0); // Add this state to track the selected index

  const [openingTime, setOpeningTime] = useState(null);

  const daysOfWeek = ["SUN", "MON", "TUES", "WED", "THURS", "FRI", "SAT"];

  useEffect(() => {
    console.log("Captured ID from URL:", id);
    console.log("Providers from Context:", providers);

    if (providers && id) {
      const provider = providers.find((p) => p.id === id);
      setProviderInfo(provider || null);
    }
    setLoading(false); // Set loading to false after attempting to fetch
  }, [providers, id]);

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

      if (today.getDate() === currentDt.getDate()) {
        currentDt.setHours(
          currentDt.getHours() > 10 ? currentDt.getHours() + 1 : 10
        );
        currentDt.setMinutes(currentDt.getMinutes() > 15 ? 15 : 0);
      } else {
        currentDt.setHours(8);
        currentDt.setMinutes(0);
      }

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

  if (loading) {
    return <div>Loading provider information...</div>;
  }

  if (!providerInfo) {
    return <div>No provider found for this ID.</div>;
  }

  return (
    <div>
      <h1 className="sm:ml-50 sm:pl-4 mt-4 font-medium text-3xl text-gray-700">Provider Details</h1>
      <p className="sm:ml-50 sm:pl-4 mt-4 font-medium text-lg text-gray-700">
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
                onClick={() => setOpeningIndex(index)} // Update the selected index on click
              >
                <p className="text-xs p-3">
                  {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                </p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>
        <h2 className="mt-4 font-medium text-gray-700">
          Openings
        </h2>
        <div className="flex gap-5 items-center w-full overflow-x-scroll mt-10 pb-10">
          {providerOpenings.length &&
            providerOpenings[openingIndex].map((item, index) => (
              <p onClickCapture={() =>setOpeningTime(item.time)}
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
        <button className="bg-primary text-white px-8 rounded-full text-sm my-10 px-10 py-2 hidden md:block">Book Appointment</button>
      </div>
    </div>
  );
};

export default Appointment;
