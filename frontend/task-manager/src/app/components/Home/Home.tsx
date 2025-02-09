import { cookies } from "next/headers";
import Link from "next/link";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <div className="bg-gray-800 py-20 h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-gray-600 border border-gray-600 rounded-md w-full max-w-sm p-6 text-center flex flex-col justify-center items-center shadow-lg">
        <h1 className="text-4xl text-gray-100 font-bold mb-4">ToDoo</h1>
        <p className="text-lg text-gray-300 mb-6">List what is in your mind ~</p>

        <div className="flex flex-col space-y-3 w-full">
          {token ? (
            <Link
              href="/dashboard"
              className="bg-gray-700 py-2 px-4 rounded-lg font-semibold text-white hover:bg-gray-800 w-full"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-gray-700 py-2 px-4 rounded-lg font-semibold text-white hover:bg-gray-800 w-full"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="bg-gray-700 py-2 px-4 rounded-lg font-semibold text-white hover:bg-gray-800 w-full"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
