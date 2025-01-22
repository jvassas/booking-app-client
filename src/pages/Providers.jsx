import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Providers = () => {
  const navigate = useNavigate();

  const { providers, getProviders } = useContext(AppContext);

  useEffect(() => {
    getProviders;
  });

  return (
    <div>
      <div>
        <h1 className="sm:ml-50 sm:pl-4 mt-4 font-medium text-3xl text-gray-700 text-center">
          List of Providers
        </h1>
        <p className="sm:ml-50 sm:pl-3 mt-4 font-medium text-md text-gray-700 text-gray">
          Choose a Provider to Get Started
        </p>
      </div>
      <div>
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 py- sm:px-0">
          {providers.slice(0, 10).map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item.providerId}`)}
              className="border border-1 rounded-md border-black-600 shadow-lg overflow-hidden cursor-pointer hover:translate-y-[5px] transition-all hover:shadow-primary"
              key={index}
            >
              {/* Random doctor image */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-lg text-center text-gray-800">
                  <p>
                    Dr. {item.firstName} {item.lastName}
                  </p>

                  <div>
                    <p></p>
                    <p className="text-green-600">Available</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Providers;
