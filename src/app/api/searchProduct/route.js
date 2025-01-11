import prisma from "@/libs/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify({ products: [] }), { status: 200 });
  }

  const products = await prisma.shop.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive', // Case-insensitive search
      },
    },
  });

  return new Response(JSON.stringify({ products }), { status: 200 });
}
