"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query"); // Retrieve the search query from the URL
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
        <div className="bg-black text-yellow-600 min-h-screen p-10">
            <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-yellow-100 text-black p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="rounded-lg mb-4 w-full h-40 object-cover"
                            />
                            <h2 className="text-xl font-semibold mb-2">
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
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchPage;
