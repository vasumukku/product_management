import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Categories.css";

const API_URL = "http://localhost:5000/api/categories";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Save category
  const handleSave = async () => {
    if (!name) return;

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, { name });
      } else {
        await axios.post(API_URL, { name });
      }

      setName("");
      setEditId(null);
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchCategories();
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="main-content">
          {/* Header */}
          <div className="header">
            <h2>Categories</h2>

            <button
              className="add-btn"
              onClick={() => {
                setShowModal(true);
                setEditId(null);
                setName("");
              }}
            >
              Add Category
            </button>
          </div>

          {/* Cards */}
          {categories.map((cat) => (
            <div className="card" key={cat.id}>
              <div className="card-left">
                <h3>{cat.name}</h3>
                <p>
                  Created:{" "}
                  {new Date(cat.createdAt).toLocaleDateString()}
                </p>
                <p>Status: {cat.active ? "Active" : "Inactive"}</p>
              </div>

              <div className="actions">
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId ? "Update Category" : "Add Category"}</h3>

            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;