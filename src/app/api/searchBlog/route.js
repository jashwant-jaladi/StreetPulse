import prisma from "@/libs/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify({ blogs: [] }), { status: 200 });
  }

  const blogs = await prisma.blogs.findMany({
    where: {
      title: {
        contains: query,
        mode: 'insensitive', // Case-insensitive search
      },
    },
  });

  return new Response(JSON.stringify({ blogs }), { status: 200 });
}
