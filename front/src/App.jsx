import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdsList from "./components/AdsList/AdsList";
import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import CreateAd from "./components/CreateAd/CreateAd";
import LoginForm from "./components/LoginForm/LoginForm";
import Profile from "./components/ProfileForm/Profile";
import RegistrationForm from "./components/RegisterForm/RegisterForm";
import AdDetails from "./components/AdDetail/AdDetail";
import AuthService from "./services/authService"; // Import AuthService

function App() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUsername();
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  const fetchUsername = async () => {
    try {
      const profileData = await AuthService.fetchProfile(); // Use AuthService to fetch profile
      const { username } = profileData;
      console.log("Fetched username:", username);
      setUsername(username);
      localStorage.setItem("username", username);
    } catch (error) {
      console.error("Failed to fetch username:", error);
      setUsername(null);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  const handleLogin = async (loggedInUsername) => {
    setUsername(loggedInUsername);
    localStorage.setItem("username", loggedInUsername);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUsername(null); // Clear the username state
  };

  if (loading) {
    // Show a loading message while fetching the username
    return <p>Загрузка...</p>;
  }

  return (
    <Router>
      <div className="main-cont">
        <NavBar username={username} />
        <Routes>
          <Route path="/" element={<AdsList />} />
          <Route path="/create" element={<CreateAd />} />
          <Route
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/profile"
            element={
              username ? (
                <Profile onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/ads/:id" element={<AdDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
