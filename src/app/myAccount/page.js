"use client";
import { useState } from "react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalPassword from "./forgotPassword";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loginEmail, setLoginEmail] = useState(""); // Updated: Use this for login email
  const [loginPassword, setLoginPassword] = useState(""); // Updated: Use this for login password
  
  const router = useRouter();

  // Function to show error toast notifications
  const showToast = (errorMessage) => {
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // Handle Registration Form Submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Ensure all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      showToast("Please fill all the fields");
      return;
    }

    // Ensure the passwords match
    if (password !== confirmPassword) {
      showToast("Passwords do not match");
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
        // Reset form state after success
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success("Registration successful!");
      } else {
        const errorData = await res.json();
        showToast(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error occurred while registering the user:", error);
      showToast("An unexpected error occurred");
    }
  };

  // Handle Login Form Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: loginEmail, // Use loginEmail from state
        password: loginPassword, // Use loginPassword from state
        redirect: false,
      });

      if (res?.error) {
        const errorMessage = "Invalid credentials";
        showToast(errorMessage);
        return;
      }

      router.replace("/"); // Redirect after successful login
    } catch (error) {
      console.error(error);
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
                <ModalPassword /> {/* Modal for forgotten password */}
                <button className="m-auto w-auto px-5 py-3 border-2 border-yellow-500 font-bold rounded-full bg-black text-white hover:bg-yellow-700">
                  Submit
                </button>
              </form>
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
              {password !== confirmPassword && (
                <div className="text-red-500 text-sm pt-3">
                  Passwords do not match
                </div>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      {/* ToastContainer moved outside the condition to show for both success and error */}
      <ToastContainer />
    </div>
  );
};

export default MyAccount;
