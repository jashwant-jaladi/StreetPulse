"use client";
import React, { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { useSession } from "next-auth/react";

// Initialize Stripe with the public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_KEY);

const CheckoutForm = ({ finalTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/myAccount");
    }
  }, [status, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Check again if user is authenticated before proceeding
    if (status !== "authenticated") {
      setError("Your session has expired. Please log in again.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
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

  // Show nothing if loading session
  if (status === "loading") {
    return <Loading />;
  }

  // Prevent form rendering for unauthenticated users
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 sm:p-6 bg-gray-800 rounded-lg shadow-md">
      <PaymentElement />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing || status !== "authenticated"}
        className={`w-full py-2 px-4 rounded-lg font-semibold mt-6 transition-transform transform ${
          processing || status !== "authenticated"
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
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/myAccount");
    }
  }, [status, router]);

  useEffect(() => {
    // Only fetch payment intent if user is authenticated
    if (status !== "authenticated") {
      return;
    }
    
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
  }, [finalTotal, status]);

  // Show loading while session is being fetched
  if (status === "loading") {
    return <Loading />;
  }

  // Prevent page rendering if user is not authenticated
  if (status === "unauthenticated") {
    return null; // Don't render anything as we're redirecting
  }

  if (!finalTotal) {
    return <p className="mt-10 text-center text-2xl text-white">Invalid request. Please go back and try again.</p>;
  }

  if (!clientSecret) {
    return <p className="p-4 text-center">Loading...</p>; // Display a loading state while fetching client secret
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Secure Checkout</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm finalTotal={finalTotal} clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

// Setup a client-side listener for auth events
const AuthAwareCheckout = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // This will redirect to the signin page when the user is not authenticated
      window.location.href = '/myAccount';
    }
  });
  
  // If loading or not authenticated, show loading
  if (status === "loading" || status === "unauthenticated") {
    return <Loading />;
  }
  
  return <CheckoutPage />;
};

const CheckoutPageWithSuspense = () => (
  <Suspense fallback={<Loading />}>
    <AuthAwareCheckout />
  </Suspense>
);

export default CheckoutPageWithSuspense;