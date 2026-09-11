import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStore, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ProductDetails.css";

const TABS = ["Description", "Specifications"];

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="not_found">Loading product...</p>;
  }

  if (!product) {
    return <p className="not_found">Product not found.</p>;
  }

  const {
    name,
    price,
    category,
    condition,
    specs,
    description,
    images,
  } = product;

  const nextImage = () =>
    setActiveImage((i) => (i + 1) % images.length);

  const prevImage = () =>
    setActiveImage((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="product_details">
      <div className="pd_gallery">
        <div className="pd_main_image">
          <span className="pd_image_count">
            {activeImage + 1} / {images.length}
          </span>

          {images.length > 1 && (
            <>
              <button className="pd_nav prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>

              <button className="pd_nav next" onClick={nextImage}>
                <FaChevronRight />
              </button>
            </>
          )}

          <img
            src={images[activeImage].url}
            alt={name}
          />
        </div>

        {images.length > 1 && (
          <div className="pd_thumbs">
            {images.map((image, i) => (
              <button
                key={i}
                className={`pd_thumb ${
                  i === activeImage ? "active" : ""
                }`}
                onClick={() => setActiveImage(i)}
              >
                <img src={image.url} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pd_info">
        <h1>{name}</h1>

        <p className="pd_price">BDT {price}</p>

        <div className="pd_attrs">
          <div>
            <span className="pd_attr_label">Condition</span>
            <span className="pd_attr_value">{condition}</span>
          </div>

          <div>
            <span className="pd_attr_label">Category</span>
            <span className="pd_attr_value">{category}</span>
          </div>
        </div>

        <button className="pd_add_btn">Add to cart</button>

        <div className="pd_tabs_section">
          <div className="pd_tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`pd_tab ${
                  activeTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pd_tab_content">
            {activeTab === "Specifications" && (
              <p>{specs || "No specifications provided."}</p>
            )}

            {activeTab === "Description" && (
              <p>
                {description || "No description provided."}
              </p>
            )}
          </div>
        </div>

        <div className="pd_seller">
          <div className="pd_seller_icon">
            <FaStore />
          </div>

          <div>
            <p className="pd_seller_name">Sunny Sky</p>
            <p className="pd_seller_sub">Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
}
