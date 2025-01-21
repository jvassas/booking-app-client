import { createContext, useEffect, useState } from "react";
// import { providers } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [providers, setProviders] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

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

  const value = {
    providers,
    getProviders,
    token,
    setToken,
    backendURL,
  };

  useEffect(() => {
    getProviders();
  }, []);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
