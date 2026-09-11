import React from "react";
import "./guide.css";

function BuyingGuide() {
  return (
    <div className="guide-page">
      <div className="guide-box">
        <h1>Buying Guide</h1>

        <p>
          Guidelines for buying items safely and confidently on ReShelf will be
          provided here.
        </p>

        <ol>
          <li>
            Kindly check all product details before placing an order. Read the
            description carefully and check pictures incase there is any defect.
          </li>
          <li>
            Our delivery agent will directly pick the products from the seller
            and deliver it to you.
          </li>
          <li>
            Inside Dhaka the delivery charge is 80tk and delivery time is 2-3
            days.
          </li>
          <li>
            Outside Dhaka the delivery charge is 120tk and delivery time is 3-5
            days.
          </li>
          <li>
            Please check the product while the delivery man is present. No
            return, cancellations will be allowed after that.
          </li>
          <li>
            If the product has any defect that was not mentioned, or the wrong
            product was delivered, only then return/ cancellation will be
            considered.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default BuyingGuide;
