"use client";

import Link from "next/link";

export default function SubmissionsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Submissions</h1>
            <p style={{ color: "#666" }}>
              View your CodeMaster problem submissions.
            </p>
          </div>

          <Link
            href="/dashboard"
            style={{
              padding: "10px 16px",
              background: "#111",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            ← Dashboard
          </Link>
        </div>

        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>No submissions yet</h2>
          <p style={{ color: "#666" }}>
            Solve a problem and your submissions will appear here.
          </p>

          <Link
            href="/problems"
            style={{
              display: "inline-block",
              marginTop: "15px",
              padding: "10px 18px",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Browse Problems
          </Link>
        </div>
      </div>
    </main>
  );
}
