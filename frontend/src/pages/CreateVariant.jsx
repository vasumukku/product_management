import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Variant.css";

function CreateVariant() {

  const navigate = useNavigate();

  const { productId } = useParams();



  // BASIC FORM
  const [form, setForm] = useState({

    sku: "",
    price: "",
    discount: "",
    quantity: "",

  });




  // ATTRIBUTES
  const [attributes,
    setAttributes]
  = useState([]);




  // SELECTED ATTRIBUTES
  const [selectedAttributes,
    setSelectedAttributes]
  = useState([]);




  // POPUP
  const [showPopup,
    setShowPopup]
  = useState(false);




  // NEW ATTRIBUTE
  const [attributeName,
    setAttributeName]
  = useState("");



  // OPTION INPUT
  const [optionInput,
    setOptionInput]
  = useState("");



  // OPTIONS ARRAY
  const [options,
    setOptions]
  = useState([]);




  // FETCH ATTRIBUTES
  useEffect(() => {

    fetchAttributes();

  }, []);




  const fetchAttributes = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/attributes"
      );

      const data = await res.json();

      setAttributes(data);

    } catch (err) {

      console.log(err);

    }

  };




  // BASIC INPUT CHANGE
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };




  // ADD ATTRIBUTE SELECT
  const addAttribute = (attribute) => {

    const exists =
      selectedAttributes.find(
        (item) =>
          item.id === attribute.id
      );

    if (exists) return;



    setSelectedAttributes([

      ...selectedAttributes,

      {
        ...attribute,
        selectedValue: "",
      },

    ]);

  };




  // ATTRIBUTE VALUE CHANGE
  const handleAttributeValue =
    (id, value) => {

    const updated =
      selectedAttributes.map(
        (item) => {

          if (item.id === id) {

            return {

              ...item,

              selectedValue:
                value,

            };

          }

          return item;

        }
      );



    setSelectedAttributes(
      updated
    );

  };




  // ADD OPTION TEMP
  const addOption = () => {

    if (!optionInput) return;



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




  // CREATE VARIANT
  const handleSubmit = async () => {

    try {

      const dynamicAttributes =
        {};



      selectedAttributes.forEach(
        (item) => {

          dynamicAttributes[
            item.name
          ] =
            item.selectedValue;

        }
      );



      const data = {

        sku: form.sku,

        price: form.price,

        discount: form.discount,

        quantity: form.quantity,

        productId: productId,

        attributes:
          dynamicAttributes,

      };



      await fetch(
        "http://localhost:5000/api/variants/create",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),

        }
      );



      alert(
        "Variant Created"
      );



      navigate(-1);

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
          "variant-main-container"
        >

          {/* HEADER */}
          <div className=
            "variant-header"
          >

            <h2>
              Create Variant
            </h2>

            <p>
              Manage Product Variant
            </p>

          </div>



          {/* CARD */}
          <div className=
            "variant-card"
          >

            {/* BASIC DETAILS */}
            <div className=
              "variant-grid"
            >

              <div className=
                "input-group"
              >

                <label>
                  SKU
                </label>

                <input
                  type="text"
                  name="sku"
                  value={form.sku}
                  placeholder="TH-RED-L"
                  onChange={
                    handleChange
                  }
                />

              </div>



              <div className=
                "input-group"
              >

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  placeholder="2999"
                  onChange={
                    handleChange
                  }
                />

              </div>



              <div className=
                "input-group"
              >

                <label>
                  Discount
                </label>

                <input
                  type="number"
                  name="discount"
                  value={form.discount}
                  placeholder="10"
                  onChange={
                    handleChange
                  }
                />

              </div>



              <div className=
                "input-group"
              >

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  placeholder="10"
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>



            {/* ATTRIBUTE SECTION */}
            <div className=
              "attribute-box"
            >

              <div className=
                "attribute-top"
              >

                <h3>
                  Attribute Selection
                </h3>



                <button
                  className=
                  "add-attribute-btn"

                  onClick={() =>
                    setShowPopup(
                      true
                    )
                  }
                >

                  + Add Variant

                </button>

              </div>



              {/* AVAILABLE ATTRIBUTES */}
              <div className=
                "attribute-wrapper"
              >

                {attributes.map(
                  (attribute) => (

                  <button
                    key={attribute.id}

                    className=
                    "attribute-chip"

                    onClick={() =>
                      addAttribute(
                        attribute
                      )
                    }
                  >

                    {attribute.name}

                  </button>

                ))}

              </div>

            </div>



            {/* SELECTED ATTRIBUTES */}
            <div className=
              "attribute-values-box"
            >

              <h3>
                Attribute Values
              </h3>



              {selectedAttributes.map(
                (attribute) => (

                <div
                  key={attribute.id}

                  className=
                  "single-attribute"
                >

                  <div className=
                    "single-top"
                  >

                    <h4>
                      {
                        attribute.name
                      }
                    </h4>



                    {/* IF NO OPTIONS */}
                    {attribute
                      .AttributeOptions
                      .length === 0 && (

                      <button
                        className=
                        "small-add-btn"
                      >

                        + Add Option

                      </button>

                    )}

                  </div>



                  <select

                    value={
                      attribute.selectedValue
                    }

                    onChange={(e) =>
                      handleAttributeValue(

                        attribute.id,

                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select
                      {" "}
                      {
                        attribute.name
                      }
                    </option>



                    {attribute
                      .AttributeOptions
                      .map((option) => (

                      <option
                        key={option.id}

                        value={
                          option.value
                        }
                      >

                        {option.value}

                      </option>

                    ))}

                  </select>

                </div>

              ))}

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



      {/* POPUP */}
      {showPopup && (

        <div className=
          "popup-overlay"
        >

          <div className=
            "popup-box"
          >

            <h3>
              Add Variant
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



            {/* OPTIONS */}
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



            {/* EXISTING */}
            <div className=
              "existing-section"
            >

              <h4>
                Existing Attributes
              </h4>



              <div className=
                "attribute-wrapper"
              >

                {attributes.map(
                  (item) => (

                  <span
                    key={item.id}

                    className=
                    "existing-chip"
                  >

                    {item.name}

                  </span>

                ))}

              </div>

            </div>



            <div className=
              "popup-actions"
            >

              <button
                className=
                "cancel-btn"

                onClick={() =>
                  setShowPopup(
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
                  createAttribute
                }
              >

                Create

              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default CreateVariant;