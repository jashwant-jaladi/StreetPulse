import Register from "@/app/models/register";
import connect from "../../db_connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req)
{
    try{
        const {name, email, password, confirmPassword} = await req.json();
        const hashedPassword= await bcrypt.hash(password,10)
        const hashedConfirmPassword=await bcrypt.hash(confirmPassword,10)
        await connect()
        await Register.create({name, email, password:hashedPassword, confirmPassword:hashedConfirmPassword})
        return NextResponse.json({message:"user registered"}, 
                        {status:200})
    }catch(error)
    {
        return NextResponse.json({message:"error occurred while registering the user"}, {status:400})
    }
}