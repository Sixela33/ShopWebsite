import React from "react";
import { Item } from "../ItemProfile/Item";
import "./ItemDisplay.css";

export const ItemDisplay = ({ itemList, data, setLoginData }) => {
  console.log(itemList);
  return (
    <div className="itemBanner">
      <table>
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Description</td>
            <td>Price</td>
            <td>Owner</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, index) => {
            return (
              <tr>
                <Item
                  data={data}
                  item={item}
                  key={index}
                  setLoginData={setLoginData}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
