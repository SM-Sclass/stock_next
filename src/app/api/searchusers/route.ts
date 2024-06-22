import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';

export  async function GET(req: NextRequest) {
    try {
        const request = await req.json()
        const connection = await connectDB()
        const {q} = request;
      const [rows] = await connection.query('SELECT id, username FROM users WHERE username LIKE ?', [`%${q}%`]);
    } catch (error:any) {
        console.error('Error in searching user:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
