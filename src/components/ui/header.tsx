"use client"
import React from "react";
import Link from "next/link";
import "./header.css";
import { Button } from "./button";
import Navbar from "./navbar";
function Header() {
  return (
    <div className="img1">
      <div className="body w-full">
        <div className="text">
          <h2>Trading Bill</h2> 
        </div>
        <div className="login1">
          <h2><Link href="/live" className="Live">Live</Link></h2>
          <h2><Link href="/login" className="login">Login</Link></h2>
        </div>
        <div className="butten">
          <div className="w-auto">
            <Navbar/>
          </div>
            
          {/* <div className="Home">
          <Link href="/" className="Home1 hover:bg-slate-800 w-10"> <Button className="">Home</Button></Link>
          
          </div>
          <div className="Person">
            <label>Person</label>
            <select name="name" className="select-box">
              <option>name</option>
              <option>Arun</option>
              <option>Vinit</option>
              <option>Vedansh</option>
            </select>
          </div>
          <div className="Bill">
            <select name="Bill" className="select-box">
              <option>Bill</option>
              <option>weekly Bill</option>
              <option>monthly Bill</option>
            </select>
          </div>
          <div className="Ledgers">
            <label>Ledgers</label>
            <select name="Ledgers" className="select-box">
              <option>name</option>
              <option>Arun</option>
              <option>Vinit</option>
              <option>Vedansh</option>
            </select>
          </div>
          <div className="Sentbill">
            <label>Sent via</label>
            <select name="bill" className="select-box">
              <option>WhatsApp</option>
              <option>SMS</option>
            </select>
          </div> */}
        
        </div>
      </div>
    </div>
  );
}

export default Header;