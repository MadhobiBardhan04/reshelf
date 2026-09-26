import { useEffect, useState } from "react";
import "./products.css";

const API_URL = "http://localhost:4000";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Server error:", data);
          return;
        }

        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Fetch products error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Products</h1>
        <p>Manage products listed on the marketplace.</p>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Condition</th>
              <th>Category</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="product-info">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                    <div>
                      <div className="product-title">{product.name}</div>

                      <div className="product-subcategory">
                        {product.subcategory}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  {product.seller?.displayName ||
                    product.seller?.username ||
                    "Unknown"}
                </td>

                <td>৳{product.price?.toLocaleString()}</td>

                <td>{product.condition}</td>

                <td>{product.category}</td>
                <td>{product.availabilityStatus}</td>

                <td>
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
