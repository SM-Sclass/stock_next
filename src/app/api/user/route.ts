import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // console.log("Request URL:", req.url);

    // // Extract the ID from the URL
    // const url = new URL(req.url);
    // const id = url.pathname.split('/').pop();
    // console.log("Extracted ID:", id);
    const url = new URL(req.url);
    const q = url.searchParams.get('id') || '';
    if (!q) {
      return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
    }
    const connection = await connectDB();
    const [rows] = await connection.query('SELECT * FROM main WHERE id = ?', [q]);
    console.log(rows)
    const result = rows as any[];
    console.log("After user")
    console.log(result[0])
    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
