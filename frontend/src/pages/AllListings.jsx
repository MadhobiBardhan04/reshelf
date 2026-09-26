import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllListings.css";

export default function AllListings() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="all_listings">
      <div className="all_listings_header">
        <h1>All Listings</h1>
        <p>Browse all available products</p>
      </div>

      <div className="product_grid">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            className="product_card"
            key={product._id}
          >
            <img src={product.image || "/placeholder.png"} alt={product.name} />

            <h4>{product.name}</h4>

            <p>BDT {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
