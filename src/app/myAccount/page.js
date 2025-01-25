"use client";
import { useState } from "react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalPassword from "./forgotPassword";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();
  const toast = useToast(); // Initialize Chakra UI toast

  // Function to show error toast notifications
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  // Handle Guest Login
  const handleGuestLogin = async () => {
    try {
      const res = await signIn("credentials", {
        guest: true,
        redirect: false,
      });

      if (res?.error) {
        showToast("Error", "Failed to log in as a guest", "error");
      } else {
        showToast("Success", "Logged in as Guest!", "success");
        router.replace("/"); // Redirect to home after guest login
      }
    } catch (error) {
      console.error("Error during guest login:", error);
      showToast("Error", "An unexpected error occurred", "error");
    }
  };

  // Handle Login Form Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: loginEmail,
        password: loginPassword,
        redirect: false,
      });

      if (res?.error) {
        showToast("Error", "Invalid credentials", "error");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.error(error);
      showToast("Error", "An unexpected error occurred", "error");
    }
  };

  // Handle Registration Form Submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Error", "Passwords do not match", "error");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        showToast("Success", "Registration successful!", "success");
        setTimeout(() => {
          window.location.href = "/myAccount";
        }, 1000);
      } else {
        const errorData = await res.json();
        showToast("Error", errorData.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Error occurred while registering the user:", error);
      showToast("Error", "An unexpected error occurred", "error");
    }
  };

  return (
    <div className="h-screen bg-black text-yellow-400">
      <div className="flex flex-row justify-center align-middle">
        <Tabs
          variant="soft-rounded"
          align="center"
          className="border-4 border-yellow-400 p-7 my-24 rounded-lg h-[500px]"
        >
          <TabList>
            <Tab _selected={{ color: "black", bg: "yellow.400" }}>LOGIN</Tab>
            <Tab _selected={{ color: "black", bg: "yellow.400" }}>REGISTER</Tab>
          </TabList>
          <TabPanels className="py-10 px-5">
            <TabPanel>
              {/* Login Form */}
              <form className="flex flex-col gap-5" onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  className="p-2 border-2 border-yellow-400 bg-black text-yellow-400 rounded-lg"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 border-2 border-yellow-400 rounded-lg bg-black"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <ModalPassword />
                <button className="m-auto w-auto px-5 py-3 border-2 border-yellow-500 font-bold rounded-full bg-black text-white hover:bg-yellow-700">
                  Submit
                </button>
              </form>
              <button
                onClick={handleGuestLogin}
                className="mt-5 m-auto w-auto px-5 py-3 border-2 border-yellow-500 font-bold rounded-full bg-black text-white hover:bg-yellow-700"
              >
                Continue as Guest
              </button>
            </TabPanel>

            <TabPanel>
              {/* Registration Form */}
              <form className="flex flex-col gap-5" onSubmit={handleRegisterSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border-2 border-yellow-400 rounded-lg bg-black"
                />
                <input
                  type="email"
                  placeholder="User email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border-2 border-yellow-400 rounded-lg bg-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border-2 border-yellow-400 rounded-lg bg-black"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`p-2 border-2 border-yellow-400 rounded-lg bg-black ${
                    password !== confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button className="m-auto w-auto px-5 py-3 border-2 border-yellow-500 font-bold rounded-full bg-black text-white hover:bg-yellow-700">
                  Register
                </button>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default MyAccount;