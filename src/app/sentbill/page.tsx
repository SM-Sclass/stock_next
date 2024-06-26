"use client"; // Add this directive at the top
import "./page.css";
import React, { useState } from "react";

function SentBill() {
    const [recipientEmail, setRecipientEmail] = useState("");
    const [recipientPhone, setRecipientPhone] = useState("");
    const [billDetails, setBillDetails] = useState("");

    const sendBillByEmail = () => {
         
        console.log(`Sending bill to ${recipientEmail} via email...`);
       
    };

    const sendBillByWhatsApp = () => {
        
        console.log(`Sending bill to ${recipientPhone} via WhatsApp...`);
        
    };

    const sendBillBySMS = () => {
        
        console.log(`Sending bill to ${recipientPhone} via SMS...`);
        
    };

    return (
        <div className="sentbill-container">
            <h1>Send Bill</h1>
            <div className="form-container">
                <input 
                    type="email" 
                    value={recipientEmail} 
                    onChange={(e) => setRecipientEmail(e.target.value)} 
                    placeholder="Recipient's Email" 
                    className="input-field"
                />
                <input 
                    type="text" 
                    value={recipientPhone} 
                    onChange={(e) => setRecipientPhone(e.target.value)} 
                    placeholder="Recipient's Phone" 
                    className="input-field"
                />
                <textarea
                    value={billDetails}
                    onChange={(e) => setBillDetails(e.target.value)}
                    placeholder="Bill Details"
                    className="textarea-field"
                />
                <button onClick={sendBillByEmail} className="send-button">Send via Email</button>
                <button onClick={sendBillByWhatsApp} className="send-button">Send via WhatsApp</button>
                <button onClick={sendBillBySMS} className="send-button">Send via SMS</button>
            </div>
        </div>
    );
}

export default SentBill;
