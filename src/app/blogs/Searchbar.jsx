"use client";

import React from "react";
import { Button, Input, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Searchbar = () => {
    const [query, setQuery] = React.useState("");
    const router = useRouter(); // Use Next.js router for navigation

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission default behavior
        if (query.trim() === "") {
            alert("Please enter a search query.");
            return;
        }
        // Use search parameters for query-based navigation
        router.push(`/blogs/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <Box
            as="form" // Chakra UI form wrapper for accessibility
            onSubmit={handleSubmit}
            
            className="flex flex-col items-center justify-center mt-20"
            p={6}
            borderRadius="lg"
            shadow="lg"
        >
            <Input
                type="text"
                placeholder="Search blogs..."
                value={query}
                onChange={handleChange}
                variant="outline"
                size="lg"
                focusBorderColor="yellow.400"
                textColor="yellow.400"
                bg="black"
                borderColor="yellow.400"
                _placeholder={{ color: "yellow.500" }}
                _hover={{ borderColor: "yellow.500" }}
                className="transition-all duration-300 ease-in-out"
                mb={5}
                w={{ base: "100%", md: "60%", lg: "40%" }}
            />
            <Button
                size="lg"
                bg="yellow.400"
                color="black"
                _hover={{
                    bg: "yellow.500",
                    transform: "scale(1.05)",
                    shadow: "md",
                }}
                className="transition-transform duration-300 ease-in-out"
                fontWeight="bold"
                type="submit" // Submit the form when clicked
            >
                Search Blog
            </Button>
        </Box>
    );
};

export default Searchbar;
