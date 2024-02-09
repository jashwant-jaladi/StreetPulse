"use client";
import { useState} from "react";
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
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const router=useRouter()
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      setError((prevError) => {
        showToast(prevError); // Using a callback to access the updated state
        return prevError;
      });
      return;
    }
    try {
      const resUser = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUser.json();
      if (user) {
        setError("User already exists try with different email address");
        setError((prevError) => {
          showToast(prevError); 
          return prevError;
        });
        return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
      } else {
        console.log("user registration failed");
      }
    } catch (error) {
      console.log("error occurred while registering the user", error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
      const res=await signIn("credentials", {
        email, password, redirect:false
      })
      if(res.error)
      {
        setLoginError("Invalid credentials")
        setLoginError((prevError) => {
          showToast(prevError); 
          return prevError;
        });
        return;
      }
      router.replace("/")
    }
    catch(error)
    {
      console.log(error)
    }
  }
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
            <TabPanel >
              <form className="flex flex-col gap-5" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="p-2 border-2 border-yellow-400 bg-black text-yellow-400 rounded-lg "
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 border-2 border-yellow-400 rounded-lg  bg-black"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <ModalPassword/>
              <button className="m-auto w-auto px-5 py-3 border-2 border-yellow-500 font-bold rounded-full bg-black  text-white hover:bg-yellow-700">
                  Submit
                </button>
                </form>
            </TabPanel>

            <TabPanel>
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border-2 border-yellow-400 rounded-lg  bg-black"
                />
                <input
                  type="email"
                  placeholder="User email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border-2 border-yellow-400 rounded-lg  bg-black"
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
                <button className="m-auto w-auto px-5 py-3 border-2 border-yellow-500 font-bold rounded-full bg-black  text-white hover:bg-yellow-700">
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
      {error && <ToastContainer />}
      {loginError&&<ToastContainer />}
    </div>
  );
};

export default MyAccount;
