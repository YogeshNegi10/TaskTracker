import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

export const UserContext = createContext();

const AppWrapper = () => {
  const [Authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');

  return (
    <UserContext.Provider
      value={{
        Authenticated,
        setAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        setRefresh,
        refresh
      }}
    >
      <App />
    </UserContext.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
