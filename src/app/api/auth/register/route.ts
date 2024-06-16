import { NextResponse , NextRequest} from "next/server";
import connectDB from "@/lib/db";

export async function POST(request:NextRequest){
    try {
        const req= await request.json()
        const { username, email, password } = req;
        console.log(req)
        return NextResponse.json({status:200})
        // const connection = await connectDB()

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}