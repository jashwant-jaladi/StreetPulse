"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    else if (!newPassword || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        router.push("/myAccount");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-black text-yellow-400 h-[50vh] justify-center">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4 mt-4">
        <input
          type="password"
          placeholder="New Password"
          className="p-2 bg-black border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input type= "password" placeholder="Confirm Password" className="p-2 border rounded bg-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className="p-2 bg-yellow-700 text-black font-bold hover:bg-yellow-600 rounded" onClick={handleResetPassword}>Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
