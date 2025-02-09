"use client";

import Link from "next/link";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <nav className="bg-gray-600 p-4 flex flex-col md:flex-row md:justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h3 className="text-purple-500 font-semibold text-4xl">ToDoo</h3>
      </div>

      <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center">
        <li>
          <Link href="/dashboard" className="text-white hover:text-purple-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/profile" className="text-white hover:text-purple-600">
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={onLogout}
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-500 rounded"
          >
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
