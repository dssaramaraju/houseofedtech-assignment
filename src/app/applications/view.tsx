"use client";

import { signOut } from "next-auth/react";

export default function ApplicationsClient({ session }: { session: any }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header Section */}
      <header className="w-full bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name ?? "User"}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold text-gray-800">
              {session?.user?.name ?? "User"}
            </p>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
        >
          Sign Out
        </button>
      </header>

      {/* Main Dashboard Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            🚀 Applications Dashboard
          </h1>

          {/* Replace this with your actual Applications View UI */}
          <p className="text-gray-600">
            Welcome to your job applications page! Here you can view and manage
            all your saved or tracked applications.
          </p>

          <div className="mt-6 p-4 border-t border-gray-200 text-gray-500 text-sm">
            (This is where your job listing or tracking components will appear.)
          </div>
        </div>
      </main>
    </div>
  );
}
