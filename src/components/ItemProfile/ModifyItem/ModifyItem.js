import React, { useState } from "react";
import "./ModifyItem.css";

export const ModifyItem = ({ item }) => {
  const [form, setForm] = useState(item);

  const defaultImage =
    "https://i.pinimg.com/236x/26/a0/5c/26a05cbba0fb800f1a0568347832347e.jpg";
  const defauldDescription = "No description available";

  const handleChange = (e) => {
    if (e.target.name === "price" && e.target.value < 0) {
      e.target.value = 0;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (thingy) => {
    if (!thingy.ownerUsername) {
      console.warn("User not logged in");
      return;
    }
    if (
      !thingy.displayName ||
      thingy.displayName.length <= 3 ||
      !thingy.price
    ) {
      console.warn("Invalid Form");
      return;
    }
    if (thingy.displayImage.trim() == "" || thingy.displayImage == undefined) {
      thingy.displayImage = defaultImage;
    }

    if (thingy.description.trim() == "" || thingy.description == undefined) {
      thingy.description = defauldDescription;
    }

    console.log(thingy);
    const res = await fetch("/items", {
      method: "PATCH",
      body: JSON.stringify({
        token: thingy,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const information = await res.json();
    console.log("Item Created Successfully", information);
    window.location.reload(false);
  };

  return (
    <>
      <ul>
        <li>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="displayName"
            maxLength="25"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            maxLength="50"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <label htmlFor="image">image Link: </label>
          <input
            type="text"
            id="image"
            name="displayImage"
            onChange={handleChange}
          ></input>
        </li>
        <li>
          <label htmlFor="price">price: </label>
          <input
            type="number"
            id="price"
            name="price"
            pattern="[0-9]+"
            min="0"
            onChange={handleChange}
          ></input>
        </li>
        <button onClick={() => handleSubmit(form)}> Submit Changes</button>
      </ul>
    </>
  );
};
