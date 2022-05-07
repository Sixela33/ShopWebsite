import React from "react";

export const UserInfo = ({ userData }) => {
  return (
    <div className="user-info">
      <img
        src={userData.image}
        alt="yeeehaw"
        width={"144px"}
        height={"144px"}
      ></img>
      <p>User: {userData.displayName}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};
