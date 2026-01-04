import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setIsEntering(true);

    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setIsEntering(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.data));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed");
      setIsEntering(false);
    }
  };

  return (
    <div className={`eco-login-scene ${isEntering ? "entering" : ""}`}>
      <div className="energy-field"></div>

      <div className={`login-slab ${isEntering ? "slab-exit" : ""}`}>
        <h1 className="eco-title">UpCycle Connect</h1>
        <p className="eco-subtitle">Where waste finds a second life</p>

        <div className="eco-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isEntering}
          />
          <label>Email</label>
          <span className="focus-line"></span>
        </div>

        <div className="eco-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isEntering}
          />
          <label>Password</label>
          <span className="focus-line"></span>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button className="eco-login-btn" onClick={handleLogin} disabled={isEntering}>
          {isEntering ? "Entering..." : "Enter Platform"}
        </button>

        <div className="eco-footer">
          <span>New here?</span>
          <span className="eco-link" onClick={() => !isEntering && navigate("/register")}>
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

