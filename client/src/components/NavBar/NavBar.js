import React, { useState } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import Modal from "../../Modal";
import { Login } from "../../pages/Login/Login";
import { FaBars } from "react-icons/fa";

export const NavBar = ({ data, setData }) => {
  const [active, setActive] = useState(false);
  const [showMobileMenu, modifyMobilMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setData(null);
  };

  const toggle = () => {
    setActive(!active);
  };

  console.log("data", data);

  return (
    <nav>
      <Modal active={active} toggle={toggle}>
        <Login data={data} setData={setData} />
      </Modal>

      <div className="header">
        <a className="logo" href="/">
          The Newtork
        </a>
        <FaBars
          className="bars"
          onClick={() => {
            modifyMobilMenu(!showMobileMenu);
          }}
        />
        <div
          className={
            showMobileMenu ? "navBarItems active" : "navBarItems closed"
          }
        >
          <NavLink className="item" activeclassname="active" to="/">
            Home
          </NavLink>

          {data ? (
            <NavLink
              className="item"
              activeclassname="active"
              to={`/Profile/${data._id}`}
            >
              Profile
            </NavLink>
          ) : (
            <></>
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
        <button className="balance">Balance: {data.balance} Coins</button>
      ) : (
        <></>
      )}
    </nav>
  );
};
