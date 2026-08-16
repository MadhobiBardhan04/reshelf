import React from "react";
import "./StudentDiscount.css";

function StudentDiscounts() {
  return (
    <div className="student-discounts-page">
      <div className="student-discounts-container">
        <div className="discounts-header">
          <h1>Student Discounts</h1>
          <p>
            Discover student-friendly deals and save more on the things you need
            for your studies and everyday life.
          </p>
        </div>

        <div className="discounts-grid">
          <div className="discount-card">
            <div className="discount-icon">📚</div>
            <h2>Books & Textbooks</h2>
            <p>
              Find affordable pre-owned textbooks, academic books, reference
              books and study materials from other students.
            </p>
            <span>Coming Soon</span>
          </div>

          <div className="discount-card">
            <div className="discount-icon">💻</div>
            <h2>Laptops & Computers</h2>
            <p>
              Look out for student-friendly deals on laptops, computers and
              other study-related electronics.
            </p>
            <span>Coming Soon</span>
          </div>

          <div className="discount-card">
            <div className="discount-icon">📱</div>
            <h2>Phones & Tablets</h2>
            <p>
              Find useful deals on phones, tablets and accessories that can
              support your academic and everyday needs.
            </p>
            <span>Coming Soon</span>
          </div>

          <div className="discount-card">
            <div className="discount-icon">✏️</div>
            <h2>Stationery</h2>
            <p>
              Save on notebooks, pens, calculators and other essential
              stationery items.
            </p>
            <span>Coming Soon</span>
          </div>
        </div>

        <div className="discount-info">
          <h2>More Student Deals Are Coming</h2>
          <p>
            ReShelf is working towards bringing more student-friendly offers and
            discounts in the future.
          </p>

          <div className="discount-features">
            <div>
              <strong>🎓 Student Focused</strong>
              <p>Deals designed with students in mind.</p>
            </div>

            <div>
              <strong>💰 Save More</strong>
              <p>Find affordable options for everyday needs.</p>
            </div>

            <div>
              <strong>🛍️ More Categories</strong>
              <p>More offers will be added as ReShelf grows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDiscounts;
