"use client"

import React, { useState, useEffect } from "react";
import "./globals.css";


function App() {

  const [currentDate, setCurrentDate] = useState("");


  useEffect(() => {
    const today = new Date();
   
    const formattedDate = today.toISOString().substr(0, 10);
    setCurrentDate(formattedDate);
  }, []);

    const handleSubmit= ()=>{
      // handle submition of form
    }


  return (
    <div className="appbody">
      <div className="box">
        <div className="text1">
          <h1>Trading details</h1>
        </div>
        <div className="inputbox">
          <form onSubmit={handleSubmit}>
            <div className="row">
            <label className="date">
              Date: 
              <input name="date" type="date" value={currentDate} onChange={(e)=>setCurrentDate(e.target.value)} />
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
              Number of lot: <input name="numberlot" type="number" />
            </label>
            <label className="buyqty">
              Buy quantity: <input name="buyqty" type="number" />
            </label>
            <label className="sell">
              Sell quantity: <input name="sell" type="number" />
            </label>
            <label className="sellprice">
              Sell price: <input name="sellprice" type="number" step="0.01" />
            </label>
            <div className="submit1">

              <button className="submit">Submit</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;