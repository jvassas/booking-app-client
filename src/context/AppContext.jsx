import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [providers, setProviders] = useState([]);
  const [clientData, setClientData] = useState(false);

  const getProviders = async () => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/helper/get-providers",
        {}
      );
      if (data.success) {
        setProviders(data.providers);
        console.log(data.providers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProviders();
  }, []);

  const value = {
    providers,
    getProviders,
    token,
    setToken,
    backendURL,
    clientData,
    setClientData,
  };

  useEffect(() => {
    console.log("Token from localStorage:", token);
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
