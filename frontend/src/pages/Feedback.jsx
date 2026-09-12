import React from "react";
import "./SupportPages.css";
const Feedback = () => {
  return (
    <div className="support-page">
      <h1>Feedback</h1>
      <p className="support-intro">Your feedback helps us improve ReShelf.</p>

      <div className="support-card">
        <h3>Share Your Experience</h3>
        <p>Tell us what you like about ReShelf and what can be improved.</p>
      </div>

      <div className="support-card">
        <h3>Suggest a Feature</h3>
        <p>Have an idea for a new feature? We would love to hear it.</p>
      </div>

      <div className="support-card">
        <h3>Help Us Improve</h3>
        <p>Your suggestions help us create a better student marketplace.</p>
      </div>
    </div>
  );
};

export default Feedback;
