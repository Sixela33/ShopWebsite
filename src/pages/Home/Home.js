import React, { useEffect, useState } from "react";
import { Item } from "../../components/ItemProfile/Item";
import "./Home.css";

export const Home = ({ data, setData }) => {
  const [posts, setPosts] = useState(null);

  const getItems = async () => {
    var info = await fetch(`/items`);
    info = await info.json();
    if (info.success === false) {
      info = null;
    }

    setPosts(info);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Welcome to the Shop!</h1>
        <p>Check the Latest items</p>
        {posts ? (
          posts.items.map((item, index) => {
            return (
              <Item className="HomeItem" data={data} item={item} key={index} />
            );
          })
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
};
