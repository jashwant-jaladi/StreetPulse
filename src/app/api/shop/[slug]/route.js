import { NextResponse } from "next/server";
import connect from "../../../db_connect";
import Shop from "@/app/models/shop";

export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        await connect();
        const foundProduct = await Shop.findById({_id: slug})
        if (!foundProduct) {
            return new NextResponse("Product not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(foundProduct), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
