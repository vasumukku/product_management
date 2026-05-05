import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Products.css";
import { useNavigate } from "react-router-dom";


const CATEGORY_API = "http://localhost:5000/api/categories";

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

 
  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleAdd = () => {
    if (!name || !categoryId) return;

    const selectedCategory = categories.find(
      (c) => c.id === Number(categoryId)
    );

    const newProduct = {
      id: Date.now(),
      name,
      categoryName: selectedCategory?.name,
      description,
    };

    setProducts([...products, newProduct]);

    setName("");
    setCategoryId("");
    setDescription("");
    setShowModal(false);
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="main-content">
          {/* Header */}
          <div className="header">
            <h2>Products</h2>

            <button className="add-btn" onClick={() => setShowModal(true)}>
              Add Product
            </button>
          </div>

          {/* Product Cards */}
          {products.map((p) => (
            <div className="card" key={p.id}>
              <div>
                <h3>{p.name}</h3>
                <p> <b>Category:</b> {p.categoryName}</p>
                <p> <b>Brand:</b> {p.description}</p>
                <button onClick={() => navigate(`/variants/${p.id}`)}>
                Add Variant
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Product</h3>

            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <button onClick={handleAdd}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;