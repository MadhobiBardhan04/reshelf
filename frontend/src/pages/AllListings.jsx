import { Link } from "react-router-dom";
import { getProducts } from "../data/products.js";
import "./AllListings.css";

export default function AllListings() {
  const products = getProducts();

  return (
    <div className="all_listings">
      <div className="all_listings_header">
        <h1>All Listings</h1>
        <p>Browse all available products</p>
      </div>

      <div className="product_grid">
        {products.map((product) => (
          <Link
            to={`/products/${product.id}`}
            className="product_card"
            key={product.id}
          >
            <img src={product.images[0]} alt={product.name} />

            <h4>{product.name}</h4>

            <p>BDT {product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
