import { useState } from "react";
import "./sell.css";
import { CATEGORIES, CONDITIONS } from "../data/constants";

export default function Sell() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    condition: "",
    specs: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const MAX_IMAGES = 6;
  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleImageUpload = (e) => {
    const remainingSlots = MAX_IMAGES - images.length;
    const files = Array.from(e.target.files).slice(0, remainingSlots);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...previews]);
    e.target.value = "";
  };
  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  const handleSubmit = () => {
    console.log("Uploaded", form);
    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.condition ||
      !form.specs
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const listing = { ...form, images, id: Date.now() };
    console.log("New listing:", listing);
    // TODO: replace with POST /api/listings once backend exists
  };

  return (
    <div className="sell_page">
      <div className="sell_form">
        <label>
          Product name
          <input
            type="text"
            value={form.name}
            onChange={handleChange("name")}
          />
        </label>

        <div className="sell_row">
          <label>
            Category
            <select value={form.category} onChange={handleChange("category")}>
              <option value="">Select</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label>
            Price
            <input
              type="number"
              value={form.price}
              onChange={handleChange("price")}
            />
          </label>
          <label>
            Condition
            <select value={form.condition} onChange={handleChange("condition")}>
              <option value="">Select</option>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Specifications *<span className="required"></span>
          <textarea
            maxLength={50}
            value={form.specs}
            onChange={handleChange("specs")}
          />
          <span className="char_count">{form.specs.length}/50</span>
        </label>

        <label>
          Description
          <textarea
            maxLength={150}
            value={form.description}
            onChange={handleChange("description")}
          />
          <span className="char_count">{form.description.length}/150</span>
        </label>
      </div>

      <div className="sell_image">
        <span className="image_label">
          Upload Images <span className="required"></span>
        </span>

        <div className="image_grid_box">
          <div className="image_grid">
            {images.map((src, i) => (
              <div className="image_thumb" key={i}>
                <img src={src} alt="" />
                <button
                  type="button"
                  className="remove_image_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveImage(i);
                  }}
                >
                  ×
                </button>
              </div>
            ))}

            {images.length < MAX_IMAGES && (
              <label className="add_more_tile">
                <span className="add_more_icon">+</span>
                <span>{images.length === 0 ? "Upload" : "Add more"}</span>
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

      <button className="upload_btn" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
}
