import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  
  const handleAdd = () => {
    if (!name) return;

    if (editIndex !== null) {
      const updated = [...categories];
      updated[editIndex].name = name;
      setCategories(updated);
      setEditIndex(null);
    } else {
      setCategories([...categories, { name, active: true }]);
    }

    setName("");
  };


  const handleEdit = (index) => {
    setName(categories[index].name);
    setEditIndex(index);
  };


  const handleDelete = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };


  const toggleStatus = (index) => {
    const updated = [...categories];
    updated[index].active = !updated[index].active;
    setCategories(updated);
  };

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="main-content" style={{ padding: "20px" }}>
          <h2>Category Management</h2>

          
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: "8px", marginRight: "10px",width:"80%" }}
            />

            <button onClick={handleAdd} style={{width:"80%"}}>
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>

          
          <table border="1" cellPadding="10" width="80%">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    {cat.active ? (
                      <span style={{ color: "green" }}>Active</span>
                    ) : (
                      <span style={{ color: "red" }}>Inactive</span>
                    )}
                  </td>

                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(index)}>Delete</button>{" "}
                    <button onClick={() => toggleStatus(index)}>
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Categories;