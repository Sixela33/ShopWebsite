import React, { useEffect, useState } from "react";
import { ItemDisplay } from "../../components/ItemDisplay/ItemDisplay";
import "./Home.css";

export const Home = ({ data, setLoginData }) => {
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
          <ItemDisplay
            data={data}
            itemList={posts.items}
            setLoginData={setLoginData}
          />
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
};
