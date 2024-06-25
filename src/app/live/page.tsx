"use client";
import { useEffect, useState, useRef } from "react";
import protobuf from "protobufjs";
import { Buffer } from "buffer/";
import "./page.css"; // Import your CSS file
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface StockData {
  id: string;
  price: number;
}
const stockNames = [
  "RELIANCE.NS",
  "TCS.NS",
  "HDFCBANK.NS",
  "ICICIBANK.NS",
  "BHARTIARTL.NS",
  "SBIN.NS",
  "INFY.NS",
  "LICI.NS",
  "ITC.NS",
  "HINDUNILVR.NS",
  "LT.NS",
  "BAJFINANCE.NS",
  "HCLTECH.NS",
  "MARUTI.NS",
  "SUNPHARMA.NS",
  "ADANIENT.NS",
  "KOTAKBANK.NS",
  "TITAN.NS",
  "ONGC.NS",
  "TATAMOTORS.NS",
  "NTPC.NS",
  "AXISBANK.NS",
  "DMART.NS",
  "ADANIGREEN.NS",
  "ADANIPORTS.NS",
  "ULTRACEMCO.NS",
  "ASIANPAINT.NS",
  "COALINDIA.NS",
  "BAJAJFINSV.NS",
  "BAJAJ-AUTO.NS",
  "POWERGRID.NS",
  "NESTLEIND.NS",
  "WIPRO.NS",
  "M&M.NS",
  "IOC.NS",
  "JIOFIN.NS",
  "HAL.NS",
  "DLF.NS",
  "ADANIPOWER.NS",
  "JSWSTEEL.NS",
  "TATASTEEL.NS",
  "SIEMENS.NS",
  "IRFC.NS",
  "VBL.NS",
  "ZOMATO.NS",
  "PIDILITIND.NS",
  "GRASIM.NS",
  "SBILIFE.NS",
  "BEL.NS",
  "LTIM.NS",
  "TRENT.NS",
  "PNB.NS",
  "INDIGO.NS",
  "BANKBARODA.NS",
  "HDFCLIFE.NS",
  "ABB.NS",
  "BPCL.NS",
  "PFC.NS",
  "GODREJCP.NS",
  "TATAPOWER.NS",
  "HINDALCO.NS",
  "HINDZINC.NS",
  "TECHM.NS",
  "AMBUJACEM.NS",
  "INDUSINDBK.NS",
  "CIPLA.NS",
  "GAIL.NS",
  "RECLTD.NS",
  "BRITANNIA.NS",
  "UNIONBANK.NS",
  "ADANIENSOL.NS",
  "IOB.NS",
  "LODHA.NS",
  "EICHERMOT.NS",
  "CANBK.NS",
  "TATACONSUM.NS",
  "DRREDDY.NS",
  "TVSMOTOR.NS",
  "ZYDUSLIFE.NS",
  "ATGL.NS",
  "VEDL.NS",
  "CHOLAFIN.NS",
  "HAVELLS.NS",
  "HEROMOTOCO.NS",
  "DABUR.NS",
  "SHREECEM.NS",
  "MANKIND.NS",
  "BAJAJHLDNG.NS",
  "DIVISLAB.NS",
  "APOLLOHOSP.NS",
  "NHPC.NS",
  "SHRIRAMFIN.NS",
  "BOSCHLTD.NS",
  "TORNTPHARM.NS",
  "ICICIPRULI.NS",
  "IDBI.NS",
  "JSWENERGY.NS",
  "JINDALSTEL.NS",
  "BHEL.NS",
  "INDHOTEL.NS",
  "CUMMINSIND.NS",
  "ICICIGI.NS",
];
export default function Live() {
  const [currentStocks, setCurrentStocks] = useState<Record<string, StockData>>(
    {}
  );
  const previousStocks = useRef<Record<string, StockData>>({});
  const [marketOpen, setMarketOpen] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [highlightedStock, setHighlightedStock] = useState("");
  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");
    protobuf.load("./YPricingData.proto", (error, root) => {
      if (error || !root) {
        console.error("Failed to load protobuf:", error);
        return;
      }
      const Yaticker = root.lookupType("yaticker");
      ws.onopen = function open() {
        console.log("connected");
        ws.send(
          JSON.stringify({
            subscribe: stockNames,
          })
        );
      };
      ws.onclose = function close() {
        console.log("disconnected");
      };
      ws.onmessage = function incoming(message) {
        console.log("incoming message");
        const decodedMessage = Yaticker.decode(
          new Buffer(message.data, "base64")
        );
        const next = decodedMessage as unknown as StockData;
        setCurrentStocks((prevStocks) => {
          const newStocks = { ...prevStocks, [next.id]: next };
          previousStocks.current[next.id] = prevStocks[next.id];
          return newStocks;
        });
        // Update previousStocks.current for comparison
        previousStocks.current[next.id] = currentStocks[next.id];
      };
      return () => {
        ws.close();
      };
    });
    // Check market status
    const checkMarketStatus = () => {
      const now = new Date();
      const marketCloseTime = new Date();
      marketCloseTime.setHours(15, 30, 0); // Market closes at 3:30 PM
      setMarketOpen(now <= marketCloseTime);
    };
    // Check market status initially and then every minute
    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000); // Check every minute
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchInput(value);
    if (value) {
      const filteredResults = stockNames.filter((stock) =>
        stock.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stockSymbol = searchInput.toUpperCase();
    if (stockNames.includes(stockSymbol)) {
      if (!currentStocks[stockSymbol]) {
        alert(`${stockSymbol} is not available at the moment.`);
      } else {
        setHighlightedStock(stockSymbol);
      }
    } else {
      alert(`${stockSymbol} is not a valid stock symbol.`);
    }
    setSearchInput("");
    setSearchResults([]);
  };
  const moveStockToTop = (stockId: string) => {
    const filteredStocks = stockNames.filter((stock) => stock !== stockId);
    return [stockId, ...filteredStocks];
  };

  return (
    <>
      <h1>{marketOpen ? "Market is open ❤️" : "Market is closed 💔"}</h1>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <label className="symbol" htmlFor="search-input">Enter stock symbol:</label>
        <input
          type="text"
          id="search-input"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="futuretetxt">
      <Button className="futurestock"><Link  href="/live/futurestock">FutureStock list</Link></Button>
      </div>
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result, index) => (
            <li key={index}>
              <div
                className={`stock-box ${
                  highlightedStock === result ? "highlighted" : ""
                }`}
                onClick={() => setHighlightedStock(result)}
              >
                <h4>{result}</h4>
                <p>
                  {currentStocks[result]?.price
                    ? `Current Price: ${currentStocks[result]?.price.toFixed(
                        2
                      )}`
                    : "Price unavaila"}{" "}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="stock-container">
        {moveStockToTop(highlightedStock).map((stockId) => {
          const currentPrice = currentStocks[stockId]?.price || 0; // Assuming price is a number
          const previousPrice = previousStocks.current[stockId]?.price || 0;
          const isPriceIncreased =
            previousPrice && currentPrice > previousPrice;
          const isPriceDecreased =
            previousPrice && currentPrice < previousPrice;
          return (
            <div
              key={stockId}
              className={`stock-box ${
                stockId === highlightedStock ? "highlighted" : ""
              } ${isPriceIncreased ? "price-increase" : ""}`}
            >
              <h4> {stockId}</h4>
              <p>{currentPrice.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
