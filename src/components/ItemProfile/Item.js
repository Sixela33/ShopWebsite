import React, { useState } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import Modal from "../../Modal";
import { ModifyItem } from "./ModifyItem/ModifyItem";

export const Item = ({ item, data }) => {
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
    const response = await fetch(`/items/${id}`, { method: "DELETE" }).then(
      (res) => res.json()
    );
    console.log(response);
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

    if (response.error) {
      setContent(<h1>{response.error}</h1>);
      toggle();
      return;
    }
    console.log(response);
    window.location.reload(false);
  };

  const editItem = () => {
    setContent(<ModifyItem item={item} />);
    toggle();
  };

  return (
    <>
      <Modal active={active} toggle={toggle}>
        <span>{content}</span>
      </Modal>
      <div className="itemBanner">
        <img
          src={item.displayImage}
          width="100px"
          height="100px"
          alt=""
          className="ItemPicture"
        ></img>
        <span className="title itemData">{item.displayName}</span>
        <br></br>
        <span className="desctiption itemData">{item.description}</span>
        <br />
        <span className="priceTag itemData">Value: {item.price} Coins</span>
        <span className="Owner itemData">
          Owner:{" "}
          <Link to={`/Profile/${item.ownerID}`}>{item.ownerUsername}</Link>
        </span>
        <br></br>
        {data._id == item.ownerID ? (
          <span className="itemData">
            <button onClick={() => removeItem(item._id)}>Remove</button>
            <button onClick={() => editItem()}>Edit</button>
          </span>
        ) : (
          <button
            className="itemData buyButton"
            onClick={() => {
              buyItem(item._id, data._id);
            }}
          >
            Buy
          </button>
        )}
      </div>
    </>
  );
};
