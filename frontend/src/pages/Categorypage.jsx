import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProducts } from "../data/products.js";
import "./categorypage.css";

export default function CategoryPage() {
  const { category } = useParams();
  const products = getProducts();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const categoryData = {
    books: {
      name: "Books & Textbooks",
      productCategory: "Books",
      description: "Books & Textbooks",
      subcategories: [
        "Academic Books",
        "Department Books",
        "Admission & Preparation Books",
        "Notes & Study Materials",
      ],
    },

    laptops: {
      name: "Laptops & Computers",
      productCategory: "Laptops and Computers",
      description: "Laptops & Computers",
      subcategories: [
        "Gaming Laptops",
        "Laptops",
        "MacBooks",
        "Computer Accessories",
      ],
    },

    phones: {
      name: "Phones & Tablets",
      productCategory: "Phones & Tablets",
      description: "Phones & Tablets",
      subcategories: [
        "Android Phones",
        "iPhones",
        "Tablets",
        "Power Banks",
        "Phone Accessories",
      ],
    },

    calculators: {
      name: "Calculators",
      productCategory: "Calculators",
      description: "Calculators",
      subcategories: [
        "Scientific Calculators",
        "Graphing Calculators",
        "Financial Calculators",
        "Basic Calculators",
      ],
    },

    stationery: {
      name: "Stationery",
      productCategory: "Stationery",
      description: "Stationery",
      subcategories: [
        "Pens & Pencils",
        "Notebooks",
        "Art Supplies",
        "Files & Folders",
      ],
    },

    "lab-tools": {
      name: "Lab & Engineering Tools",
      productCategory: "Lab & Engineering Tools",
      description: "Lab & Engineering Tools",
      subcategories: [
        "Electronics Components",
        "Engineering Tools",
        "Lab Equipment",
      ],
    },

    furniture: {
      name: "Furniture",
      productCategory: "Furniture",
      description: "Furniture",
      subcategories: ["Study Tables", "Organizer"],
    },

    gadgets: {
      name: "Gadgets & Accessories",
      productCategory: "Gadgets & Accessories",
      description: "Gadgets & Accessories",
      subcategories: [
        "Headphones & Earphones",
        "Smart Watches",
        "USB Accessories",
        "Speakers",
      ],
    },
  };

  const currentCategory = categoryData[category];

  const categoryName = currentCategory?.name || "Category Not Found";

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      product.category === currentCategory?.productCategory;

    const matchesSubcategory =
      selectedSubcategory === null ||
      product.subcategory === selectedSubcategory;

    return matchesCategory && matchesSubcategory;
  });

  return (
    <div className="category_page">
      <h1>{categoryName}</h1>

      <p>Browse available {categoryName.toLowerCase()} on Reshelf.</p>

      <div className="related_categories">
        <p>Related categories</p>

        <div className="subcategory_list">
          <button
            className={`subcategory_button ${
              selectedSubcategory === null ? "active" : ""
            }`}
            onClick={() => setSelectedSubcategory(null)}
          >
            All
          </button>

          {currentCategory?.subcategories.map((subcategory) => (
            <button
              className={`subcategory_button ${
                selectedSubcategory === subcategory ? "active" : ""
              }`}
              key={subcategory}
              onClick={() => setSelectedSubcategory(subcategory)}
            >
              {subcategory}
            </button>
          ))}
        </div>
      </div>

      <div className="product_grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              className="product_card"
              key={product.id}
            >
              <img src={product.images[0]} alt={product.name} />
              <h4>{product.name}</h4>
              <p>BDT {product.price}</p>
            </Link>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
}
