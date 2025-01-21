import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { backendURL, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendURL}/api/client/register-client`,
          { firstName, lastName, email, password }
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          throw new Error("Registration Failed");
        }
      } else {
        const { data } = await axios.post(`${backendURL}/api/client/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          throw new Error("Login Failed");
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center my-5"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-black text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Register" : "Login"}
        </p>
        <p>
          To book an appointment, please{" "}
          {state === "Sign Up" ? "register" : "login"}.
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>First Name</p>
            <input
              className="border border-gray-400 rounded w-full p-2 m-1"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
            <p>Last Name</p>
            <input
              className="border border-gray-400 rounded w-full p-2 m-1"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-gray-400 rounded w-full p-2 m-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-gray-400 rounded w-full p-2 m-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button className="bg-primary text-white px-8 rounded-full text-sm my-4 px-10 py-2 hidden md:block">
          {state === "Sign Up" ? "Register" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            <span
              onClick={() => setState("Login")}
              className="cursor-pointer underline"
            >
              Already have an account?
            </span>
          </p>
        ) : (
          <p>
            <span
              onClick={() => setState("Sign Up")}
              className="cursor-pointer underline"
            >
              Create a new Account?
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
