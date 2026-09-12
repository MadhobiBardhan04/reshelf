import React from "react";
import "./SupportPages.css";
const HelpCenter = () => {
  return (
    <div className="support-page">
      <h1>Help Center</h1>
      <p className="support-intro">
        Find quick answers and helpful information about ReShelf.
      </p>

      <div className="support-card">
        <h3>Buying on ReShelf</h3>
        <p>Browse products, check details, and contact sellers easily.</p>
      </div>

      <div className="support-card">
        <h3>Selling on ReShelf</h3>
        <p>Create a listing and connect with students who need your items.</p>
      </div>

      <div className="support-card">
        <h3>Account Help</h3>
        <p>Get help with your account, profile, and other features.</p>
      </div>
    </div>
  );
};

export default HelpCenter;
