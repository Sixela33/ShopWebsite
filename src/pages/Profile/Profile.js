import React, { useEffect, useState } from "react";
import "./profile.css";
import { Item } from "../../components/ItemProfile/Item";
import { UserInfo } from "./UserInfo/UserInfo";
import { ItemForm } from "./ItemForm/ItemForm";
import { useParams } from "react-router-dom";
import { NotFound } from "../NotFound/NotFound";

export const Profile = ({ data }) => {
  const { id } = useParams();

  const [profileInfo, setProfileInfo] = useState();

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

            <h1>Your Items</h1>
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
