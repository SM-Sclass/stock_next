"use client"
import React from "react";
import "./header.css";
import Navbar from "./navbar";
function Header() {
  return (
    <div className="img1">
      <div className="body w-full">
        <div className="text">
          <h1>Trading Bill</h1> 
        </div>
        <div className="butten">
          <div className="w-auto">
            <Navbar/>
          </div>
            
        </div>
      </div>
    </div>
  );
}

export default Header;