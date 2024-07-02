"use client";

import { getDateOfWeek, formatDate, cutFormatDate } from "../weekService/page";
import React, { FormEvent, useEffect, useState } from "react";
import { submitDate } from "../billD/route";
import * as XLSX from "xlsx";
import {
  Autocomplete,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

interface User {
  id: string;
  username: string;
}

function Bill() {
  const [date, setDate] = useState<Dayjs>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [result, setResult] = useState<
    {
      id: string;
      username: string;
      item: string;
      date: string;
      expiry: string;
      lot_size: string;
      no_of_lot: string;
      buy_qty: string;
      buy_price: string;
      buy_net_price: string;
      sell_qty: string;
      sell_price: string;
      sell_net_price: string;
      pnl: string;
      net_qty: string;
      cmp: string;
      mtm: string;
      net: string;
    }[]
  >([]);

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        if (searchQuery.length > 2) {
          const response = await fetch(`/api/searchusers?q=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);
          console.log("THIS IS DATA", data);
        } else {
          setSearchResults([]);
        }
      };

      fetchSearchResults();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (date) {
      console.log("Current date : ", date);
      const dateString = date.toDate();
      const result = getDateOfWeek(dateString);
      const { start, end } = result.range;
      console.log(start);
      const newStart = start.toLocaleDateString();
      const newEnd = end.toLocaleDateString();
      const SD = formatDate(newStart);
      const ED = formatDate(newEnd);
      setStart(SD);
      setEnd(ED);
      console.log(SD);
      console.log(startDate);
      console.log(ED);
    }
  }, [date]);

  const submitform = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(startDate, endDate);
    if (selectedUser && startDate && endDate) {
      console.log("HERE");
      const result = await submitDate(selectedUser.id, startDate, endDate);
      console.log("RESULT ", result);
      setResult(result);
    }
    console.log(result);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(result);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BillData");
    XLSX.writeFile(wb, "BillData.xlsx");
  };
  console.log(result);

  return (
    <>
      <Card elevation={6}>
        <CardHeader>Bill</CardHeader>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <Box component="form" onSubmit={submitform}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Autocomplete
                inputValue={searchQuery}
                sx={{
                  width: "300px",
                }}
                options={searchResults}
                value={selectedUser}
                getOptionKey={(e) => e.id}
                getOptionLabel={(e) => e.username}
                onInputChange={(_, value) => setSearchQuery(value)}
                onChange={(_, value) => setSelectedUser(value)}
                renderInput={(e) => (
                  <TextField
                    {...e}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Search for a username"
                    label={"Search user"}
                  />
                )}
              />
              <DatePicker value={date} onChange={(e) => setDate(e as Dayjs)} />
            </Box>
            <Box pt={2} display={"flex"} gap={2} justifyContent={"center"}>
              <Button type="submit" variant="contained" color="success">
                Generate Bill
              </Button>

              <Button
                variant="outlined"
                color="warning"
                className="exporttoexcel"
                onClick={exportToExcel}
              >
                Export to Excel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Lot Size</TableCell>
              <TableCell>No of Lot</TableCell>
              <TableCell>Buy Qty</TableCell>
              <TableCell>Buy Price</TableCell>
              <TableCell>Buy Net Price</TableCell>
              <TableCell>Sell Qty</TableCell>
              <TableCell>Sell Price</TableCell>
              <TableCell>Sell Net Price</TableCell>
              <TableCell>PNL</TableCell>
              <TableCell>Net Qty</TableCell>
              <TableCell>CMP</TableCell>
              <TableCell>MTM</TableCell>
              <TableCell>PNL</TableCell>
              <TableCell>NET</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {result?.map?.((results) => (
              <TableRow key={results.id}>
                <TableCell>{results.username}</TableCell>
                <TableCell>{results.item}</TableCell>
                <TableCell>{cutFormatDate(results.date)}</TableCell>
                <TableCell>{cutFormatDate(results.expiry)}</TableCell>
                <TableCell>{results.lot_size}</TableCell>
                <TableCell>{results.no_of_lot}</TableCell>
                <TableCell>{results.buy_qty}</TableCell>
                <TableCell>{results.buy_price}</TableCell>
                <TableCell>{results.buy_net_price}</TableCell>
                <TableCell>{results.sell_qty}</TableCell>
                <TableCell>{results.sell_price}</TableCell>
                <TableCell>{results.sell_net_price}</TableCell>
                <TableCell>{results.pnl}</TableCell>
                <TableCell>{results.net_qty}</TableCell>
                <TableCell>{results.cmp}</TableCell>
                <TableCell>{results.mtm}</TableCell>
                <TableCell>{results.pnl}</TableCell>
                <TableCell>{results.net}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Bill;
