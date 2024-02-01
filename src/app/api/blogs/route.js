import { NextResponse } from "next/server";
import connect from "../../db_connect";
import blog from "@/app/models/blogs";

export const GET = async (req) => {
    try
    {
        await connect()
        const data = await blog.find()
        return NextResponse.json(data)
    }catch(error)
    {
        return NextResponse.json(error)
    }
}