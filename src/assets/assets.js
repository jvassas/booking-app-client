export const providers = [
  {
    providerId: "10",
    firstName: "John",
    lastName: "Dutton",
    username: "jdutton1",
    pw: "",
  },
  {
    providerId: "20",
    firstName: "Tommy",
    lastName: "Shelby",
    username: "tshelb",
    pw: "",
  },
  {
    providerId: "30",
    firstName: "Marty",
    lastName: "Byrde",
    username: "byrdem",
    pw: "",
  },
  {
    providerId: "40",
    firstName: "Claire",
    lastName: "Underwood",
    username: "underwoodclaire",
    pw: "",
  },
  {
    providerId: "50",
    firstName: "Michael",
    lastName: "Scott",
    username: "michsc",
    pw: "",
  },
  {
    providerId: "60",
    firstName: "Walter",
    lastName: "White",
    username: "walterw",
    pw: "",
  },
  {
    providerId: "70",
    firstName: "Phil",
    lastName: "Dunphy",
    username: "pd12",
    pw: "",
  },
  {
    providerId: "80",
    firstName: "Myles",
    lastName: "Garrett",
    username: "mgarrett95",
    pw: "",
  },
  {
    providerId: "90",
    firstName: "Ruth",
    lastName: "Langmore",
    username: "rlang",
    pw: "",
  },
  {
    providerId: "100",
    firstName: "Evan",
    lastName: "Mobley",
    username: "evmob4",
    pw: "",
  },
];

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Appointment = () => {
//   const { id } = useParams(); // Get ID from the URL
//   const { providers } = useContext(AppContext); // Get providers from context

//   const [providerInfo, setProviderInfo] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state

//   const [providerOpenings, setProviderOpenings] = useState([]);
//   const [openingsIndex, setOpeningsIndex] = useState(0);
//   const [openingTime, setOpeningTime] = useState("");

//   useEffect(() => {
//     console.log("Captured ID from URL:", id);
//     console.log("Providers from Context:", providers);

//     if (providers && id) {
//       const provider = providers.find((p) => p.id === id);
//       setProviderInfo(provider || null);
//     }
//     setLoading(false); // Set loading to false after attempting to fetch
//   }, [providers, id]);

//   if (loading) {
//     return <div>Loading provider information...</div>;
//   }
//   if (!providerInfo) {
//     return <div>No provider found for this ID.</div>;
//   }

//   const getOpenings = async () => {
//     setProviderOpenings([]);

//     const today = new Date();
//     for (let i = 0; i < 7; i++) {
//       let currentDt = new Date(today);
//       currentDt.setDate(today.getDate() + i);

//       // Setting 5PM COB
//       let endTime = new Date();
//       endTime.setDate(today.getDate() + i);
//       endTime.setHours(20, 0, 0, 0);

//       // Setting hours
//       if (today.getDate() === currentDt.getDate()) {
//         currentDt.setHours(
//           currentDt.getHours() > 10 ? currentDt.getHours() + 1 : 10
//         );
//         currentDt.setMinutes(currentDt.getMinutes > 15 ? 15 : 0);
//       } else {
//         currentDt.setHours(8);
//         currentDt.setMinutes(0);
//       }

//       let openings = [];

//       while (currentDt < endTime) {
//         let formattedTime = currentDt.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         // Add opening to arr
//         openings.push({
//           dateTime: new Date(currentDt),
//           time: formattedTime,
//         });

//         // Increment opening by 15min
//         currentDt.setMinutes(currentDt.getMinutes() + 15);
//       }

//       setProviderOpenings((prev) => [...prev, openings]);
//     }
//   };

//   useEffect(() => {
//     getOpenings();
//   },
//     [providerInfo]);

//   useEffect(() => {
//     console.log(openings);
//   },
//     [openings]);

//   return (
//     <div>
//       <h1>Provider Details</h1>
//       <p>
//         Dr. {providerInfo.firstName} {providerInfo.lastName}
//       </p>
//     </div>
//   );
// };

// export default Appointment;
