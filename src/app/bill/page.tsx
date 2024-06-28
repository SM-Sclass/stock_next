"use client";

import { Button } from "@/components/ui/button";
import { getDateOfWeek, formatDate, cutFormatDate } from "../weekService/page";
import "./page.css";
import React, { FormEvent, useEffect, useState } from "react";
import { submitDate } from "../billD/route";
import * as XLSX from "xlsx";

function Bill() {
  const [date, setDate] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    { id: number; username: string }[]
  >([]);
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
      const dateString = new Date(date);
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
    if (selectedUserId && startDate && endDate) {
      console.log("HERE");
      const result = await submitDate(
        selectedUserId.toString(),
        startDate,
        endDate
      );
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

  // Create 20 empty rows
  const emptyRows = Array.from({ length: 20 }, (_, index) => (
    <div className="table-row" key={`empty-${index}`}>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
      <div className="table-cell"></div>
    </div>
  ));

  return (
    <div className="bill-container">
      <h1 className="Billtext">Bill</h1>
      <div className="boxofbill">
        <div className="search-container">
          
            <form onSubmit={submitform}>
              <div className="user">
                Search Username:
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a username"
                  className="search-input"
                />
                {searchResults.length > 0 && (
                  <ul className="bg-black text-white">
                    {searchResults.map((user) => (
                      <li
                        className="border"
                        key={user.id}
                        onClick={() => {
                          setSelectedUserId(user.id);
                          setSearchQuery(user.username);
                        }}
                      >
                        {user.username}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="dateouterbox">
                
                <h2 className="inputdate">input date :</h2> 
                <div className="datebox">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <button className="search-button" type="submit">
                <div className="generate">Generate BILL</div>
              </button>
            </form>

          <div className="excel">
            <Button className="exporttoexcel" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>
        </div>
      </div>

      <div className="exclebox">
        <div className="table-container">
          <div className="table-header">Name</div>
          <div className="table-header">Item</div>
          <div className="table-header">Date</div>
          <div className="table-header">Expiry</div>
          <div className="table-header">Lot Size</div>
          <div className="table-header">No of Lot</div>
          <div className="table-header">Buy Qty</div>
          <div className="table-header">Buy Price</div>
          <div className="table-header">Buy Net Price</div>
          <div className="table-header">Sell Qty</div>
          <div className="table-header">Sell Price</div>
          <div className="table-header">Sell Net Price</div>
          <div className="table-header">PNL</div>
          <div className="table-header">Net Qty</div>
          <div className="table-header">CMP</div>
          <div className="table-header">MTM</div>
          <div className="table-header">PNL</div>
          <div className="table-header">NET</div>

          {result.map((results) => (
            <div className="table-row" key={results.id}>
              <div className="table-cell">{results.username}</div>
              <div className="table-cell">{results.item}</div>
              <div className="table-cell">{cutFormatDate(results.date)}</div>
              <div className="table-cell">{results.expiry}</div>
              <div className="table-cell">{results.lot_size}</div>
              <div className="table-cell">{results.no_of_lot}</div>
              <div className="table-cell">{results.buy_qty}</div>
              <div className="table-cell">{results.buy_price}</div>
              <div className="table-cell">{results.buy_net_price}</div>
              <div className="table-cell">{results.sell_qty}</div>
              <div className="table-cell">{results.sell_price}</div>
              <div className="table-cell">{results.sell_net_price}</div>
              <div className="table-cell">{results.pnl}</div>
              <div className="table-cell">{results.net_qty}</div>
              <div className="table-cell">{results.cmp}</div>
              <div className="table-cell">{results.mtm}</div>
              <div className="table-cell">{results.pnl}</div>
              <div className="table-cell">{results.net}</div>
            </div>
          ))}

          {emptyRows}
        </div>
      </div>
    </div>
  );
}

export default Bill;
