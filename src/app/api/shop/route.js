import { NextResponse } from "next/server";
import connect from "../../db_connect";
import Shop from "@/app/models/shop";

export const GET = async (req) => {
    try
    {
        await connect()
        const data = await Shop.find()
        return NextResponse.json(data)
    }catch(error)
    {
        return NextResponse.json(error)
    }
}