"use client";

import Link from "next/link";

export default function AdminProblemsPage() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Manage Problems</h1>

      <p style={{ color: "#666", marginTop: "10px" }}>
        Create, edit and manage CodeMaster coding problems.
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link
          href="/admin"
          style={{
            padding: "10px 16px",
            background: "#111",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          ← Back to Admin
        </Link>
      </div>
    </main>
  );
}
