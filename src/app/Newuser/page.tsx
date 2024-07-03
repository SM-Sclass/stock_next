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

function SentBill() {
  const [personName, setPersonName] = useState("");
  const [charges, setCharges] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const sendBill = () => {
    console.log(`Sending bill to ${personName}...`);
    console.log(`Charges: ${charges}`);
    console.log(`Deposit Amount: ${depositAmount}`);
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
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              label="Person's Name"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={charges}
              onChange={(e) => setCharges(e.target.value)}
              label="Brokerage Charges"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              label="Deposit Amount"
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
