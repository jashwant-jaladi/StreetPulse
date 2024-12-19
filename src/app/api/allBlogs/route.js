import prisma from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Note: using Blogs (capitalized) to match your model name
        const blogs = await prisma.blogs.findMany({
            select: {
                id: true,
                image: true,
                name: true,
                date: true,
                title: true,
                content: true,
                category: true,
                // Not including comments here unless needed
            },
            orderBy: {
                date: 'desc'
            }
        });

        if (!blogs || blogs.length === 0) {
            return NextResponse.json(
                { message: 'No blogs found' }, 
                { status: 404 }
            );
        }

        return NextResponse.json({ blogs });

    } catch (error) {
        console.error('Error fetching blog data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blog data' }, 
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}