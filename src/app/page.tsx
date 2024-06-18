"use client"

import React, { useState, useEffect } from "react";
import "./globals.css";
import Header from "@/components/ui/header";
function App() {

  const [currentDate, setCurrentDate] = useState("");


  useEffect(() => {
    const today = new Date();
   
    const formattedDate = today.toISOString().substr(0, 10);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="appbody">
      <div className="box">
        <div className="text1">
          <h1>Trading details</h1>
        </div>
        <div className="inputbox">
          <div className="row">
            <label className="date">
              Date: <input name="date" type="date" value={currentDate} />
            </label>
            <label className="item">
              Item: <input name="item" type="text" />
            </label>
            <label className="expiry">
              Expiry: <input name="expiry" type="date" />
            </label>
            <label className="lotsize">
              Lot size: <input name="lotsize" type="number" />
            </label>
            <label className="numberlot">
              No of lot: <input name="numberlot" type="number" />
            </label>
            <label className="buyqty">
              Buy qty: <input name="buyqty" type="number" />
            </label>
            <label className="sell">
              Sell qty: <input name="sell" type="number" />
            </label>
            <label className="sellprice">
              Sell price: <input name="sellprice" type="number" step="0.01" />
            </label>
            <div className="submit1">
              <button className="submit">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;