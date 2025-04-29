import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../utils/api";
import { UserContext } from "../main";

const SignIn = () => {
  const { Authenticated, setAuthenticated, loading, setLoading } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setAuthenticated(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (Authenticated) return <Navigate to="/" />;

  return (
    <div className="bg-blue-300 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 relative">
        <div className="bg-yellow-50 relative px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">
            <i className="fa-solid fa-user mr-3 text-blue-500"></i>Login
          </h1>
          <form onSubmit={handleSubmit}>
            <span className="relative flex justify-between items-center">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Your Email"
                disabled={loading}
              />
              <i className="fa-solid fa-envelope absolute top-4 ml-3 text-lg"></i>
            </span>

            <span className="relative flex justify-between items-center">
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Your Password"
                disabled={loading}
              />
              <i className="fa-solid fa-key absolute top-4 ml-3 text-lg"></i>
            </span>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-center py-3 rounded text-white focus:outline-none my-1 
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-400 hover:bg-green-dark cursor-pointer"} 
              active:scale-98 transition-all ease-in-out`}
            >
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Don't have an account?
        
            <Link
              to="/signup"
              className="no-underline border-b border-blue text-blue ml-3"
            >
              Sign Up
            </Link>
         
        </div>
      </div>
    </div>
  );
};

export default SignIn;
