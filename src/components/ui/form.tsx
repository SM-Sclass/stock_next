"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../../app/globals.css";


interface FormData {
  username: string;
  date: string;
  item: string;
  expiry: string;
  lotsize: string;
  numberlot: string;
  buyqty: number;
  sellqty: string;
  sellprice: string;
  buyprice: string;
}

const Form: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    date: "",
    item: "",
    expiry: "",
    lotsize: "",
    numberlot: "",
    buyqty: 0,
    sellqty: "",
    sellprice: "",
    buyprice: ""
  });

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setCurrentDate(formattedDate);
    setFormData((prevData) => ({ ...prevData, date: formattedDate }));
  }, []);

  useEffect(() => {
    const lotsize = parseFloat(formData.lotsize) || 0;
    const numberlot = parseFloat(formData.numberlot) || 0;
    setFormData((prevData) => ({
      ...prevData,
      buyqty: lotsize * numberlot
    }));
  }, [formData.lotsize, formData.numberlot]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const requiredFields: (keyof FormData)[] = ["username", "date", "item", "expiry", "lotsize", "numberlot", "buyqty", "buyprice"];
    for (let key of requiredFields) {
      if (formData[key] === "") {
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }

    const dataToSubmit = {
      ...formData,
      lotsize: parseFloat(formData.lotsize),
      numberlot: parseFloat(formData.numberlot),
      buyprice: parseFloat(formData.buyprice),
      sellqty: formData.sellqty === "" ? 0 : parseFloat(formData.sellqty),
      sellprice: formData.sellprice === "" ? 0 : parseFloat(formData.sellprice)
    };

    const response = await fetch('/api/savetrade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    console.log("THIS",response);
  };

  return (
    <div className="outerbox">
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
            <label className="buyprice">
              Buy price: <input name="buyprice" type="number" step="0.01" value={formData.buyprice} onChange={handleChange} />
            </label>
            <label className="sell">
              Sell quantity: <input name="sellqty" type="number" value={formData.sellqty} onChange={handleChange} />
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

export default Form;
