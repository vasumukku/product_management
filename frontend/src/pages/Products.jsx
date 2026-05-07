import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Products.css";
import { useNavigate } from "react-router-dom";

const PRODUCT_API = "http://localhost:5000/api/products";
const CATEGORY_API = "http://localhost:5000/api/categories";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");


  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${PRODUCT_API}/all`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


  const handleAdd = async () => {
    try {
      const body = {
        title,
        description,
        categoryId,
      };

      await axios.post(`${PRODUCT_API}/create`, body);

      fetchProducts();

      setTitle("");
      setDescription("");
      setCategoryId("");

      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="products-main-content">

  {/* HEADER */}
  <div className="products-header">
    <h2>Products</h2>

    <button
      className="products-add-btn"
      onClick={() => setShowModal(true)}
    >
      Add Product
    </button>
  </div>

  {/* PRODUCT GRID */}
  <div className="products-grid">

    {products.map((p) => (
      <div className="product-card" key={p.id}>

        {/* TOP */}
        <div className="product-top">

          <h3 className="product-title">
            {p.title}
          </h3>

          <span className="product-status">
            Active
          </span>

        </div>

        {/* DETAILS */}
        <div className="product-details">

          <p>
            <b>Description:</b> {p.description}
          </p>

          <p>
            <b>Category Id:</b> {p.categoryId}
          </p>

           <p>
    <b>Variants:</b>

    {p.variants && p.variants.length > 0 ? (
      <span className="variant-count">
        {p.variants.length} Available
      </span>
    ) : (
      <span className="no-variant">
        No Variants Added
      </span>
    )}
  </p>

        </div>

        {/* BUTTONS */}
        <div className="product-buttons">

          <button
            className="create-variant-btn"
            onClick={() => navigate(`/variants/${p.id}`)}
          >
            Create Variant
          </button>

          {/* <button
            className="view-variant-btn"
            onClick={() => navigate(`/view-variants/${p.id}`)}
          >
            View Variants
          </button> */}

          <button
            className="view-variant-btn"
            onClick={() => {

            if (p.variants.length === 0) {
              alert("No Variants Available");
              return;
            }

            navigate(`/view-variants/${p.id}`);
            }}>View Variants</button>

        </div>

      </div>
    ))}

  </div>
</div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal">

            <h3>Add Product</h3>

            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="modal-actions">

              <button onClick={handleAdd}>
                Save
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Products;