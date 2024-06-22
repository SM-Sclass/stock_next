import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ResultSetHeader } from 'mysql2';
import { buy_net_price, sell_net_price } from '@/helpers/net_price';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { username, date, item, expiry, lotsize, numberlot, buyqty, buyprice, sellqty, sellprice } = request;
  
    if (!username || !date || !item || !expiry || !lotsize || !numberlot || !buyqty || !buyprice) {
      return NextResponse.json({ message: 'Please fill out all required fields' }, { status: 400 });
    }
  
    const connection = await connectDB();
    const net_buy_price:number = buy_net_price(buyprice);
    let query;
    let values;
  
    if (sellqty && sellprice) {
      const net_sell_price:number = sell_net_price(sellprice); 
      query = 'INSERT INTO main (username, date, item, expiry, lot_size, no_of_lot, buy_qty, buy_price, buy_net_price, sell_qty, sell_price, sell_net_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      values = [username, date, item, expiry, lotsize, numberlot, buyqty, buyprice, sellqty, sellprice, net_sell_price];

    } else {
      query = 'INSERT INTO main (username, date, item, expiry, lot_size, no_of_lot, buy_qty, buy_price, buy_net_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      values = [username, date, item, expiry, lotsize, numberlot, buyqty, buyprice, net_buy_price];
    }
  
    const [result] = await connection.query<ResultSetHeader>(query, values);
    const insertId = result.insertId;
  
    console.log("Inserted trade with ID:", result);
    return NextResponse.json({ message: 'Trade saved successfully', tradeId: insertId }, { status: 201 });


  } catch (error: any) {
    console.error('Error saving trade:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
