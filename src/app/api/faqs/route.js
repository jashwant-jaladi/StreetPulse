import { NextResponse } from "next/server";
import connect from "../../db_connect";
import FaqModel from "@/app/models/faqs";

export const GET = async (req) => {
    try
    {
        await connect()
        const data = await FaqModel.find()
        return NextResponse.json(data)
    }catch(error)
    {
        return NextResponse.json(error)
    }
}