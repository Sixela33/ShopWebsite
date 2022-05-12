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
      setContent(<h1 style={{ padding: "10px" }}>{response.error}</h1>);
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
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "data:image/png;base64,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";
          }}
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
