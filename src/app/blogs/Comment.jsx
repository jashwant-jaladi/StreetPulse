"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession
import { Box, Heading, Textarea, Button, Flex, Text, Alert, AlertIcon } from "@chakra-ui/react";

const Comment = ({ blogId }) => {
  const { data: session, status } = useSession(); // Retrieve session and authentication status
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for new comment input
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for errors

  const isAuthenticated = status === "authenticated"; // Check if the user is logged in

  // Fetch comments when the component loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment?blogId=${blogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data.comments);
      } catch (err) {
        console.error(err);
        setError("Failed to load comments.");
      }
    };

    fetchComments();
  }, [blogId]);

  // Handle comment submission
  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    setError("");
    console.log(session.user)
    try {
      const response = await fetch(`/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          blogId: blogId,
          
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      setComments((prev) => [data.comment, ...prev]); 
      setNewComment(""); 
    } catch (err) {
      console.error(err);
      setError("Failed to submit the comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2}>
      {/* Comments Section */}
      <Heading as="h3" size="md" mt={10} mb={5}>
        Comments:
      </Heading>
      <Box
        border="2px"
        borderColor="yellow.600"
        borderRadius="md"
        w="1000px"
        p={4}
        h="300px"
        overflowY="scroll"
        bg="blackAlpha.900"
        color="yellow.400"
        sx={{
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            background: "yellow.600",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "yellow.500" },
          "&::-webkit-scrollbar-track": {
            background: "blackAlpha.700",
            borderRadius: "8px",
          },
        }}
      >
        {error && <Text color="red.500">{error}</Text>}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box key={comment.id} mb={4}>
              <Text fontWeight="bold">{comment.user.name}</Text>
              <Text>{comment.content}</Text>
              <Text fontSize="sm" color="gray.400">
                {new Date(comment.createdAt).toLocaleString()}
              </Text>
            </Box>
          ))
        ) : (
          <Text className="text-lg text-gray.400">
            No comments yet. Be the first to comment!
          </Text>
        )}
      </Box>

      {/* Leave a Comment Section */}
      <Box mt={10}>
        {isAuthenticated ? (
          <>
            <Heading as="h3" size="md" mb={5}>
              Leave a Comment:
            </Heading>
            <Flex direction={"column"}>
              <Textarea
                placeholder="Enter your comment here!"
                bg="black"
                border="2px"
                borderColor="yellow.600"
                w="700px"
                color="yellow.400"
                resize="none"
                _hover={{ borderColor: "yellow.500" }}
                _focus={{ borderColor: "yellow.400", boxShadow: "outline" }}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                mt={5}
                w="40"
                bg="black"
                border="2px"
                borderColor="yellow.600"
                color="yellow.400"
                rounded="2xl"
                _hover={{ bg: "yellow.700", color: "black" }}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Submit
              </Button>
            </Flex>
          </>
        ) : (
          <Alert status="warning" mt={5}>
            <AlertIcon />
            You must be logged in to leave a comment.
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
