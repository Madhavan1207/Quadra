import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/listMaterial.css";
import "../styles/back_to_dashboard.css";

function ListMaterial() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pcs"); // optional: default unit
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async () => {
    if (!title || !category || !quantity || !location) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("unit", unit);
      formData.append("location", location);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("http://localhost:5000/api/waste", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to submit material");

      alert("Material submitted successfully!");

      // Reset form
      setTitle("");
      setCategory("");
      setQuantity("");
      setUnit("pcs");
      setLocation("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="list-page">
      <div className="wide-form-wrapper">
        <h1 className="page-title outside-title">List New Material</h1>

        <div className="wide-form-card">
          <input
            type="text"
            placeholder="Material Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category (Metal, Plastic, etc.)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="number"
            placeholder="Quantity"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            type="text"
            placeholder="Unit (e.g., pcs, kg)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* IMAGE UPLOAD */}
          <label className="upload-box">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            <span>{imagePreview ? "Change Image" : "Upload Material Image"}</span>
          </label>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Material
          </button>
        </div>

        {/* IMAGE PREVIEW */}
        {imagePreview && (
          <div className="floating-image-preview">
            <img src={imagePreview} alt="Material Preview" />
            <span>Material Preview</span>
          </div>
        )}

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ListMaterial;
