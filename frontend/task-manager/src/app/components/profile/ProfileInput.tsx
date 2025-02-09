"use client";

import React from "react";

interface ProfileInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export default function ProfileInput({ label, name ,type = "text", value, onChange }: ProfileInputProps) {
  return (
    <div className="mb-4 ">
      <label className="block font-medium">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
