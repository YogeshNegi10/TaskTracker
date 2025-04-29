import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { server } from "../../utils/api";
import { UserContext } from "../main";

const SignUp = () => {
  const { Authenticated, setAuthenticated, setLoading, loading } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  console.log(formData.country)

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
        `${server}/api/v1/user/register`,
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
      toast.error(error.response?.data?.message || "Something went wrong");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (Authenticated) return <Navigate to="/" />;

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col bg-blue-300">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 relative">
        <div className="bg-yellow-50 relative px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">
            <i className="fa-solid fa-user-plus mr-3 text-blue-500"></i>Sign Up
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <span className="relative flex justify-between items-center">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Name"
               
              />
              <i className="fa-solid fa-user absolute top-4 ml-3 text-lg"></i>
            </span>

            {/* Email Input */}
            <span className="relative flex justify-between items-center">
              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
               
              />
              <i className="fa-solid fa-envelope absolute top-4 ml-3 text-lg"></i>
            </span>

            {/* Password Input */}
            <span className="relative flex justify-between items-center">
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                
              />
              <i className="fa-solid fa-key absolute top-4 ml-3 text-lg"></i>
            </span>

            {/* Country Input */}
            <span className="relative flex justify-between items-center">
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4 px-10"
                name="country"
                onChange={handleChange}
                value={formData.country}
                placeholder="Country"
               
              />
              <i className="fa-solid fa-flag absolute top-4 ml-3 text-lg"></i>
            </span>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-center py-3 rounded text-white focus:outline-none my-1 ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-400 hover:bg-green-dark cursor-pointer"
              } transition-all ease-in-out active:scale-95`}
            >
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to="/signin"
            className="no-underline border-b border-blue text-blue ml-2"
          >
            Log In
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUp;
