import React from "react";
import "./SupportPages.css";
const ContactUs = () => {
  return (
    <div className="support-page">
      <h1>Contact Us</h1>
      <p className="support-intro">
        Have a question or need help? We are here to assist you.
      </p>

      <div className="support-card">
        <h3>Email Support</h3>
        <p>Reach out to our support team with your questions.</p>
      </div>

      <div className="support-card">
        <h3>Student Support</h3>
        <p>We are happy to help you with buying, selling, or account issues.</p>
      </div>

      <div className="support-card">
        <h3>Response Time</h3>
        <p>Our team will try to respond as soon as possible.</p>
      </div>
    </div>
  );
};

export default ContactUs;
