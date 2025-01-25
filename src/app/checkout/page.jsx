"use client";
import React, { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "../components/Loading";

// Initialize Stripe with the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY);

const CheckoutForm = ({  finalTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/success",
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent?.status === "succeeded") {
        router.push("/success");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <PaymentElement />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-2 px-4 rounded-lg font-semibold mt-6 transition-transform transform ${
          processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-yellow-500 text-gray-900 hover:scale-105 hover:bg-yellow-400"
        }`}
      >
        {processing ? "Processing..." : `Pay ₹${finalTotal}`}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const finalTotal = parseFloat(searchParams?.get("finalTotal")); // Parse finalTotal from query params
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Fetch the Payment Intent client secret from the server
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ finalTotal }),
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    if (finalTotal) {
      createPaymentIntent();
    }
  }, [finalTotal]);

  if (!finalTotal) {
    return <p>Invalid request. Please go back and try again.</p>;
  }

  if (!clientSecret) {
    return <p>Loading...</p>; // Display a loading state while fetching client secret
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Secure Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm finalTotal={finalTotal} clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

const CheckoutPageWithSuspense = () => (
  <Suspense fallback={<Loading />}>
      <CheckoutPage />
  </Suspense>
);

export default CheckoutPageWithSuspense;
