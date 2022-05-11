import React, { useState } from "react";
import "./ItemForm";

export const ItemForm = ({ data }) => {
  const [form, setForm] = useState({});

  const defaultImage =
    "https://i.pinimg.com/236x/26/a0/5c/26a05cbba0fb800f1a0568347832347e.jpg";
  const defauldDescription = "No description available";

  const username = data.displayName;
  const OwnerId = data._id;

  // Checking the values sent by the user and sends the post request to the server
  const handleSubmit = async (thingy) => {
    thingy = { ...thingy, username, OwnerId };
    if (!thingy.username) {
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
    if (thingy.displayImage == "" || thingy.displayImage == undefined) {
      thingy.displayImage = defaultImage;
    }

    if (thingy.description == "" || thingy.description == undefined) {
      thingy.description = defauldDescription;
    }

    const res = await fetch("/items", {
      method: "POST",
      body: JSON.stringify({
        token: thingy,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload(false);
    const information = await res.json();
    console.log("Item Created Successfully", information);
  };

  const handleChange = (e) => {
    if (e.target.name === "price" && e.target.value < 0) {
      e.target.value = 0;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Form that handles the cretion of items
  return (
    <form>
      <h1>Post an Item</h1>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="displayName"
        maxLength="25"
        onChange={handleChange}
      ></input>
      <br></br>
      <label htmlFor="description">Description: </label>
      <input
        type="text"
        id="description"
        name="description"
        maxLength="100"
        onChange={handleChange}
      ></input>
      <br></br>
      <label htmlFor="price">Item Price: </label>
      <input
        type="number"
        id="price"
        name="price"
        pattern="[0-9]+"
        min="0"
        onChange={handleChange}
      ></input>
      <br></br>
      <label htmlFor="image">Image Link: </label>
      <input
        type="int"
        id="image"
        name="displayImage"
        onChange={handleChange}
      ></input>
      <br></br>
      <button className="button--1" onClick={() => handleSubmit(form)}>
        Create Item
      </button>
    </form>
  );
};
