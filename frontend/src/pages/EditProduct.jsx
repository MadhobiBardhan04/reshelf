import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, CONDITIONS } from "../data/constants";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const getOptionValue = (item) =>
  typeof item === "string" ? item : item.value || item.name;

const getOptionLabel = (item) =>
  typeof item === "string" ? item : item.label || item.name;

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    condition: "",
    specs: "",
    description: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
          credentials: "include",
        });

        const product = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(product.message || "Could not load product");
        }
        const fullDescription = product.description || "";
        const prefix = "Specifications:";

        let specs = "";
        let description = fullDescription;

        if (fullDescription.startsWith(prefix)) {
          const parts = fullDescription
            .slice(prefix.length)
            .trim()
            .split(/\r?\n\r?\n/);

          specs = parts[0] || "";
          description = parts.slice(1).join("\n\n");
        }

        if (!isMounted) return;

        setForm({
          name: product.name || "",
          category: product.category || "",
          price: product.price ?? "",
          condition: product.condition || "",
          specs,
          description,
        });

        setCurrentImage(product.image || "");
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Could not load product");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return;
    }

    const imageUrl = URL.createObjectURL(imageFile);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [imageFile]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.category ||
      !form.price ||
      !form.condition ||
      !form.specs.trim()
    ) {
      alert("Please fill in all required fields.");
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

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Could not update product");
      }

      alert("Product updated successfully!");
      navigate("/profile");
    } catch (err) {
      alert(err.message || "Could not update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="listing_message">Loading product...</p>;
  }

  if (error) {
    return (
      <div className="edit_product_page">
        <p className="listing_message listing_error">{error}</p>
        <Link to="/profile">Back to My Profile</Link>
      </div>
    );
  }

  return (
    <div className="edit_product_page">
      <div className="edit_product_header">
        <div>
          <h1>Edit Product</h1>
          <p>Update your product information</p>
        </div>

        <Link to="/profile">← Back to My Profile</Link>
      </div>

      <form className="edit_product_form" onSubmit={handleSubmit}>
        <label>
          Product Name *
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category *
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>

            {CATEGORIES.map((item) => {
              const value = getOptionValue(item);
              return (
                <option key={value} value={value}>
                  {getOptionLabel(item)}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Price (৳) *
          <input
            type="number"
            name="price"
            min="1"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Condition *
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select condition</option>

            {CONDITIONS.map((item) => {
              const value = getOptionValue(item);
              return (
                <option key={value} value={value}>
                  {getOptionLabel(item)}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Specifications *
          <textarea
            name="specs"
            rows="3"
            value={form.specs}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows="5"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <div className="edit_image_section">
          <p>Product Image</p>

          {preview || currentImage ? (
            <img
              src={preview || currentImage}
              alt="Product preview"
              className="edit_product_image"
            />
          ) : (
            <p>No image available</p>
          )}

          <label>
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                setImageFile(event.target.files?.[0] || null)
              }
            />
          </label>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
