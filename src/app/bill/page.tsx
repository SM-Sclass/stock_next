"use client"

import "./page.css";
import React, { useState } from "react";

function Bill() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", query);
        // Add your search logic here
    };

    return (
        <div className="bill-container">
            <h1 className="Billtext">Bill</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Search..." 
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
        </div>
    );
}

export default Bill;
