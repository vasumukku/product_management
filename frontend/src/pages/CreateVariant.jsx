import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Variant.css";

function CreateVariant() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");

  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const attributes = [
    "Color",
    "Storage",
    "Material",
    "Size",
    "RAM",
    "Processor",
  ];

  const toggleAttribute = (attr) => {
    if (selectedAttributes.includes(attr)) {
      setSelectedAttributes(selectedAttributes.filter((a) => a !== attr));
    } else {
      setSelectedAttributes([...selectedAttributes, attr]);
    }
  };

  const handleSubmit = () => {
    const data = {
      productId,
      sku,
      price,
      discount,
      quantity,
      attributes: selectedAttributes,
    };

    console.log("Variant Data:", data);

    // Later API call here

    navigate(-1); // go back
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="main-content">
          <h2>Create Variant</h2>

          <div className="form-grid">
            <input
              placeholder="SKU Code"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />

            <input
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <h3>Attribute Selection</h3>

          <div className="attribute-box">
            {attributes.map((attr) => (
              <button
                key={attr}
                className={
                  selectedAttributes.includes(attr)
                    ? "attr active"
                    : "attr"
                }
                onClick={() => toggleAttribute(attr)}
              >
                {attr}
              </button>
            ))}
          </div>

          <h3>Selected Attributes</h3>

          <div className="selected-box">
            {selectedAttributes.length === 0
              ? "No values"
              : selectedAttributes.join(", ")}
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Create Variant
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateVariant;