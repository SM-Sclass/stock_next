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
          <h1>Trading Bill</h1> 
        </div>
        <div className="login1">
          <h2><Link href="/live" className="Live">Live</Link></h2>
          <h2><Link href="/login" className="login">Login</Link></h2>
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