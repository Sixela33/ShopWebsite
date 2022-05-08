import React, { useEffect, useState } from "react";
import { Item } from "../../components/ItemProfile/Item";
import "./Home.css";

export const Home = ({ data }) => {
  const [posts, setPosts] = useState(null);

  // Gets all items (will make so htat it asks by batches)
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
