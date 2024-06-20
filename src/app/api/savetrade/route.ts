import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { ResultSetHeader,RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { username, date, item, expiry, lotsize, numberlot, buyqty, sell, sellprice } = request;

    if (!username || !date || !item || !expiry || !lotsize || !numberlot || !buyqty || !sell || !sellprice) {
      return NextResponse.json({ message: 'Please fill out all fields' }, { status: 400 });
    }

    const connection = await connectDB();

    // Fetch user ID based on username
    let query = 'SELECT id FROM users WHERE username = ?';
    const [userDetails] = await connection.query<RowDataPacket[]>(query, [username]);

    if (userDetails.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userId = userDetails[0].id;

    // Insert trade details
    query = 'INSERT INTO main (user_id, date, item, expiry, lot_size, no_of_lot, buy_qty, sell_qty, sell_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.query<ResultSetHeader>(query, [userId, date, item, expiry, lotsize, numberlot, buyqty, sell, sellprice]);

    const insertId = result.insertId; // Access the insertId from the ResultSetHeader
    console.log("Inserted trade with ID:", insertId);

    return NextResponse.json({ message: 'Trade saved successfully', tradeId: insertId }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving trade:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
