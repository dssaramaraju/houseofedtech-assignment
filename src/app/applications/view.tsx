"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

interface Application {
  id: number;
  title: string;
  company: string;
  status: string;
  notes: string;
  appliedAt: string;
}

export default function ApplicationsClient({ session }: { session: any }) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !company) {
      alert("Please fill in job title and company name!");
      return;
    }

    if (editId) {
      // Update existing
      setApplications((prev) =>
        prev.map((a) =>
          a.id === editId
            ? { ...a, title, company, status, notes }
            : a
        )
      );
      setEditId(null);
    } else {
      // Add new
      const newApp: Application = {
        id: Date.now(),
        title,
        company,
        status,
        notes,
        appliedAt: new Date().toLocaleDateString(),
      };
      setApplications([...applications, newApp]);
    }

    // Reset form
    setTitle("");
    setCompany("");
    setStatus("Applied");
    setNotes("");
  };

  const handleEdit = (app: Application) => {
    setTitle(app.title);
    setCompany(app.company);
    setStatus(app.status);
    setNotes(app.notes);
    setEditId(app.id);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
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

      {/* Main Dashboard */}
      <main className="flex-1 flex flex-col items-center justify-start p-6">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            🚀 Applications Dashboard
          </h1>

          {/* Add/Edit Form */}
          <form
            onSubmit={handleAddOrUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition"
            >
              {editId ? "✏️ Update Application" : "➕ Add Application"}
            </button>
          </form>

          {/* Applications List */}
          {applications.length === 0 ? (
            <p className="text-gray-500 text-center">
              No applications yet. Add your first one above.
            </p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border rounded-lg p-4 flex justify-between items-center bg-gray-50"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {app.title} @ {app.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {app.status} • Applied on {app.appliedAt}
                    </p>
                    {app.notes && (
                      <p className="text-xs text-gray-400 mt-1">{app.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(app)}
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm rounded"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
