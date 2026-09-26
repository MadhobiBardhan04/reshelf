import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./AllListings.css";

export default function AllListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:4000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const trimmed = query.trim();
    setSearchParams(trimmed ? { q: trimmed } : {});
  };

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) return products;

    return products.filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.subcategory,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(trimmed);
    });
  }, [products, query]);

  return (
    <div className="all_listings">
      <div className="all_listings_header">
        <h1>All Listings</h1>
        <p>Browse all available products</p>

        <form className="listings_search_bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading ? (
        <p className="listings_message">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="listings_message">
          No products found{query ? ` for "${query}"` : ""}.
        </p>
      ) : (
        <div className="product_grid">
          {filteredProducts.map((product) => (
            <Link
              to={`/products/${product._id}`}
              className="product_card"
              key={product._id}
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
              />

              <h4>{product.name}</h4>

              <p>BDT {product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}