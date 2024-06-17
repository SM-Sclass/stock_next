import { NextResponse , NextRequest} from "next/server";
import connectDB from "@/lib/db";
import bcryptjs from 'bcryptjs'

export async function POST(request:NextRequest){
    try {
        const connection = await connectDB();
        const req= await request.json()
        const { email, password } = req;
        
        let query: string = 'SELECT * FROM users WHERE email =? ';
        const [rows] = await connection.execute(query, [email]);
       
        if (rows) {
            return NextResponse.json({ message: 'User already exists' },{status:400});
          
       } 
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password , salt);
        query = 'INSERT INTO users VALUES(?,?,?)';
        const newUser = await connection.execute(query,[email,hashedpassword])
        console.log(newUser)



        connection.end();


    } catch (error:any) {
        return NextResponse.json({ERror:error.message},{status:500})
    }
}