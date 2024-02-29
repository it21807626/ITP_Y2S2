import React from "react";
import { useState } from "react";
import { useMenucontext } from "../hooks/useMenuContext";
import Swal from "sweetalert2";

const MenuForm = () => {
  const { dispatch } = useMenucontext();

  const [Caterer_name, setCaterer_name] = useState("");
  const [Menu_name, setMenu_name] = useState("");
  const [Menu_items, setMenu_items] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!Caterer_name || !Menu_name || !Menu_items || !price) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill in all fields.",
      });
      return;
    }

    const menu = { Caterer_name, Menu_name, Menu_items, price };
    const response = await fetch("/api/Cater", {
      method: "POST",
      body: JSON.stringify(menu),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setCaterer_name("");
      setMenu_name("");
      setMenu_items("");
      setPrice("");
      setError(null);
      setEmptyFields([]);
      console.log("New menu added", json);
      dispatch({ type: "CTREATE_MENU", payload: json });

      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "New menu added successfully.",
      });
    }
  };

  return (
    <form className="form-group create" onSubmit={handleSubmit}>
      <h3>Add a New Menu</h3>
      <div className="input-group mb-3">
        <label className="input-group-text">Caterer Name:</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setCaterer_name(e.target.value)}
          value={Caterer_name}
        />
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text">Menu:</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setMenu_name(e.target.value)}
          value={Menu_name}
        />
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text">Menu items:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setMenu_items(e.target.value)}
          value={Menu_items}
        />
      </div>
      <div className="input-group mb-3">
        <label className="input-group-text">Price in LKR:</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>
      <br />
      <button className="btn button-88">Submit</button>
      {error && <div className="error">{error}</div>}
      {emptyFields.length > 0 && (
        <div className="error">Please fill in all fields.</div>
      )}
    </form>
  );
};

export default MenuForm;
