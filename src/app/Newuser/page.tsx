// src/app/sentbill/page.tsx

"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { registerUser} from "@/helpers/search";


function SentBill() {
  const [userName , setuserName] = useState("")
  const [email , setEmail] = useState("")
  const [phonenumber , setphoneNumber] = useState("")

  const sendBill = () => {
    const register = registerUser(userName , email , phonenumber)
    console.log(`Sending bill to ${userName}...`);
    console.log(`Charges: ${email}`);
    console.log(`Deposit Amount: ${phonenumber}`);

  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom>
        New User
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              label="User Name"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={phonenumber}
              onChange={(e) => setphoneNumber(e.target.value)}
              label="Phone number"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={sendBill} variant="contained" color="primary" fullWidth>
              SAVE form
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SentBill;
