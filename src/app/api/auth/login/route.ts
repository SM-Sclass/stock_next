import { NextResponse , NextRequest} from "next/server";
import connectDB from "@/lib/db";

export async function POST(request:NextRequest){
    try {
        const connection = await connectDB();
        console.log("here")
        const req= await request.json()
        const { email, password } = req;
        
        const query:string = 'INSERT INTO users values * FROM users WHERE email = ? AND password = ?';
        const [rows] = await connection.query('INSERT INTO users values * FROM users WHERE email = ? AND password = ?' ,[1 ,"88i" , email , password]);
        if (!rows) {
            return NextResponse.json({ message: 'User already exists' });
          }
    

        if (rows) {
            console.log("these is ROW" , rows)
            return NextResponse.json({status:200})
           
        } else {
            console.log("these is ROW" , rows)
            return NextResponse.json({status:401})

        }

        // Close the database connection
        connection.end();
        // const connection = await connectDB()

    } catch (error:any) {
        return NextResponse.json({Error:error.message},{status:500})
    }
}