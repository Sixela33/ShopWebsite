import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Modal from "../../Modal";
import { Login } from "../../pages/Login/Login";

export const NavBar = ({ data, setData }) => {
  const [active, setActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setData(null);
  };

  const toggle = () => {
    setActive(!active);
  };
  return (
    <nav>
      <Modal active={active} toggle={toggle}>
        <Login data={data} setData={setData} />
      </Modal>

      <div className="header">
        <Link className="logo item" to="/">
          Basic Shop
        </Link>
        <div className="navBarItems">
          <Link className="item" to="/">
            Home
          </Link>
          {data ? (
            <Link className="item" to={`/Profile/${data._id}`}>
              Profile
            </Link>
          ) : (
            <span></span>
          )}

          {data ? (
            <button className="item" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="item" onClick={toggle}>
              Login
            </button>
          )}
        </div>
      </div>
      {data ? (
        <button className="item balance">Balance: {data.balance} Coins</button>
      ) : (
        <div />
      )}
    </nav>
  );
};
