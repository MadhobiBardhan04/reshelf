import React from "react";
import "./guide.css";

function SellingGuide() {
  return (
    <div className="guide-page">
      <div className="guide-box">
        <h1>Selling Guide</h1>

        <p>
          Guidelines for selling items safely and effectively on ReShelf will be
          provided here.
        </p>

        <ol>
          <li>
            Provide accurate information regarding the items you want to sell.
          </li>
          <li>Provide multiple clear pictures of the products.</li>
          <li>
            Price fairly. If the product is used, the price should be adjusted
            accordingly.
          </li>
          <li>
            If an item has any damage, state it clearly in the description and
            include a close-up photo of the defect.
          </li>
          <li>
            Please provide your accurate address so that it can be picked up our
            delivery agent.
          </li>
          <li>
            Make sure to pack the product carefully, and provide necessary
            details on top of the packaging.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default SellingGuide;
