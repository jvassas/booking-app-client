import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProviderCard = () => {
  const navigate = useNavigate();
  const { providers, getProviders } = useContext(AppContext);

  useEffect(() => {
    getProviders; // Ensure getProviders is invoked
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 my-20 text-black-900 md:mx-10">
      <h1 className="text-center text-3xl font-med">Featured Providers</h1>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {Array.isArray(providers) &&
          providers.slice(0, 4).map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item.providerId}`)}
              className="border border-black-400 overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all"
              key={index}
            >
              {/* Random doctor image */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-md text-center text-gray-800">
                  <p>
                    Dr. {item.firstName} {item.lastName}
                  </p>
                  <div>
                    <p className="text-green-600">Available</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          navigate("/providers");
          scrollTo(0, 0);
        }}
        className="bg-primary text-white px-8 rounded-full font-light hidden md:block"
      >
        All Providers
      </button>
    </div>
  );
};

export default ProviderCard;
