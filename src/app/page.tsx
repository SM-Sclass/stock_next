"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./globals.css";



interface FormData {
  username:string,
  date: string;
  item: string;
  expiry: string;
  lotsize: string;
  numberlot: string;
  buyqty: string;
  sell: string;
  sellprice: string;
}

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    username:"",
    date: "",
    item: "",
    expiry: "",
    lotsize: "",
    numberlot: "",
    buyqty: "",
    sell: "",
    sellprice: ""
  });

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setCurrentDate(formattedDate);
    setFormData((prevData) => ({ ...prevData, date: formattedDate }));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any field is empty
    for (let key in formData) {
      if (formData[key as keyof FormData] === "") {
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }
    const data = {
      username:formData.username,
      date: formData.date,
      item: formData.item,
      expiry: formData.expiry,
      lotsize: formData.lotsize,
      numberlot: formData.numberlot,
      buyqty: formData.buyqty,
      sell: formData.sell,
      sellprice: formData.sellprice
    }
    
    const response = await fetch('/api/savetrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // const result = await response.json();
    console.log(response);
  };

  return (
    <div className="appbody">
      <div className="box">
        <div className="text1">
          <h1>Trading details</h1>
        </div>
        <div className="inputbox">
          <form onSubmit={handleSubmit}>
            <div className="row">
            <label className="user">
                Username:
                <input name="username" type="text" value={formData.username} onChange={handleChange} />
              </label>
              <label className="date">
                Date:
                <input name="date" type="date" value={formData.date} onChange={handleChange} />
              </label>
              <label className="item">
                Item: <input name="item" type="text" value={formData.item} onChange={handleChange} />
              </label>
              <label className="expiry">
                Expiry: <input name="expiry" type="date" value={formData.expiry} onChange={handleChange} />
              </label>
              <label className="lotsize">
                Lot size: <input name="lotsize" type="number" value={formData.lotsize} onChange={handleChange} />
              </label>
              <label className="numberlot">
                Number of lot: <input name="numberlot" type="number" value={formData.numberlot} onChange={handleChange} />
              </label>
              <label className="buyqty">
                Buy quantity: <input name="buyqty" type="number" value={formData.buyqty} onChange={handleChange} />
              </label>
              <label className="sell">
                Sell quantity: <input name="sell" type="number" value={formData.sell} onChange={handleChange} />
              </label>
              <label className="sellprice">
                Sell price: <input name="sellprice" type="number" step="0.01" value={formData.sellprice} onChange={handleChange} />
              </label>
              <div className="submit1">
                <button className="submit" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
