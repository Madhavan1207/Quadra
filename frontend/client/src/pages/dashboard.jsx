import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationIcon from "../components/NotificationIcon";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) navigate("/"); // redirect to login if not logged in
    else setCurrentUser(userData);
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img
              src="https://cocopalms.io/static/media/iPhone3.5316ad150371c02c97efdf608c17147c.svg"
              alt="Upcycle Logo"
              className="logo-img"
            />
            <span className="logo-text">UpCycle Connect</span>
          </div>
        </div>

        <div className="nav-center">
          <span className="nav-item active">Dashboard</span>
          <span className="nav-item" onClick={() => navigate("/list-material")}>
            Materials
          </span>
          <span className="nav-item" onClick={() => navigate("/request-material")}>
            Requests
          </span>
          <span className="nav-item" onClick={() => navigate("/impact")}>
            Impact
          </span>
        </div>

        <div className="nav-right">
          <NotificationIcon userId={currentUser._id} />
          <span className="user-name">Hi, {currentUser.name}</span>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>“Waste is only waste if we waste it.”</h1>
          <p>Connecting labs, industries, and innovators to build a sustainable future.</p>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
