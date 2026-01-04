import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !username || !password || !role) return setError("All fields required");

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, username, password, role }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div className="eco-register-scene">
      <div className="energy-field"></div>
      <div className="register-slab">
        <h1 className="eco-title">Join UpCycle</h1>
        <p className="eco-subtitle">Create an account and start building a sustainable future</p>

        <div className="eco-input">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Full Name</label>
          <span className="focus-line"></span>
        </div>

        <div className="eco-input">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Email Address</label>
          <span className="focus-line"></span>
        </div>

        <div className="eco-input">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Username</label>
          <span className="focus-line"></span>
        </div>

        <div className="eco-input">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label>Password</label>
          <span className="focus-line"></span>
        </div>

        <div className="eco-input">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="lab">Lab</option>
            <option value="industry">Industry</option>
          </select>
          <label>Role</label>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button className="eco-register-btn" onClick={handleRegister}>
          Create Account
        </button>

        <div className="eco-footer">
          Already have an account?{" "}
          <span className="eco-link" onClick={() => navigate("/")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
