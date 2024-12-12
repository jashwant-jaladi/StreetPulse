import prisma from '@/libs/db';

export const GET = async (req) => {
  try {
    const blogs = await prisma.blogs.findMany({
      take: 3, // Limit to 3 blogs
    });
    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), {
      status: 500,
    });
  }
};
