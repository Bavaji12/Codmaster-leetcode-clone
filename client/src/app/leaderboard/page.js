"use client";

import Link from "next/link";

export default function LeaderboardPage() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Leaderboard</h1>

      <p style={{ color: "#666", marginTop: "10px" }}>
        CodeMaster leaderboard and rankings.
      </p>

      <div style={{ marginTop: "30px" }}>
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
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
