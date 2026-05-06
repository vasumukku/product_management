import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Variant.css";

function CreateVariant() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    sku: "",
    price: "",
    discount: "",
    quantity: "",
  });

  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const attributes = ["Color", "Size", "RAM", "Storage", "Material"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      ...form,
      attributes: selectedAttributes,
    };

    console.log(data);
    navigate(-1);
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="variant-container">
          <h2>Create Variant</h2>

          {/* INPUT BOXES */}
          <div className="form-box">
            <input name="sku" placeholder="SKU" onChange={handleChange} />
            <input name="price" placeholder="Price" onChange={handleChange} />
            <input name="discount" placeholder="Discount" onChange={handleChange} />
            <input name="quantity" placeholder="Quantity" onChange={handleChange} />
          </div>

          {/* ATTRIBUTES */}
          <h3>Attributes</h3>

          <div className="attr-box">
            {attributes.map((attr) => (
              <div
                key={attr}
                className={`box ${selectedAttributes.includes(attr) ? "active" : ""}`}
                onClick={() => toggleAttribute(attr)}
              >
                {attr}
              </div>
            ))}
          </div>

          {/* SELECTED */}
          <h3>Selected</h3>
          <div className="selected-box">
            {selectedAttributes.length === 0
              ? "No selection"
              : selectedAttributes.join(", ")}
          </div>

          {/* BUTTON */}
          <button className="btn" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateVariant;