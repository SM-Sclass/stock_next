"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';


interface FormData {
  id: number;
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{ id: number; username: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    username: '',
    date: '',
    item: '',
    expiry: '',
    lotsize: '',
    numberlot: '',
    buyqty: 0,
    sellqty: '',
    sellprice: '',
    buyprice: ''
  });

  useEffect(() => {
    if(searchQuery)
      {

        const fetchSearchResults = async () => {
          if (searchQuery.length > 2) {
            const response = await fetch(`/api/searchusers?q=${searchQuery}`);
            const data = await response.json();
            console.log("THIS IS DATA" ,data)
            setSearchResults(data);
          } else {
            setSearchResults([]);
          }
        };
        
        fetchSearchResults();
      }
  }, [searchQuery]);

  useEffect(() => {
    if(selectedUserId)
      {

        const fetchUserData = async () => {
          try {
            
            
            const response = await fetch(`/api/user?id=${selectedUserId}`);
            const data = await response.json();
            console.log("THIS IS RESPONSE" , data)
            data.date = data.date.split('T')[0];
            data.expiry = data.expiry.split('T')[0];
            console.log(data.date)
            console.log(data.expiry)
            // setFormData(data)
            setFormData({...formData,
                id:data.id.toString(),
                username:data.username,
                date: data.date.split('T')[0],
                item:data.item,
                expiry:data.expiry.split('T')[0],
                lotsize:data.lot_size.toString(),
                numberlot:data.no_of_lot.toString(),
                buyqty:data.buy_qty,
                buyprice:data.buy_price,
                sellqty:data.sell_qty ? data.sell_qty.toString() : '',
                sellprice:data.sell_price ? data.sell_price.toString() : '',
            });
            const dataToSubmit = {
              ...formData,
              lotsize: parseFloat(formData.lotsize),
              numberlot: parseFloat(formData.numberlot),
              buyprice: parseFloat(formData.buyprice),
              sellqty: formData.sellqty === "" ? 0 : parseFloat(formData.sellqty),
              sellprice: formData.sellprice === "" ? 0 : parseFloat(formData.sellprice)
            };
          
          console.log("This is form date" , formData.username)
          // setFormData({...formData ,date:formattedDate })
          // setFormData({...formData ,expiry:expiryDate })
          console.log("This is Formdata" , formData)
        } 
          catch (error) {
            console.error("Error fetching user data:", error);
        }
        
      };
      
        fetchUserData();
      }
    
  }, [selectedUserId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    const response = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    console.log(response);
  };

  return (
    <div className="box">
      <div className="text1">
        <h1>Trading details</h1>
      </div>
      <div className="inputbox">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label className="user">
              Search Username:
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a username"
              />
              {searchResults.length > 0 && (
                <ul className='bg-black text-white'>
                  {searchResults.map((user) => (
                    <li className='border' key={user.id} onClick={() => setSelectedUserId(user.id)}>
                      {user.username}
                    </li>
                  ))}
                </ul>
              )}
            </label>
            <label className="username">
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
  );
};

export default Form;
