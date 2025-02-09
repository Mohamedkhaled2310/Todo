"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/features/auth/redux/authSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      await dispatch(registerUser(userData)).unwrap(); 
      toast.success("Registration successful! 🎉");
      router.push("/login"); 
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4  text-center">Register</h1>
        <input
          type="text"
          placeholder="Name"
          className="p-2 bg-gray-700 border border-gray-700 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 bg-gray-700 border border-gray-700 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-700 border border-gray-700 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <button
          onClick={handleRegister}
          className="bg-purple-500 text-white p-2 rounded w-full hover:bg-purple-600 transition duration-300 mb-3"
        >
          Register
        </button>
        <h1>have an acount ? <Link href="/login" className="text-purple-600 ">Log in</Link></h1>
      </div>
    </div>
  );
  
}