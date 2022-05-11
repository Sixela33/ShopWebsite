import React from "react";
import { Item } from "../ItemProfile/Item";
import "./ItemDisplay.css";

export const ItemDisplay = ({ itemList, data, setLoginData }) => {
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
              <tr key={index}>
                <Item data={data} item={item} setLoginData={setLoginData} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
