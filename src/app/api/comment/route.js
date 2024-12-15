import prisma from "@/libs/db";
import { getSession } from "next-auth/react";


export async function POST(req) {
  try {
    const { content, blogId, userId } = await req.json();

    console.log(blogId, userId, content)
    if (!content || !blogId || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!userExists) {
      return new Response(
        JSON.stringify({ error: "User does not exist." }),
        { status: 400 }
      );
    }
   
    const newComment = await prisma.comment.create({
      data: {
        content,
        blogId: parseInt(blogId, 10),
        userId: parseInt(userId, 10),
      },
      include : {
        user: {
          select: { name: true }, // Include only the username
        },
      },
    });

    return new Response(
      JSON.stringify({ message: "Comment added successfully.", comment: newComment }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving comment:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while adding the comment." }),
      { status: 500 }
    );
  }
}


export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const blogId = searchParams.get("blogId");
  
      if (!blogId) {
        return new Response(
          JSON.stringify({ error: "Blog ID is required." }),
          { status: 400 }
        );
      }
  
      // Fetch comments for the given blog ID
      const comments = await prisma.comment.findMany({
        where: { blogId: parseInt(blogId, 10) },
        include: {
          user: {
            select: { name: true }, // Include only the username
          },
        },
        orderBy: { createdAt: "desc" }, // Order by most recent first
      });
  
      return new Response(
        JSON.stringify({ comments }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching comments:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while fetching comments." }),
        { status: 500 }
      );
    }
  }
  
 
export async function DELETE(req) {
    try {
      const { searchParams } = new URL(req.url);
      const commentId = searchParams.get("commentId");
  
      if (!commentId) {
        return new Response(
          JSON.stringify({ error: "Comment ID is required." }),
          { status: 400 }
        );
      }
  
      // Delete the comment with the given ID
      await prisma.comment.delete({
        where: { id: parseInt(commentId, 10) },
      });
  
      return new Response(
        JSON.stringify({ message: "Comment deleted successfully." }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
      return new Response(
        JSON.stringify({ error: "An error occurred while deleting the comment." }),
        { status: 500 }
      );
    }
  }