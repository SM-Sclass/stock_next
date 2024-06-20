"use client"
import { useEffect, useState, useRef } from "react";
import protobuf from 'protobufjs';
import { Buffer } from 'buffer/';
import "./page.css"; // Import your CSS file
interface StockData {
    id: string;
    price: number;
}
const stockNames = [

    "ASIANPAINT.NS", "BRITANNIA.NS", "CIPLA.NS", "EICHERMOT.NS", "NESTLEIND.NS",
    "GRASIM.NS", "HEROMOTOCO.NS", "HINDALCO.NS", "HINDUNILVR.NS", "ITC.NS",
    "LT.NS", "M&M.NS", "RELIANCE.NS", "TATACONSUM.NS", "TATAMOTORS.NS",
    "TATASTEEL.NS", "WIPRO.NS", "APOLLOHOSP.NS", "DRREDDY.NS", "TITAN.NS",
    "SBIN.NS", "SHRIRAMFIN.NS", "BPCL.NS", "KOTAKBANK.NS", "INFY.NS",
    "BAJFINANCE.NS", "ADANIENT.NS", "SUNPHARMA.NS", "JSWSTEEL.NS",
    "HDFCBANK.NS", "TCS.NS", "ICICIBANK.NS", "POWERGRID.NS", "MARUTI.NS",
    "INDUSINDBK.NS", "AXISBANK.NS", "HCLTECH.NS", "ONGC.NS", "NTPC.NS",
    "COALINDIA.NS", "BHARTIARTL.NS", "TECHM.NS", "LTIM.NS", "DIVISLAB.NS",
    "ADANIPORTS.NS", "HDFCLIFE.NS", "SBILIFE.NS", "ULTRACEMCO.NS",
    "BAJAJ-AUTO.NS", "BAJAJFINSV.NS",
    "^NSEBANK", "BTC-USD",
    "HDFCBANK.NS", "ICICIBANK.NS", "KOTAKBANK.NS", "AXISBANK.NS", "SBIN.NS",
    "INDUSINDBK.NS", "RBLBANK.NS", "FEDERALBNK.NS", "PNB.NS", "BANKBARODA.NS",
    "IDFCFIRSTB.NS", "BANDHANBNK.NS", "AUROPHARMA.NS", "BIOCON.NS",
    "CADILAHC.NS", "CIPLA.NS", "DIVISLAB.NS", "DRREDDY.NS", "LUPIN.NS",
    "SUNPHARMA.NS", "TORNTPHARM.NS", "ALKEM.NS", "AUROPHARMA.NS",
    "CUMMINSIND.NS", "HAVELLS.NS", "HONEYWELL.NS", "THERMAX.NS",
    "VGUARD.NS", "WHIRLPOOL.NS", "BATAINDIA.NS", "DMART.NS",
    "FUTURECONSUMER.NS", "TITAN.NS", "APOLLOHOSP.NS", "DRREDDY.NS",
    "FORTIS.NS", "LALPATHLAB.NS", "DIVISLAB.NS", "BIOCON.NS",
    "SUNPHARMA.NS", "ALKEM.NS", "AUROPHARMA.NS", "CUMMINSIND.NS",
    "HAVELLS.NS", "HONEYWELL.NS", "THERMAX.NS", "VGUARD.NS",
    "WHIRLPOOL.NS", "BATAINDIA.NS", "DMART.NS", "FUTURECONSUMER.NS",
    "TITAN.NS", "APOLLOHOSP.NS", "DRREDDY.NS", "FORTIS.NS",
    "LALPATHLAB.NS", "DIVISLAB.NS", "ADANIGREEN.NS", "ADANIPORTS.NS",
    "ADANITRANS.NS", "AMBUJACEM.NS", "ASIANPAINT.NS", "AUROPHARMA.NS",
    "AXISBANK.NS", "BAJAJ-AUTO.NS", "BAJAJFINSV.NS", "BAJFINANCE.NS",
    "BANDHANBNK.NS", "BANKBARODA.NS", "BERGEPAINT.NS", "BPCL.NS",
    "BRITANNIA.NS", "CADILAHC.NS", "CIPLA.NS", "COALINDIA.NS",
    "COLPAL.NS", "CONCOR.NS", "DABUR.NS", "DIVISLAB.NS", "DRREDDY.NS",
    "EICHERMOT.NS", "GAIL.NS", "GLENMARK.NS", "GODREJCP.NS",
    "GRASIM.NS", "HAVELLS.NS", "HCLTECH.NS", "HDFC.NS", "HDFCBANK.NS",
    "HDFCLIFE.NS", "HEROMOTOCO.NS", "HINDALCO.NS", "HINDPETRO.NS",
    "HINDUNILVR.NS", "ICICIBANK.NS", "IGL.NS", "INDIGO.NS", "INDUSINDBK.NS",
    "INFY.NS", "IOC.NS", "ITC.NS", "JINDALSTEL.NS", "JSWSTEEL.NS",
    "KOTAKBANK.NS", "L&TFH.NS", "LALPATHLAB.NS", "LICHSGFIN.NS",
    "LT.NS", "LUPIN.NS", "M&M.NS", "MARICO.NS", "MARUTI.NS",
    "MCDOWELL-N.NS", "MFSL.NS", "MINDTREE.NS", "MOTHERSUMI.NS",
    "MPHASIS.NS", "MRF.NS", "NAM-INDIA.NS", "NATIONALUM.NS",
    "NAUKRI.NS", "NESTLEIND.NS", "NMDC.NS", "NTPC.NS", "ONGC.NS",
    "PAGEIND.NS", "PEL.NS", "PETRONET.NS", "PFC.NS", "PIDILITIND.NS",
    "PNB.NS", "POWERGRID.NS", "PVR.NS", "RAMCOCEM.NS", "RECLTD.NS",
    "RELIANCE.NS", "SAIL.NS", "SBILIFE.NS", "SBIN.NS", "SHREECEM.NS",
    "SIEMENS.NS", "SRF.NS", "SRTRANSFIN.NS", "STAR.NS", "SUNPHARMA.NS",
    "TATACONSUM.NS", "TATAMOTORS.NS", "TATAPOWER.NS", "TATASTEEL.NS",
    "TCS.NS", "TECHM.NS", "TITAN.NS", "TORNTPHARM.NS", "TORNTPOWER.NS",
    "TVSMOTOR.NS", "UBL.NS", "ULTRACEMCO.NS", "UPL.NS", "VEDL.NS",
    "VOLTAS.NS", "WIPRO.NS", "ZEEL.NS", "ADANIPORTS.NS", "ASIANPAINT.NS",
    "AXISBANK.NS", "BAJAJ-AUTO.NS", "BAJAJFINSV.NS", "BAJFINANCE.NS",
    "BHARTIARTL.NS", "BPCL.NS", "BRITANNIA.NS", "CIPLA.NS", "COALINDIA.NS",
    "DIVISLAB.NS", "DRREDDY.NS", "EICHERMOT.NS", "GRASIM.NS", "HCLTECH.NS",
    "HDFC.NS", "HDFCBANK.NS", "HEROMOTOCO.NS", "HINDALCO.NS", "HINDUNILVR.NS",
    "ICICIBANK.NS", "INDUSINDBK.NS", "INFY.NS", "ITC.NS", "JSWSTEEL.NS",
    "KOTAKBANK.NS", "LT.NS", "M&M.NS", "MARUTI.NS", "NESTLEIND.NS", "ONGC.NS",
    "POWERGRID.NS", "RELIANCE.NS"

];
export default function Live() {
    const [currentStocks, setCurrentStocks] = useState<Record<string, StockData>>({});
    const previousStocks = useRef<Record<string, StockData>>({});
    const [marketOpen, setMarketOpen] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [highlightedStock, setHighlightedStock] = useState('');
    useEffect(() => {
        const ws = new WebSocket('wss://streamer.finance.yahoo.com');
        protobuf.load('./YPricingData.proto', (error, root) => {
            if (error || !root) {
                console.error('Failed to load protobuf:', error);
                return;
            }
            const Yaticker = root.lookupType("yaticker");
            ws.onopen = function open() {
                console.log('connected');
                ws.send(JSON.stringify({
                    subscribe: stockNames
                }));
            };
            ws.onclose = function close() {
                console.log('disconnected');
            };
            ws.onmessage = function incoming(message) {
                console.log('incoming message');
                const decodedMessage = Yaticker.decode(new Buffer(message.data, 'base64'));
                const next = decodedMessage as unknown as StockData;
                setCurrentStocks(prevStocks => {
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
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchInput(value);
        if (value) {
            const filteredResults = stockNames.filter(stock =>
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
        setSearchInput('');
        setSearchResults([]);
    };
    const moveStockToTop = (stockId: string) => {
        const filteredStocks = stockNames.filter(stock => stock !== stockId);
        return [stockId, ...filteredStocks];
    };

    return (
        <>
            <h1>{marketOpen ? 'Market is open ❤️' : 'Market is closed 💔'}</h1>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <label htmlFor="search-input">Enter stock symbol:</label>
                <input
                    type="text"
                    id="search-input"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <button type="submit">Search</button>
            </form>
            {searchResults.length > 0 && (
                <ul className="search-results">
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            <div
                                className={`stock-box ${highlightedStock === result ? 'highlighted' : ''}`}
                                onClick={() => setHighlightedStock(result)}
                            >
                                <h4>{result}</h4>
                                <p>{currentStocks[result]?.price ? `Current Price: ${currentStocks[result]?.price.toFixed(2)}` : 'Price unavaila'} </p>
                                </div>
                        </li>
                        ))}
                </ul>
                )}
                            <div className="stock-container">
                                {moveStockToTop(highlightedStock).map(stockId => {
                                    const currentPrice = currentStocks[stockId]?.price || 0; // Assuming price is a number
                                    const previousPrice = previousStocks.current[stockId]?.price || 0;
                                    const isPriceIncreased = previousPrice && currentPrice > previousPrice;
                                    const isPriceDecreased = previousPrice && currentPrice < previousPrice;
                                    return (
                                    <div
                                            key={stockId}
                                            className={`stock-box ${stockId === highlightedStock ? 'highlighted' : ''} ${isPriceIncreased ? 'price-increase':''}`} >
                                                < h4 > { stockId }</h4>
                                            <p>{currentPrice.toFixed(2)}</p>
                                   </div>
                                    );
                                })}
                            </div>
                
        </> 
    );
}

