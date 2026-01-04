import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/impact.css";
import "../styles/back_to_dashboard.css";

function Impact() {
  const navigate = useNavigate();

  const [impactData, setImpactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch approved requests & materials to calculate impact
    const fetchImpact = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/impact");
        if (!res.ok) throw new Error("Failed to fetch impact data");
        const data = await res.json();
        setImpactData(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImpact();
  }, []);

  return (
    <div className="impact-page">
      <div className="impact-wrapper">
        <h1 className="impact-title">Environmental Impact</h1>
        <p className="impact-subtitle">
          Sustainability metrics based on approved requests
        </p>

        {loading && <p className="status-text">Loading impact data...</p>}
        {error && (
          <p className="status-text error">
            Unable to load impact data. Backend not connected.
          </p>
        )}

        {!loading && !error && impactData && (
          <>
            <div className="impact-stats">
              <div className="impact-card">
                <h2>{impactData.totalWasteReusedKg} kg</h2>
                <span>Waste Reused</span>
              </div>
              <div className="impact-card">
                <h2>{impactData.totalApprovedRequests}</h2>
                <span>Approved Requests</span>
              </div>
              <div className="impact-card">
                <h2>{impactData.activeMaterials}</h2>
                <span>Materials Exchanged</span>
              </div>
              <div className="impact-card">
                <h2>
                  {impactData.co2SavedKg} kg
                </h2>
                <span>Estimated CO₂ Reduction</span>
              </div>
            </div>

            <div className="impact-description">
              <h3>Category Breakdown</h3>
              {impactData.categoryImpact?.map((item) => (
                <p key={item.category}>
                  <strong>{item.category}:</strong> {item.wasteReusedKg} kg
                  reused, {item.co2SavedKg} kg CO₂ saved
                </p>
              ))}
            </div>
          </>
        )}

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Impact;
