import React from "react";
import "./SupportPages.css";
const ReportProblem = () => {
  return (
    <div className="support-page">
      <h1>Report a Problem</h1>
      <p className="support-intro">
        Found something that is not working correctly? Let us know.
      </p>

      <div className="support-card">
        <h3>Technical Issue</h3>
        <p>Report broken buttons, pages, login issues, or other errors.</p>
      </div>

      <div className="support-card">
        <h3>Incorrect Listing</h3>
        <p>Report listings with incorrect or misleading information.</p>
      </div>

      <div className="support-card">
        <h3>How We Help</h3>
        <p>Our team will review the problem and work toward a solution.</p>
      </div>
    </div>
  );
};

export default ReportProblem;
