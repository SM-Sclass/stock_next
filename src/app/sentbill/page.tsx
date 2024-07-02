// src/app/sentbill/page.tsx

// Add the "use client" directive to ensure it's rendered on the client side
"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
  Grid,
} from "@mui/material";

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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom>
        Send Bill
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              label="Recipient's Email"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              label="Recipient's Phone"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              value={billDetails}
              onChange={(e) => setBillDetails(e.target.value)}
              placeholder="Bill Details"
              minRows={4}
              maxRows={8}
              style={{ resize: "none", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%",color:'black' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={sendBillByEmail} variant="contained" color="primary" fullWidth>
              Send via Email
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={sendBillByWhatsApp} variant="contained" color="primary" fullWidth>
              Send via WhatsApp
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={sendBillBySMS} variant="contained" color="primary" fullWidth>
              Send via SMS
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SentBill;
