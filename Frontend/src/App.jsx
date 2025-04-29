import { Toaster } from "react-hot-toast";
import "./App.css";
import Footer from "./components/Footer";
import Navbaar from "./components/Navbaar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./main";
import axios from "axios";
import { server } from "../utils/api";
import ErrorPage from "./Pages/ErrorPage";
import Projects from "./Pages/Projects";

function ProtectedRoute({ children }) {
  const { Authenticated } = useContext(UserContext);

  if (!Authenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function App() {
  const { setUser, Authenticated, setAuthenticated, refresh } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${server}/api/v1/user/mydetails`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data.user);
          setAuthenticated(true);
        })
        .catch((error) => {
          console.log(error);
          setAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [Authenticated, refresh]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Navbaar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
