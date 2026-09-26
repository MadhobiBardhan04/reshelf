import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sell.css";
import { CATEGORIES, CONDITIONS } from "../data/constants";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const MAX_IMAGES = 6;

const INITIAL_FORM = {
  name: "",
  category: "",
  price: "",
  condition: "",
  specs: "",
  description: "",
};

export default function Sell() {
  const [isLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const [form, setForm] = useState(INITIAL_FORM);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      images.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [images]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - imageFiles.length;

    if (remainingSlots <= 0) {
      setErrorMessage(`You can upload up to ${MAX_IMAGES} images.`);
      e.target.value = "";
      return;
    }

    const files = selectedFiles.slice(0, remainingSlots);

    if (selectedFiles.length > remainingSlots) {
      setErrorMessage(`Only ${MAX_IMAGES} images are allowed.`);
    } else {
      setErrorMessage("");
    }

    const previews = files.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...files]);
    setImages((prev) => [...prev, ...previews]);
    setSuccessMessage("");

    e.target.value = "";
  };

  const handleRemoveImage = (indexToRemove) => {
    const imageToRemove = images[indexToRemove];

    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove);
    }

    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));

    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (
      !form.name.trim() ||
      !form.category ||
      !form.price ||
      !form.condition ||
      !form.specs.trim()
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (Number(form.price) <= 0) {
      setErrorMessage("Price must be greater than 0.");
      return;
    }

    if (imageFiles.length === 0) {
      setErrorMessage("Please upload at least one product image.");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name.trim());
    formData.append("category", form.category);
    formData.append("subcategory", form.category);
    formData.append("price", form.price);
    formData.append("condition", form.condition);

    const fullDescription = [
      `Specifications: ${form.specs.trim()}`,
      form.description.trim(),
    ]
      .filter(Boolean)
      .join("\n\n");

    formData.append("description", fullDescription);

    // Backend currently receives one image file.
    formData.append("image", imageFiles[0]);

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            `Upload failed (${response.status})`,
        );
      }

      setSuccessMessage("Product uploaded successfully!");

      setForm(INITIAL_FORM);
      setImages([]);
      setImageFiles([]);
    } catch (error) {
      console.error("Product upload error:", error);

      setErrorMessage(
        error.message || "Product upload failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="not_signin">
        <h2>Sign in to sell an item</h2>
        <p>You need an account to list a product on ReShelf.</p>

        <Link to="/auth" className="sell_sign_in_btn">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="sell_page">
      {successMessage && (
        <div className="sell_success_message" role="status">
          <span className="success_icon">✓</span>

          <div className="success_text">
            <strong>{successMessage}</strong>
            <p>Your item has been added to ReShelf.</p>
          </div>

          <button
            type="button"
            className="message_close_btn"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss success message"
          >
            ×
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="sell_error_message" role="alert">
          <span>{errorMessage}</span>

          <button
            type="button"
            className="message_close_btn"
            onClick={() => setErrorMessage("")}
            aria-label="Dismiss error message"
          >
            ×
          </button>
        </div>
      )}

      <form className="sell_form" onSubmit={handleSubmit}>
        <label>
          Product name *
          <input
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Enter product name"
            required
          />
        </label>

        <div className="sell_row">
          <label>
            Category *
            <select
              value={form.category}
              onChange={handleChange("category")}
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price (৳) *
            <input
              type="number"
              min="1"
              value={form.price}
              onChange={handleChange("price")}
              placeholder="Enter price"
              required
            />
          </label>

          <label>
            Condition *
            <select
              value={form.condition}
              onChange={handleChange("condition")}
              required
            >
              <option value="">Select condition</option>
              {CONDITIONS.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Specifications *
          <textarea
            maxLength={50}
            value={form.specs}
            onChange={handleChange("specs")}
            placeholder="Example: Blue, 2 years used"
            required
          />
          <span className="char_count">{form.specs.length}/50</span>
        </label>

        <label>
          Description
          <textarea
            maxLength={150}
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Add more details about your product"
          />
          <span className="char_count">{form.description.length}/150</span>
        </label>

        <div className="sell_image">
          <span className="image_label">
            Upload Images * (Up to {MAX_IMAGES})
          </span>

          <div className="image_grid_box">
            <div className="image_grid">
              {images.map((src, index) => (
                <div className="image_thumb" key={src}>
                  <img src={src} alt={`Product preview ${index + 1}`} />

                  <button
                    type="button"
                    className="remove_image_btn"
                    onClick={() => handleRemoveImage(index)}
                    aria-label={`Remove image ${index + 1}`}
                  >
                    ×
                  </button>
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <label className="add_more_tile">
                  <span className="add_more_icon">+</span>
                  <span>
                    {images.length === 0 ? "Upload image" : "Add more"}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <span className="image_count">
            {images.length} / {MAX_IMAGES}
          </span>
        </div>

        <button type="submit" className="upload_btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
