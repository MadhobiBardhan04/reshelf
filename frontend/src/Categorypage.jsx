import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "./data/products.jsx";
import "./categorypage.css";
function CategoryPage() {
  const { category } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const categoryData = {
  books: {
    name: "Books & Textbooks",
    description: "Books & Textbooks",
    subcategories: [
      "Academic Books",
      "Department Books",
      "Admission & preparation Books",
      "Notes & Study Materials",
    ],
  },

  laptops: {
    name: "Laptops & Computers",
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
    description: "Lab & Engineering Tools",
    subcategories: [
      "Electronics Components",
      "Engineering Tools",
      "Lab Equipment",
    ],
  },

  furniture: {
    name: "Furniture",
    description: "Furniture",
    subcategories: [
      "Study Tables",
      "Organizer",
    ],
  },

  gadgets: {
    name: "Gadgets & Accessories",
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
  const categoryName =currentCategory?.name || "Category Not Found";
  const products = getProducts();
  const filteredProducts = products.filter((product) => {
  const matchesCategory = product.category === category;

  const matchesSubcategory =
    selectedSubcategory === null ||
    product.subcategory === selectedSubcategory;

  return matchesCategory && matchesSubcategory;
});

  return (
    <div className="category_page">
      <h1>{categoryName}</h1>
      <p>
        Browse available {categoryName.toLowerCase()} on Reshelf.
      </p>
      <div className="related_categories">
         <p>Related categories</p>
         <div className="subcategory_list">
           <button
              className={`subcategory_button ${
              selectedSubcategory === null ? "active" : ""
              }`}
          onClick={() => setSelectedSubcategory(null)}> All
          </button>
          {currentCategory?.subcategories.map((subcategory) => (
         <button
        className={`subcategory_button ${
          selectedSubcategory === subcategory ? "active" : ""
        }`}
        key={subcategory}
        onClick={() => setSelectedSubcategory(subcategory)}>
        {subcategory}
      </button>
    ))}

  </div>
</div>
      <div className="product_grid">
        {filteredProducts.length >0 ? (
            filteredProducts.map((product) => (
                <div className="product_card" key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>BDT {product.price}</p>
                </div>
            ))
        ) : (
            <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;