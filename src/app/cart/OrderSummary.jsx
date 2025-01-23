"use client";
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Stack,
  Button,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCartStore from '@/zustand/cartStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const OrderSummary = () => {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const { data: session } = useSession();
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const totalPrice = useCartStore((state) => state.totalPrice(state));

  // Populate name and email from session if available
  useEffect(() => {
    if (session) {
      setShippingDetails((prevDetails) => ({
        ...prevDetails,
        name: session.user.name || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

  const handleApplyCoupon = () => {
    let discount = 0;

    if (couponCode === 'streetpulse5') {
      discount = (totalPrice * 0.05).toFixed(2); // 5% discount
      setDiscountApplied(true);
      setDiscountAmount(discount);
      toast.success('5% discount applied!');
    } else if (couponCode === 'streetpulse10') {
      discount = (totalPrice * 0.1).toFixed(2); // 10% discount
      setDiscountApplied(true);
      setDiscountAmount(discount);
      toast.success('10% discount applied!');
    } else {
      setDiscountApplied(false);
      setDiscountAmount(0);
      toast.error('Invalid coupon code!');
    }
  };

  const handleShippingDetailsValidation = () => {
    const { name, email, phone, address, city, postalCode } = shippingDetails;

    // Simple validation checks
    if (!name || !email || !phone || !address || !city || !postalCode) {
      toast.error('All fields are required!');
      return false;
    }

    // Postal code validation: check if it's a valid number
    if (!/^\d{6}$/.test(postalCode)) {
      toast.error('Please enter a valid 6-digit postal code!');
      return false;
    }

    return true;
  };

  const handleCheckout = () => {
    if (handleShippingDetailsValidation()) {
      toast.success('Proceeding to payment...');
      setTimeout(() => {
        router.push(
          `/checkout?finalTotal=${encodeURIComponent(finalTotal)}`
        );
      }, 1000);
    }
  };

  const finalTotal = totalPrice + 100 - discountAmount; // Calculate total after discount

  return (
    <div className="w-full lg:w-[20vw] p-4 sm:p-6 md:p-8">
      <Flex justify="center" mt={8}>
        <Box
          w="100%"
          p={[4, 6, 8]} // Smaller padding on mobile, larger on desktop
          borderRadius="lg"
          backdropFilter="blur(12px)"
          bg="rgba(155, 155, 155, 0.2)"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          alignItems="center"
        >
          <Text
            color="yellow.600"
            fontWeight="bold"
            fontSize={["lg", "xl"]} // Smaller font on mobile, larger on desktop
            mb={4}
            textAlign="center"
          >
            ORDER SUMMARY
          </Text>
          <Stack spacing={4}>
            <Flex justify="space-between">
              <Text color="white" fontSize={["md", "lg"]}>
                Items Total:
              </Text>
              <Text color="white" fontSize={["md", "lg"]}>
                ₹ {totalPrice}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text color="white" fontSize={["md", "lg"]}>
                Shipping:
              </Text>
              <Text color="white" fontSize={["md", "lg"]}>
                ₹ 100
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text color="white" fontSize={["md", "lg"]}>
                Discount:
              </Text>
              <Text color="white" fontSize={["md", "lg"]}>
                -₹ {discountAmount}
              </Text>
            </Flex>

            {/* Coupon Code Section */}
            <FormControl>
              <FormLabel color="white" fontSize={["md", "lg"]}>
                Coupon Code
              </FormLabel>
              <Input
                name="couponCode"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                bg="gray.800"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: 'yellow.400' }}
                mt={2}
              />
              <Button
                mt={4}
                w="full"
                colorScheme="yellow"
                size={["sm", "md"]} // Smaller on mobile, medium on desktop
                onClick={handleApplyCoupon}
                _hover={{ transform: 'scale(1.05)' }}
              >
                Apply Coupon
              </Button>
            </FormControl>

            <Flex justify="space-between" fontWeight="bold" mt={4}>
              <Text color="white" fontSize={["md", "lg"]}>
                Total:
              </Text>
              <Text color="yellow.400" fontSize={["lg", "xl"]}>
                ₹ {finalTotal}
              </Text>
            </Flex>
          </Stack>

          <hr
            style={{
              margin: '1.5rem 0',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          />

          <Text color="yellow.600" fontWeight="bold" fontSize={["lg", "xl"]} mb={4}>
            SHIPPING DETAILS
          </Text>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel color="white" fontSize={["md", "lg"]}>
                Name
              </FormLabel>
              <Input
                name="name"
                placeholder="Enter your name"
                value={shippingDetails.name}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, name: e.target.value })
                }
                readOnly={session ? true : false}
                bg="gray.800"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white" fontSize={["md", "lg"]}>
                Email
              </FormLabel>
              <Input
                name="email"
                placeholder="Enter your email"
                value={shippingDetails.email}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, email: e.target.value })
                }
                readOnly={session ? true : false}
                bg="gray.800"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white" fontSize={["md", "lg"]}>
                Phone
              </FormLabel>
              <Input
                name="phone"
                placeholder="Enter your phone number"
                value={shippingDetails.phone}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, phone: e.target.value })
                }
                bg="gray.800"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white" fontSize={["md", "lg"]}>
                Address
              </FormLabel>
              <Input
                name="address"
                placeholder="Enter your address"
                value={shippingDetails.address}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, address: e.target.value })
                }
                bg="gray.800"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white" fontSize={["md", "lg"]}>
                City
              </FormLabel>
              <Input
                name="city"
                placeholder="Enter your city"
                value={shippingDetails.city}
                onChange={(e) =>
                  setShippingDetails({ ...shippingDetails, city: e.target.value })
                }
                bg="gray.800"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white" fontSize={["md", "lg"]}>
                Postal Code
              </FormLabel>
              <Input
                name="postalCode"
                placeholder="Enter your postal code"
                value={shippingDetails.postalCode}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    postalCode: e.target.value,
                  })
                }
                bg="gray.800"
                color="white"
                borderRadius="md"
                _focus={{ borderColor: 'yellow.400' }}
              />
            </FormControl>
          </Stack>

          <Button
            w="full"
            mt={6}
            colorScheme="yellow"
            variant="solid"
            size={["md", "lg"]} // Medium on mobile, large on desktop
            _hover={{ transform: 'scale(1.05)' }}
            onClick={() => handleCheckout()}
          >
            Proceed to Payment
          </Button>
        </Box>
      </Flex>

      <ToastContainer />
    </div>
  );
};

export default OrderSummary;