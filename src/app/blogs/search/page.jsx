"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Loading from "@/app/components/Loading";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams?.get("query"); // Retrieve the search query from the URL
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (query) {
            // Fetch blogs based on the search query
            fetch(`/api/searchBlog?query=${query}`)
                .then((res) => res.json())
                .then((data) => setBlogs(data.blogs || []));
        }
    }, [query]);

    return (
        <div className="bg-black text-yellow-600 min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
                Search Results for {query}
            </h1>
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-yellow-100 text-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                className="rounded-lg mb-4 w-full h-40 object-cover"
                            />
                            <h2 className="text-lg sm:text-xl font-semibold mb-2">
                                <a
                                    href={`/blogs/${blog.id}`}
                                    className="text-yellow-600 hover:underline"
                                >
                                    {blog.title}
                                </a>
                            </h2>
                            <p className="text-sm mb-2">
                                <strong>Author:</strong> {blog.name}
                            </p>
                            <p className="text-sm mb-2">
                                <strong>Date:</strong>{" "}
                                {new Date(blog.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-700 line-clamp-3">
                                {blog.content}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-yellow-600">No results found.</p>
            )}
        </div>
    );
};

const SearchPageWithSuspense = () => (
    <Suspense fallback={<Loading />}>
        <SearchPage />
    </Suspense>
);

export default SearchPageWithSuspense;