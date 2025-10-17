"use client";
import { useEffect, useState } from "react";

export default function TestPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/applications", {
      credentials: "include", // ✅ ensures cookies (session) are sent
    })
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setData({ error: err.message }));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Applications API Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
