"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Import useSession
import { Box, Heading, Textarea, Button, Flex, Text, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import Image from "next/image";

const Comment = ({ blogId }) => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast(); // Chakra UI toast hook

  const isAuthenticated = status === "authenticated";

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
        toast({
          title: "Error",
          description: "Failed to load comments.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchComments();
  }, [blogId, toast]);

  const handleDelete = async (commentId) => {
    try {
      const response = await fetch(`/api/comment?commentId=${commentId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          blogId: blogId,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      setComments((prev) => [data.comment, ...prev]);
      setNewComment("");

      toast({
        title: "Success",
        description: "Your comment has been posted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to submit the comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      {/* Comments Section */}
      <Heading as="h3" size="md" mt={10} mb={5}>
        Comments:
      </Heading>
      <Box
        border="2px"
        borderColor="yellow.600"
        borderRadius="md"
        w="full"
        maxW="1000px"
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
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Box key={comment.id} mb={6}>
              <Flex alignItems="center" justify="space-between">
                <Text fontWeight="bold" fontSize="lg" color="yellow.400">
                  {comment.user.name}
                </Text>
                <Button
                  width="30px"
                  height="30px"
                  bg="yellow.600"
                  borderRadius="full"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p={0}
                  _hover={{ bg: "yellow.500", transform: "scale(1.1)" }}
                  _active={{ bg: "yellow.700" }}
                  onClick={handleDelete.bind(this, comment.id)}
                >
                  <Image src="/icons8-delete.svg" alt="Delete" width={16} height={16} />
                </Button>
              </Flex>
              <Text fontSize="md" color="whitesmoke" mt={2} mb={4}>
                {comment.content}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={2}>
                {new Date(comment.createdAt).toLocaleString()}
              </Text>
              {index < comments.length - 1 && <Box borderBottom="1px" borderColor="gray.700" />}
            </Box>
          ))
        ) : (
          <Text fontSize="lg" color="gray.400">
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
            <Flex direction="column">
              <Textarea
                placeholder="Enter your comment here!"
                bg="black"
                border="2px"
                borderColor="yellow.600"
                w="full"
                maxW="700px"
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