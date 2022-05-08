import React, { useEffect, useState } from "react";
import "./profile.css";
import { Item } from "../../components/ItemProfile/Item";
import { UserInfo } from "./UserInfo/UserInfo";
import { ItemForm } from "./ItemForm/ItemForm";
import { useParams } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";

export const Profile = ({ data }) => {
  // Gets the user that the page should be loading
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState();

  //fetches the user's data from the backend
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

  // IF the app has the profile info, it renders it
  //If not, the "Not found page is shown"
  if (profileInfo) {
    return (
      <>
        <div className="container">
          <UserInfo userData={profileInfo.user} />
          <div className="items">
            {data ? <ItemForm data={data} /> : <span></span>}

            <h1>User Items</h1>
            <div>
              {profileInfo.items.map((item, index) => {
                return <Item data={data} item={item} key={index} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <NotFound />;
  }
};
