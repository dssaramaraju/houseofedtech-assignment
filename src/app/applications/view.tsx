"use client";
import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  status: string;
  notes?: string;
  appliedAt: string;
};

export default function ApplicationsView() {
  const [items, setItems] = useState<Job[]>([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "applied",
    notes: "",
  });

  async function load() {
    const res = await fetch("/api/jobs", { credentials: "include" });
    if (res.ok) setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", company: "", status: "applied", notes: "" });
      load();
    }
  }

  async function remove(id: string) {
    await fetch(`/api/jobs/${id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  async function editStatus(id: string, current: string) {
    const newStatus = prompt("Update status:", current);
    if (!newStatus || newStatus === current) return;
    await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Applications</h1>

      <form onSubmit={create} className="space-y-3 border p-4 rounded-md">
        <input
          className="border p-2 w-full"
          placeholder="Job title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          required
        />
        <select
          className="border p-2 w-full"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <textarea
          className="border p-2 w-full"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Application
        </button>
      </form>

      <ul className="space-y-3">
        {items.map((a) => (
          <li
            key={a.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="text-sm text-gray-600">{a.company}</div>
              <div className="text-sm text-gray-500">
                {a.status} — {new Date(a.appliedAt).toLocaleDateString()}
              </div>
              {a.notes && <div className="text-sm mt-1">{a.notes}</div>}
            </div>

            <div className="space-x-3">
              <button
                onClick={() => editStatus(a.id, a.status)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => remove(a.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
