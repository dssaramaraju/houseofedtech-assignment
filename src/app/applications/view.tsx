"use client";

import { signOut } from "next-auth/react";

export default function ApplicationsClient({ session }: { session: any }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          🚀 Applications Dashboard
        </h1>

        {session?.user ? (
          <>
            <p className="text-gray-600 mb-2">
              Welcome, <span className="font-semibold">{session.user.name}</span>
            </p>

            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-16 h-16 rounded-full mx-auto my-4 shadow-md"
              />
            )}
            <p className="text-gray-500">{session.user.email}</p>
          </>
        ) : (
          <p className="text-gray-500 mb-4">Loading user info...</p>
        )}

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-6 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
