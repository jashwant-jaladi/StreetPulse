import { NextResponse } from "next/server";
import connect from "../../db_connect";
import Register from "@/app/models/register";

export async function POST(req) {
    try {
      await connect();
      const { email } = await req.json();
      const user = await Register.findOne({ email }).select('_id');
      
      if (!user) {
        return NextResponse.json({ user: null });
      }
  
      console.log(user);
      return NextResponse.json({ user });
    } catch (error) {
      console.error(error);
      return NextResponse.error("An error occurred while processing the request.");
    }
  }
  