"use client"
import { Button } from "@/components/ui/button";
import { getDateOfWeek, formatDate,cutFormatDate } from "../weekService/page";
import "./page.css";
import React, { ChangeEvent, FormEvent, FormEventHandler, startTransition, useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { submitDate } from "../billD/route";
function Bill() {
    const [date, setDate] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<{ id: number; username: string }[]>([]);
    const [startDate, setStart] = useState("");
    const [endDate, setEnd] = useState("");
    const [result, setResult] = useState<{id:string; username:string; item:string; date:string; buy_price:string ; buy_net_price:string }[]>([]);
    useEffect(() => {
        if (searchQuery) {
            const fetchSearchResults = async () => {
                if (searchQuery.length > 2) {
                    const response = await fetch(`/api/searchusers?q=${searchQuery}`);
                    const data = await response.json();
                    setSearchResults(data);
                    console.log("THIS IS DATA", data)
                } else {
                    setSearchResults([]);
                }
            };

            fetchSearchResults();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (date) {
            console.log("Current date : ", date)
            const dateString = new Date(date)
            const result = getDateOfWeek(dateString)
            const { start, end } = result.range
            console.log(start)
            const newStart = start.toLocaleDateString()
            const newEnd = end.toLocaleDateString()
            const SD = formatDate(newStart);
            const ED = formatDate(newEnd)
            setStart(SD)
            setEnd(ED)
            console.log(SD)
            console.log(startDate)
            console.log(ED)
        }

    }, [date]);

    const submitform = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(startDate, endDate)
        if (selectedUserId && startDate && endDate) {
            console.log("HERE")
            const result = await submitDate(selectedUserId.toString(), startDate, endDate);
            console.log("RESULT ", result)
            setResult(result)
        }
        console.log(result)
    }

    return (
        <div className="bill-container">
            <h1 className="Billtext">Bill</h1>
            <div className="search-container">
                <form onSubmit={submitform}>
                    <label className="user">
                        Search Username:
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for a username"
                        />
                        {searchResults.length > 0 && (
                            <ul className='bg-black text-white'>
                                {searchResults.map((user) => (
                                    <li className='border' key={user.id} onClick={() => {
                                        setSelectedUserId(user.id)
                                        setSearchQuery(user.username)
                                    }}>
                                        {user.username}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </label>

                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <Button className="submit" type="submit" variant="ghost">Generate BILL</Button>
                </form>
                <div>
                    <h1>Details</h1>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Buy Price</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {result.map((results) => (
                            <TableRow key={results.id}>
                                <TableCell>{results.username}</TableCell>
                                <TableCell>{results.item}</TableCell>
                                <TableCell>{cutFormatDate(results.date)}</TableCell>
                                <TableCell>{results.buy_price}</TableCell>
                                <TableCell className="text-right">{results.buy_net_price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}

export default Bill;
