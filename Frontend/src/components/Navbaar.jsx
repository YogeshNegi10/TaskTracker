import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../main";
import axios from "axios";
import { server } from "../../utils/api";
import toast from "react-hot-toast";
import { Tooltip as ReactTooltip } from "react-tooltip";
import TopUpModal from "./TopUpModal";

const Navbaar = () => {
  const navigate = useNavigate();
  const { Authenticated, setAuthenticated, user, setUser, loading } =
    useContext(UserContext)

  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  const handleTopUp = async () => {
    try {

      
      if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 0) {
        toast.error("Please enter a valid amount.");
        return;
      }

      const { data } = await axios.post(
        `${server}/api/v1/user/top-up`,
        { credits: Number(topUpAmount) },
        { withCredentials: true }
      );

      toast.success(data.message);

      setUser((prev) => ({
        ...prev,
        credits: (prev.credits || 0) + Number(topUpAmount),
      }));

      setShowTopUpModal(false);
      setTopUpAmount("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Top-up failed.");
    }finally{
     
    }
  };

  useEffect(() => {
    if (showTopUpModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showTopUpModal]);

  return (
    <>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between flex-col gap-2 md:flex-row items-center">
        {/* Logo */}
        <div className="text-md md:text-2xl font-bold text-blue-600">
          <Link to="/">
            <i className="fa-solid fa-book"></i> Task Tracker
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500 text-2xl" : ""
                } text-2xl hover:text-blue-500`
              }
            >
              <i
                className="fa-solid fa-house"
                data-tooltip-id="home"
                data-tooltip-content="Home"
              ></i>
              <ReactTooltip style={{ fontSize: 12 }} id="home" />
            </NavLink>
          </li>

          {Authenticated && (
            <>
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-blue-500 text-2xl" : ""
                    } text-2xl hover:text-blue-500`
                  }
                >
                  <i
                    className="fa-solid fa-list-check"
                    data-tooltip-id="Tasks"
                    data-tooltip-content="Tasks"
                  ></i>
                  <ReactTooltip style={{ fontSize: 12 }} id="Tasks" />
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-blue-500 text-2xl" : ""
                    } text-2xl hover:text-blue-500`
                  }
                >
                  <i
                    className="fa-solid fa-circle-user relative"
                    data-tooltip-id="profile"
                    data-tooltip-content="Profile"
                  ></i>
                  <ReactTooltip style={{ fontSize: 12 }} id="profile" />
                  {!user?.emailVerified && (
                    <i className="fa-solid fa-star text-red-500 text-[10px] absolute"></i>
                  )}
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Credit Balance + Login/Logout */}
        <div className="flex items-center space-x-6">
          {Authenticated && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-gray-700 text-sm font-semibold">
              <i className="fa-solid fa-coins text-yellow-500"></i>
              {user?.credits !== undefined
                ? `${user.credits} Credits`
                : "0 Credits"}

              <button
                onClick={() => setShowTopUpModal(true)}
                className="ml-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
              >
               Top-Up
              </button>
            </div>
          )}

          {Authenticated ? (
            <button
              onClick={handleLogout}
              className="hover:underline cursor-pointer hover:text-blue-500"
            >
              <i
                className="fa-solid fa-right-from-bracket text-lg"
                data-tooltip-id="logout"
                data-tooltip-content="Logout!"
              ></i>
              <ReactTooltip style={{ fontSize: 12 }} id="logout" />
            </button>
          ) : (
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : ""
                } hover:underline cursor-pointer hover:text-blue-500`
              }
            >
              <i
                className="fa-solid fa-key"
                data-tooltip-id="login"
                data-tooltip-content="Login!"
              ></i>
              <ReactTooltip style={{ fontSize: 12 }} id="login" place="left" />
            </NavLink>
          )}

          {!Authenticated && (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : ""
                } hover:underline cursor-pointer hover:text-blue-500`
              }
            >
              {!loading && (
                <>
                  <i
                    className="fa-solid fa-user-plus text-lg"
                    data-tooltip-id="signUp"
                    data-tooltip-content="SignUp!"
                  ></i>
                  <ReactTooltip style={{ fontSize: 12 }} id="signUp" />
                </>
              )}
            </NavLink>
          )}
        </div>
      </nav>

      {/* Top-Up Modal */}
      {showTopUpModal && (
        <TopUpModal
          topUpAmount={topUpAmount}
          setTopUpAmount={setTopUpAmount}
          onClose={() => {
            setShowTopUpModal(false);
            setTopUpAmount("");
          }}
          handleTopUp={handleTopUp}
        />
      )}
    </>
  );
};

export default Navbaar;
