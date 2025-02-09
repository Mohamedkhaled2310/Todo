"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {  loading } = useSelector((state: RootState) => state.auth);
  const [credentials, setCredentials] = useState({ email: "", password: "" });



  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(loginUser(credentials)).unwrap();

      toast.success(`Welcome back, ${resultAction.name || "User"}! 🎉`);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="p-6 bg-gray-800 min-h-screen flex items-center justify-center w-full">
      <div className="bg-gray-600 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="p-2 bg-gray-700 border border-gray-700 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-700 border border-gray-700 mb-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button
          onClick={handleLogin}
          className="bg-purple-500 p-2 rounded w-full hover:bg-purple-600 transition duration-300 mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <h1>Create acount ? <Link href="/register" className="text-purple-600 ">Register</Link></h1>
      </div>
    </div>
  );
  
}
