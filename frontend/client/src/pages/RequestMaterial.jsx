import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/requestMaterial.css";
import "../styles/back_to_dashboard.css";

function RequestMaterial() {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [requestedMaterial, setRequestedMaterial] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all materials from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/waste")
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data.filter((m) => m.status === "available")); // only available
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Search materials by title
  const handleSearch = () => {
    const filtered = materials.filter((item) =>
      item.title.toLowerCase().includes(requestedMaterial.toLowerCase())
    );
    setResults(filtered);
  };

  // Request a material
  const handleRequest = async (materialId) => {
    const dummyUserId = "64f000000000000000000001"; // Replace with actual logged-in user ID
    try {
      const res = await fetch("http://localhost:5000/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ material: materialId, requestedBy: dummyUserId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Request sent successfully!");
      } else {
        alert(data.message || "Request failed");
      }
    } catch (error) {
      console.error(error);
      alert("Request failed");
    }
  };

  return (
    <div className="request-page">
      <div className="wide-form-wrapper">
        <h1 className="page-title">Request Material</h1>

        {/* Search Form */}
        <div className="wide-form-card">
          <input
            type="text"
            placeholder="Enter material name (e.g. Plastic)"
            value={requestedMaterial}
            onChange={(e) => setRequestedMaterial(e.target.value)}
          />
          <button className="submit-btn" onClick={handleSearch}>
            Search Material
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="status-text">Loading materials...</p>}

        {/* Search Results */}
        {results.length > 0 && (
          <div className="results-section">
            <h2>Available Materials</h2>
            {results.map((item) => (
              <div className="result-card" key={item._id}>
                <h3>{item.title}</h3>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p>{item.description}</p>
                <button
                  className="submit-btn"
                  onClick={() => handleRequest(item._id)}
                >
                  Request Material
                </button>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && requestedMaterial !== "" && (
          <p className="no-results">
            No material found for "{requestedMaterial}"
          </p>
        )}

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default RequestMaterial;
