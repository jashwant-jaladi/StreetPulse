import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Textarea,
  VStack,
  HStack,
  Text,
  Spinner,
  Icon,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Review = ({ shopId, userId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/reviews?shopId=${shopId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        toast({
          title: "Error fetching reviews",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [shopId, toast]);

  const StarRating = ({ value, onChange, onHover, hoveredValue }) => (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          as={StarIcon}
          boxSize={6} // Keep star size consistent
          cursor="pointer"
          color={(hoveredValue || value) >= star ? "yellow.400" : "gray.600"}
          onClick={() => onChange(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
        />
      ))}
    </HStack>
  );

  const handleSubmit = async () => {
    if (!comment.trim() || rating === 0) {
      toast({
        title: "Incomplete Review",
        description: "Please provide both a comment and a rating.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopId, userId, rating, content: comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const newReview = await response.json();

      // Update local state
      setComments((prevComments) => {
        const existingIndex = prevComments.findIndex(
          (c) => c.userId === userId && c.shopId === shopId
        );

        if (existingIndex !== -1) {
          // Replace existing review
          const updatedComments = [...prevComments];
          updatedComments[existingIndex] = newReview;
          return updatedComments;
        }

        // Add new review
        return [...prevComments, newReview];
      });

      setComment('');
      setRating(0);

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your review.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.800" borderRadius="lg" mt={8} color="yellow.400" boxShadow="lg" p={[4, 6]}>
      <Text fontSize={['xl', '2xl']} fontWeight="bold" mb={4}>
        Customer Reviews
      </Text>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize={['md', 'lg']} fontWeight="medium" mb={2}>
            Your Rating
          </Text>
          <StarRating
            value={rating}
            onChange={setRating}
            onHover={setHoveredRating}
            hoveredValue={hoveredRating}
          />
        </Box>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          bg="gray.700"
          borderColor="gray.600"
          color="yellow.400"
          resize="vertical"
          minH="100px"
        />
        <Button
          onClick={handleSubmit}
          bg="yellow.400"
          color="black"
          _hover={{ bg: "yellow.500" }}
          width={['100%', '30%']} // Full width on mobile, 30% on desktop
        >
          Submit Review
        </Button>
      </VStack>
      <Box
        mt={6}
        maxH="400px"
        overflowY="auto"
        p={4}
        bg="gray.700"
        borderRadius="lg"
        css={{
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { background: 'gray.600', borderRadius: '24px' },
        }}
      >
        {loading ? (
          <Flex justify="center" p={4}>
            <Spinner size="md" color="yellow.400" />
          </Flex>
        ) : comments.length > 0 ? (
          <VStack spacing={4} align="stretch">
            {comments.map((c, index) => (
              <Box key={index} p={4} bg="gray.600" borderRadius="md" boxShadow="md">
                <HStack justify="space-between" mb={2}>
                  <HStack>
                    {Array.from({ length: c.rating }).map((_, i) => (
                      <Icon key={i} as={StarIcon} color="yellow.400" />
                    ))}
                  </HStack>
                  <Text fontSize="sm" color="gray.400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </Text>
                </HStack>
                <Text fontSize={['sm', 'md']}>{c.content}</Text>
                {c.user && (
                  <Text fontSize="sm" color="gray.400" mt={1}>
                    By {c.user.name}
                  </Text>
                )}
              </Box>
            ))}
          </VStack>
        ) : (
          <Text textAlign="center" color="gray.400">
            No reviews yet. Be the first to add one!
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Review;