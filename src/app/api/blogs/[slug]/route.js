import { NextResponse } from "next/server";
import connect from "../../../db_connect";
import blog from "@/app/models/blogs";

export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        await connect();
        const foundBlog = await blog.findById({_id: slug})
        if (!foundBlog) {
            return new NextResponse("Blog not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(foundBlog), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
