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
  FormControl,
  ListItem,
  ListItemText,
  List,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { searchUser } from "@/helpers/search";

interface FormData {
  username: string;
  uid: number;
  date: string;
  item: string;
  expiry: string | null;
  lotsize: string;
  numberlot: string;
  buyqty: number;
  sellqty: string;
  sellprice: string;
  buyprice: string;
  week: string;
}

const Form: React.FC = () => {
  const [searchResults, setSearchResults] = useState<
    { id: number; username: string }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userN, setuserN] = useState<string>("");

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    uid: 0,
    date: dayjs().format("DD/MM/YYYY"),
    item: "",
    expiry: null,
    lotsize: "",
    numberlot: "",
    buyqty: 0,
    sellqty: "",
    sellprice: "",
    buyprice: "",
    week: "",
  });

  useEffect(() => {
    const lotsize = parseFloat(formData.lotsize) || 0;
    const numberlot = parseFloat(formData.numberlot) || 0;
    setFormData((prevData) => ({
      ...prevData,
      buyqty: lotsize * numberlot,
    }));
  }, [formData.lotsize, formData.numberlot]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        const data = await searchUser(searchQuery);
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      uid: selectedUserId !== null ? selectedUserId : 0,
      username: userN,
    }));
  }, [selectedUserId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: (keyof FormData)[] = [
      "username",
      "uid",
      "date",
      "item",
      "expiry",
      "lotsize",
      "numberlot",
      "buyqty",
      "buyprice",
    ];

    for (let key of requiredFields) {
      if (formData[key] === "" || formData[key] === null) {
        alert(`Please fill out the ${key} field.`);
        return;
      }
    }

    const dataToSubmit = {
      ...formData,
      date: dayjs(formData.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      expiry: formData.expiry
        ? dayjs(formData.expiry, "DD/MM/YYYY").format("YYYY-MM-DD")
        : null,
      lotsize: parseFloat(formData.lotsize),
      numberlot: parseFloat(formData.numberlot),
      buyprice: parseFloat(formData.buyprice),
      sellqty: formData.sellqty === "" ? 0 : parseFloat(formData.sellqty),
      sellprice: formData.sellprice === "" ? 0 : parseFloat(formData.sellprice),
    };

    const response = await fetch("/api/savetrade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    });

    if (response.ok) {
      alert("Form submitted successfully");
    } else {
      alert("Failed to submit the form");
    }
  };

  // Function to get the next Friday
  const getNextFriday = (date: Dayjs): Dayjs => {
    let nextFriday = date.day(5); // 5 represents Friday
    if (nextFriday.isBefore(date)) {
      nextFriday = nextFriday.add(1, "week");
    }
    return nextFriday;
  };

  useEffect(() => {
    if (formData.date) {
      const expiryDate = getNextFriday(dayjs(formData.date, "DD/MM/YYYY"));
      setFormData((prevData) => ({
        ...prevData,
        expiry: expiryDate.format("DD/MM/YYYY"),
      }));
    }
  }, [formData.date]);

  return (
    <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Box maxWidth={"md"}>
        <Card elevation={4} sx={{ maxHeight: "75vh", overflow: "auto" }}>
          <CardHeader title="Trading details" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="username"
                  />
                  {searchResults.length > 0 && (
                    <List>
                      {searchResults.map((user) => (
                        <ListItem
                          button
                          key={user.id}
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setuserN(user.username);
                          }}
                        >
                          <ListItemText primary={user.username} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete 
                  value={formData.week || ""}
                  onChange={(a,value)=>{
                    setFormData((prevData) => ({
                      ...prevData,
                    week:value as string
                    }))


                  }}
                  options={["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]} renderInput={e=><TextField label="Select Week" {...e}/>}/>
                  
                 
            
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <DatePicker
                      label="Date"
                      value={dayjs(formData.date, "DD/MM/YYYY")}
                      onChange={(date) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          date: date?.format("DD/MM/YYYY") || "",
                        }))
                      }
                      
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
                      label="Expiry (Next Friday)"
                      value={
                        formData.expiry
                          ? dayjs(formData.expiry, "DD/MM/YYYY")
                          : null
                      }
                      onChange={(date) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          expiry: date?.format("DD/MM/YYYY") || "",
                        }))
                      }
                      
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Lot size"
                    name="lotsize"
                    type="number"
                    value={formData.lotsize}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="No of lot"
                    name="numberlot"
                    type="number"
                    value={formData.numberlot}
                    onChange={handleChange}//edit the text
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Buy quantity"
                    name="buyqty"
                    type="number"
                    value={formData.buyqty}
                    onChange={handleChange}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Buy price"
                    name="buyprice"
                    type="number"
                    value={formData.buyprice}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sell quantity"
                    name="sellqty"
                    type="number"
                    value={formData.sellqty}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Sell price"
                    name="sellprice"
                    type="number"
                    value={formData.sellprice}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{ pt: 2, display: "flex", width: "100%", justifyContent: "center" }}
              >
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Form;
