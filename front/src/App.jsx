import AdsList from "./components/AdsList/AdsList";
import "./App.css";
import { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import CreateAd from "./components/CreateAd/CreateAd";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  const [currentView, setCurrentView] = useState("AdsList");

  const showCreateForm = () => {
    setCurrentView("AdCreateForm");
  };

  const showAdsList = () => {
    setCurrentView("AdsList");
  };

  const showLoginForm = () => {
    setCurrentView("LoginView");
  };

  return (
    <div className="main-cont">
      <NavBar showCreateForm={showCreateForm} showAdsList={showAdsList} showLoginForm={showLoginForm}/>
      {currentView === "AdsList" && <AdsList />}
      {currentView === "AdCreateForm" && <CreateAd />}
      {currentView === "LoginView" && <LoginForm />}
    </div>
  );
}

export default App;
