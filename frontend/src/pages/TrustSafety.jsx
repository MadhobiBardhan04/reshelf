import React from "react";
import "./SupportPages.css";
const TrustSafety = () => {
  return (
    <div className="support-page">
      <h1>Trust & Safety</h1>
      <p className="support-intro">
        Your safety is important to us. Follow these simple guidelines for a
        safe ReShelf experience.
      </p>

      <div className="support-card">
        <h3>Buy & Sell Safely</h3>
        <p>Check product details carefully before making a purchase.</p>
      </div>

      <div className="support-card">
        <h3>Protect Your Information</h3>
        <p>Never share your password or sensitive personal information.</p>
      </div>

      <div className="support-card">
        <h3>Report Suspicious Activity</h3>
        <p>Report suspicious users or listings to help keep ReShelf safe.</p>
      </div>
    </div>
  );
};

export default TrustSafety;
