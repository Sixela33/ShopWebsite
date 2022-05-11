import React, { useState } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import Modal from "../../Modal";
import { ModifyItem } from "./ModifyItem/ModifyItem";

export const Item = ({ item, data, setLoginData }) => {
  const [active, setActive] = useState(false);
  const [content, setContent] = useState(<div></div>);

  const toggle = () => {
    setActive(!active);
  };

  if (!data) {
    data = { _id: false };
  }

  // Calls to the backend
  const removeItem = async (id) => {
    await fetch(`/items/${id}`, { method: "DELETE" }).then((res) => res.json());
    window.location.reload(false);
  };

  const buyItem = async (itemID, newOwnerID) => {
    // if user is not logged in, returns
    if (!newOwnerID) {
      setContent(<h1>You need to be logged in to do that</h1>);
      toggle();
      return;
    }
    const response = await fetch(`/items/${itemID}`, {
      method: "PATCH",
      body: JSON.stringify({ offer: newOwnerID }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());

    // If error, a warning is displayed
    if (response.error) {
      setContent(<h1>{response.error}</h1>);
      toggle();
      return;
    }
    window.localStorage.setItem("loginData", JSON.stringify(response.buyer));
    window.location.reload(false);
  };

  const editItem = () => {
    setContent(<ModifyItem item={item} />);
    toggle();
  };

  //Item display
  return (
    <>
      <Modal active={active} toggle={toggle}>
        <span>{content}</span>
      </Modal>
      <td>
        <img
          src={item.displayImage}
          width="100px"
          height="100px"
          alt=""
          className="ItemPicture"
        ></img>
      </td>
      <td>
        <span className="title itemData">{item.displayName}</span>
      </td>
      <td>
        <span className="desctiption itemData">{item.description}</span>
      </td>
      <td>
        <span className="priceTag itemData">{item.price} Coins</span>
        <p className="lastPrice">
          Last Price: {item.lastPrice ? item.lastPrice : "N/A"}
        </p>
      </td>
      <td>
        <span className="Owner itemData">
          Owner:{" "}
          <Link to={`/Profile/${item.ownerID}`}>{item.ownerUsername}</Link>
        </span>
      </td>
      <td>
        {data._id == item.ownerID ? (
          <span className="itemData">
            <button className="button--1" onClick={() => removeItem(item._id)}>
              Remove
            </button>
            <button className="button--1" onClick={() => editItem()}>
              Edit
            </button>
          </span>
        ) : (
          <button
            className="itemData buyButton button--1"
            onClick={() => {
              buyItem(item._id, data._id);
            }}
          >
            Buy
          </button>
        )}
      </td>
    </>
  );
};
