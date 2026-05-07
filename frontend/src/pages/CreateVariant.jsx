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

    color: "",
    size: "",
    ram: "",
    storage: "",
    material: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async () => {

  try {

    const data = {
      sku: form.sku,
      price: form.price,
      discount: form.discount,
      quantity: form.quantity,

      productId: productId,

      attributes: {
        color: form.color,
        size: form.size,
        ram: form.ram,
        storage: form.storage,
        material: form.material,
      },
    };

    // API CALL
    const res = await fetch(
      "http://localhost:5000/api/variants/create",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    console.log(result);

    alert("Variant Created Successfully");

    navigate(-1);

  } catch (err) {

    console.log(err);

    alert("Something Went Wrong");

  }
};
 
  

  return (
    <>
      <Navbar />

      <div className="layout">

        <Sidebar />

        <div className="variant-main-container">

          {/* HEADER */}
          <div className="variant-header">

            <h2>Create Variant</h2>

            <p>
              Add product variant details
            </p>

          </div>

          {/* FORM CARD */}
          <div className="variant-card">

            {/* BASIC DETAILS */}
            <h3 className="section-title">
              Basic Details
            </h3>

            <div className="variant-grid">

              <div className="input-group">
                <label>SKU Code</label>

                <input
                  type="text"
                  name="sku"
                  placeholder="Ex: IPHN-BLK-128"
                  value={form.sku}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Discount %</label>

                <input
                  type="number"
                  name="discount"
                  placeholder="Enter Discount"
                  value={form.discount}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Quantity</label>

                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter Quantity"
                  value={form.quantity}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* ATTRIBUTES */}
            <h3 className="section-title">
              Variant Attributes
            </h3>

            <div className="variant-grid">

              <div className="input-group">
                <label>Color</label>

                <select
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                >
                  <option value="">Select Color</option>

                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                </select>
              </div>

              <div className="input-group">
                <label>Size</label>

                <select
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                >
                  <option value="">Select Size</option>

                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>

              <div className="input-group">
                <label>RAM</label>

                <select
                  name="ram"
                  value={form.ram}
                  onChange={handleChange}
                >
                  <option value="">Select RAM</option>

                  <option value="4GB">4GB</option>
                  <option value="6GB">6GB</option>
                  <option value="8GB">8GB</option>
                  <option value="12GB">12GB</option>
                </select>
              </div>

              <div className="input-group">
                <label>Storage</label>

                <select
                  name="storage"
                  value={form.storage}
                  onChange={handleChange}
                >
                  <option value="">Select Storage</option>

                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                </select>
              </div>

              <div className="input-group">
                <label>Material</label>

                <select
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                >
                  <option value="">Select Material</option>

                  <option value="Cotton">Cotton</option>
                  <option value="Leather">Leather</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Metal">Metal</option>
                </select>
              </div>

            </div>

            {/* PREVIEW */}
            <h3 className="section-title">
              Variant Preview
            </h3>

            <div className="preview-box">

              <p>
                <b>SKU:</b> {form.sku || "-"}
              </p>

              <p>
                <b>Price:</b> ₹ {form.price || 0}
              </p>

              <p>
                <b>Discount:</b> {form.discount || 0}%
              </p>

              <p>
                <b>Quantity:</b> {form.quantity || 0}
              </p>

              <p>
                <b>Color:</b> {form.color || "-"}
              </p>

              <p>
                <b>Size:</b> {form.size || "-"}
              </p>

              <p>
                <b>RAM:</b> {form.ram || "-"}
              </p>

              <p>
                <b>Storage:</b> {form.storage || "-"}
              </p>

              <p>
                <b>Material:</b> {form.material || "-"}
              </p>

            </div>

            {/* BUTTON */}
            <button
              className="create-btn"
              onClick={handleSubmit}
            >
              Create Variant
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default CreateVariant;