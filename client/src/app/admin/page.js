"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Dashboard</h1>

      <p style={{ marginTop: "10px", color: "#666" }}>
        Welcome to the CodeMaster administration panel.
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/admin/problems"
          style={{
            padding: "15px 20px",
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Manage Problems
        </Link>

        <Link
          href="/admin/users"
          style={{
            padding: "15px 20px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Manage Users
        </Link>

        <Link
          href="/dashboard"
          style={{
            padding: "15px 20px",
            background: "#e5e7eb",
            color: "#111",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
