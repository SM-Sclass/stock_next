import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
export async function POST(request:NextRequest) {
    try {
        const connection = await connectDB();
        const req = await request.json()
        const { email, password } = req;
        let query: string = 'SELECT * FROM users WHERE email =?';
        const [result] = await connection.query(query, [email]);
        const rows = result as any[];
        console.log("start", rows, "rowss")
        if (rows.length > 0) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });

        }
        else {

            const salt = await bcryptjs.genSalt(10);
            const hashedpassword = await bcryptjs.hash(password, salt);
            query = 'INSERT INTO users(email,password) VALUES(?,?)';
            const [newUser] = await connection.query(query, [email, hashedpassword])
            const insertId = (newUser as any).insertId;
            console.log("THIS IS NEW USER",insertId)

            await sendEmail({email , emailType:"VERIFY" , userId :insertId})

            return NextResponse.json({ message: 'new user',
                success:true
             }, { status: 200 });
        }



        connection.end();

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}