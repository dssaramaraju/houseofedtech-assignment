"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Github, Linkedin, Mail, Briefcase, Trash2, Edit3 } from "lucide-react";

interface Application {
  id: number;
  company: string;
  role: string;
  status: string;
  date: string;
}

export default function ApplicationsView() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  // ✅ Load saved applications from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) setApplications(JSON.parse(stored));
  }, []);

  // ✅ Save applications whenever they change
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  // ✅ Add a new application
  const addApplication = () => {
    if (!company || !role) return;
    const newApp: Application = {
      id: Date.now(),
      company,
      role,
      status,
      date: new Date().toLocaleDateString(),
    };
    setApplications([...applications, newApp]);
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  // ✅ Delete an application
  const deleteApplication = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  // ✅ Edit an application
  const editApplication = (id: number) => {
    const app = applications.find((a) => a.id === id);
    if (!app) return;
    setCompany(app.company);
    setRole(app.role);
    setStatus(app.status);
    setApplications(applications.filter((a) => a.id !== id));
  };

  // ✅ Summary counts
  const summary = {
    Applied: applications.filter((a) => a.status === "Applied").length,
    Interview: applications.filter((a) => a.status === "Interview").length,
    Offer: applications.filter((a) => a.status === "Offer").length,
    Rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-500" />
          Career Tracker Dashboard
        </h1>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Sign Out
        </button>
      </header>

      {/* Summary Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 py-6">
        {Object.entries(summary).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-xl shadow p-4 text-center border-t-4 border-indigo-500"
          >
            <p className="text-sm text-gray-500">{key}</p>
            <p className="text-2xl font-semibold text-indigo-600">{value}</p>
          </div>
        ))}
      </section>

      {/* Add Application Form */}
      <section className="bg-white mx-8 p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Add New Application
        </h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Job Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded w-full md:w-40"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button
            onClick={addApplication}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </section>

      {/* Applications List */}
      <section className="px-8 pb-20">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          My Applications
        </h2>
        {applications.length === 0 ? (
          <p className="text-gray-500">No applications yet. Add one above!</p>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white shadow-sm p-4 rounded-xl flex justify-between items-center border border-gray-100 hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {app.role} @ {app.company}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {app.status} • {app.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editApplication(app.id)}
                    className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 mt-8 border-t text-center text-sm text-gray-600">
        <div className="flex justify-center gap-6 mb-3">
          <a
            href="https://github.com/dssaramaraju"
            target="_blank"
            className="hover:text-indigo-600 flex items-center gap-1"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/dssaramaraju"
            target="_blank"
            className="hover:text-indigo-600 flex items-center gap-1"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a
            href="mailto:ramarajussadatla@gmail.com"
            className="hover:text-indigo-600 flex items-center gap-1"
          >
            <Mail className="w-4 h-4" /> Contact Me
          </a>
        </div>
        © {new Date().getFullYear()} Datla S.S.A. Ramaraju — Career Tracker
      </footer>
    </div>
  );
}
