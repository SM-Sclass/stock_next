"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  FormControl,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { searchUser,getUser } from "@/helpers/search";

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
  week: string; // New field for week
}

const Form: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    { id: number; username: string }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    username: "",
    date: "",
    item: "",
    expiry: "",
    lotsize: "",
    numberlot: "",
    buyqty: 0,
    sellqty: "",
    sellprice: "",
    buyprice: "",
    week: "", // Initialize week field
  });

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        const data = await searchUser(searchQuery)
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (selectedUserId) {
        try {
          const data = await getUser(selectedUserId)
          setFormData({
            id: data.id,
            username: data.username,
            date: dayjs(data.date.split("T")[0]).format("DD/MM/YYYY"),
            item: data.item,
            expiry: dayjs(data.expiry.split("T")[0]).format("DD/MM/YYYY"),
            lotsize: data.lot_size.toString(),
            numberlot: data.no_of_lot.toString(),
            buyqty: data.buy_qty,
            buyprice: data.buy_price.toString(),
            sellqty: data.sell_qty ? data.sell_qty.toString() : "",
            sellprice: data.sell_price ? data.sell_price.toString() : "",
            week: getFridays(), // Assuming you want to initialize with available weeks
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [selectedUserId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name: any; value: any; }>) => {
    const { name, value } = e.target;
    if (name === "date" || name === "expiry") {
      // Ensure date format is dd/mm/yyyy when updating form data
      const formattedDate = dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY");
      setFormData((prevData) => ({ ...prevData, [name]: formattedDate }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      "username",
      "date",
      "item",
      "expiry",
      "lotsize",
      "numberlot",
      "buyqty",
      "buyprice",
      "week", // Ensure week is a required field
    ];
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
      sellprice: formData.sellprice === "" ? 0 : parseFloat(formData.sellprice),
    };

    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });

    if (response.ok) {
      alert("Form updated successfully");
    } else {
      alert("Failed to update the form");
    }
  };

  // Function to get the past and ongoing Fridays
  const getFridays = () => {
    const today = new Date();
    const todayDay = today.getDay();
    const fridayOffset = todayDay >= 5 ? 12 - todayDay : 5 - todayDay;

    const fridays = [];
    for (let i = 0; i <= fridayOffset; i += 7) {
      const fridayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      fridays.push(dayjs(fridayDate).format("DD/MM/YYYY"));
    }
    return fridays.join(", "); // Join Fridays for display if needed
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" width="100%" justifyContent="center">
        <Box maxWidth="md" width="100%">
          <Card elevation={4}>
            <CardHeader title="Update Trading Details" />
            <CardContent>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Search Username"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a username"
                    />
                    {searchResults.length > 0 && (
                      <List>
                        {searchResults.map((user) => (
                          <ListItem
                            key={user.id}
                            onClick={() => setSelectedUserId(user.id)}
                          >
                            <ListItemText primary={user.username} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Select Week"
                      name="week"
                      select
                      value={formData.week}
                      onChange={handleChange}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value=""></option>
                      {formData.week.split(", ").map((week, index) => (
                        <option key={index} value={week}>
                          {week}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Date"
                        value={dayjs(formData.date, "DD/MM/YYYY")}
                        onChange={(date) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            date: (date as Dayjs).format("YYYY-MM-DD"),
                          }))
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Item"
                      name="item"
                      value={formData.item}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Expiry"
                        value={dayjs(formData.expiry, "DD/MM/YYYY")}
                        onChange={(date) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            expiry: (date as Dayjs).format("YYYY-MM-DD"),
                          }))
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Lot Size"
                      name="lotsize"
                      type="number"
                      value={formData.lotsize}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Lot"
                      name="numberlot"
                      type="number"
                      value={formData.numberlot}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Buy Quantity"
                      name="buyqty"
                      type="number"
                      value={formData.buyqty}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Buy Price"
                      name="buyprice"
                      type="number"
                      value={formData.buyprice}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Sell Quantity"
                      name="sellqty"
                      type="number"
                      value={formData.sellqty}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Sell Price"
                      name="sellprice"
                      type="number"
                      value={formData.sellprice}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Box pt={2} display="flex" width="100%" justifyContent="center">
                  <Button
                    className="submit"
                    type="submit"
                    variant="contained"
                    color="success"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Form;
