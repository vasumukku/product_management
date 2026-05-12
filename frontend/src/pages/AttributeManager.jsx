import React, {
  useEffect,
  useState
} from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./AttributeManager.css";

function AttributeManager() {

  // ALL ATTRIBUTES
  const [attributes,
    setAttributes]
    = useState([]);

  // CREATE POPUP
  const [showPopup,
    setShowPopup]
    = useState(false);

  // EDIT POPUP
  const [showEditPopup,
    setShowEditPopup]
    = useState(false);

  // CREATE INPUTS
  const [attributeName,
    setAttributeName]
    = useState("");

  const [optionInput,
    setOptionInput]
    = useState("");

  const [options,
    setOptions]
    = useState([]);

  // EDIT INPUTS
  const [editId,
    setEditId]
    = useState("");

  const [editName,
    setEditName]
    = useState("");




  // FETCH
  useEffect(() => {

    fetchAttributes();

  }, []);




  // GET ALL
  const fetchAttributes =
    async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/attributes"
      );

      const data =
        await res.json();

      setAttributes(data);

    } catch (err) {

      console.log(err);

    }

  };




  // ADD OPTION
  const addOption = () => {

    if (!optionInput)
      return;

    setOptions([
      ...options,
      optionInput,
    ]);

    setOptionInput("");

  };




  // CREATE ATTRIBUTE
  const createAttribute =
    async () => {

    try {

      const data = {

        name: attributeName,

        options: options,

      };

      await fetch(
        "http://localhost:5000/api/attributes/create",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),

        }
      );

      fetchAttributes();

      setShowPopup(false);

      setAttributeName("");

      setOptionInput("");

      setOptions([]);

    } catch (err) {

      console.log(err);

    }

  };




  // DELETE
  const deleteAttribute =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this attribute?"
      );

    if (!confirmDelete)
      return;

    try {

      await fetch(
        `http://localhost:5000/api/attributes/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchAttributes();

    } catch (err) {

      console.log(err);

    }

  };




  // OPEN EDIT POPUP
  const editAttribute =
    (item) => {

    setEditId(item.id);

    setEditName(item.name);

    setShowEditPopup(true);

  };




  // UPDATE ATTRIBUTE
  const updateAttribute =
    async () => {

    try {

      await fetch(
        `http://localhost:5000/api/attributes/${editId}`,
        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: editName,
          }),

        }
      );

      fetchAttributes();

      setShowEditPopup(false);

    } catch (err) {

      console.log(err);

    }

  };




  return (

    <>
      <Navbar />

      <div className="layout">

        <Sidebar />



        <div className=
          "attribute-main-container"
        >

          {/* HEADER */}
          <div className=
            "attribute-header"
          >

            <h2>
              Attribute Management
            </h2>

            <button
              className=
              "add-attribute-btn"

              onClick={() =>
                setShowPopup(true)
              }
            >

              + Add Attribute

            </button>

          </div>



          {/* CARD */}
          <div className=
            "attribute-card"
          >

            {attributes.map(
              (item) => (

              <div
                key={item.id}

                className=
                "attribute-item"
              >

                <span className=
                  "attribute-name"
                >

                  {item.name}

                </span>



                <div className=
                  "attribute-actions"
                >

                  <button
                    className=
                    "edit-btn"

                    onClick={() =>
                      editAttribute(item)
                    }
                  >

                    Edit

                  </button>



                  <button
                    className=
                    "delete-btn"

                    onClick={() =>
                      deleteAttribute(
                        item.id
                      )
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>



      {/* CREATE POPUP */}
      {showPopup && (

        <div className=
          "popup-overlay"
        >

          <div className=
            "popup-box"
          >

            <h3>
              Create Attribute
            </h3>



            <input
              type="text"

              placeholder=
              "Attribute Name"

              value={attributeName}

              onChange={(e) =>
                setAttributeName(
                  e.target.value
                )
              }
            />



            {/* OPTION */}
            <div className=
              "option-row"
            >

              <input
                type="text"

                placeholder=
                "Add Option"

                value={optionInput}

                onChange={(e) =>
                  setOptionInput(
                    e.target.value
                  )
                }
              />



              <button
                className=
                "small-add-btn"

                onClick={addOption}
              >

                + Add

              </button>

            </div>



            {/* OPTION TAGS */}
            <div className=
              "option-preview"
            >

              {options.map(
                (item, index) => (

                <span
                  key={index}

                  className=
                  "option-tag"
                >

                  {item}

                </span>

              ))}

            </div>



            {/* ACTIONS */}
            <div className=
              "popup-actions"
            >

              <button
                className=
                "cancel-btn"

                onClick={() =>
                  setShowPopup(false)
                }
              >

                Cancel

              </button>



              <button
                className=
                "create-popup-btn"

                onClick={
                  createAttribute
                }
              >

                Create

              </button>

            </div>

          </div>

        </div>

      )}



      {/* EDIT POPUP */}
      {showEditPopup && (

        <div className=
          "popup-overlay"
        >

          <div className=
            "popup-box"
          >

            <h3>
              Edit Attribute
            </h3>

            <input
              type="text"

              value={editName}

              onChange={(e) =>
                setEditName(
                  e.target.value
                )
              }
            />

            <div className=
              "popup-actions"
            >

              <button
                className=
                "cancel-btn"

                onClick={() =>
                  setShowEditPopup(
                    false
                  )
                }
              >

                Cancel

              </button>

              <button
                className=
                "create-popup-btn"

                onClick={
                  updateAttribute
                }
              >

                Update

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );
}

export default AttributeManager;