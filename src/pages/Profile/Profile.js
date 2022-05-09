import React, { useEffect, useState } from "react";
import "./profile.css";
import { ItemDisplay } from "../../components/ItemDisplay/ItemDisplay";
import { UserInfo } from "./UserInfo/UserInfo";
import { ItemForm } from "./ItemForm/ItemForm";
import { useParams } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";

export const Profile = ({ data }) => {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState();

  // Fetches the user's data from the backend
  // Returns 2 Dicts, one with the user information and other with his products
  const getUserData = async () => {
    var info = await fetch(`/items/${id}`);
    info = await info.json();
    if (info.success === false) {
      info = null;
    }
    setProfileInfo(info);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (profileInfo) {
    return (
      <>
        <div className="container">
          <UserInfo userData={profileInfo.user} />
          <div className="items">
            {data ? <ItemForm data={data} /> : <span></span>}

            <h1>User Items</h1>
            <ItemDisplay itemList={profileInfo.items} data={data} />
          </div>
        </div>
      </>
    );
  } else {
    return <NotFound />;
  }
};
