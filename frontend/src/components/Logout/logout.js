import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ resetHeader }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      // Clear user data from localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("userName");
      localStorage.removeItem("homeContent");
      localStorage.removeItem("homeContentTimestamp");
      localStorage.removeItem("activeLink"); // Clear the active link

      // Call resetHeader to update the header state
      resetHeader();

      // Redirect to login or home page
      navigate("/login"); // Change this to your desired route
      return;
    }
    const data = await response.json();
    console.log(data.message);
  };

  return (
    <button onClick={handleLogout} className="header__logout">
      Log Out
    </button>
  );
};

export default LogoutButton;
