"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  }, []);

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1>Profile</h1>

        <div style={styles.avatar}>
          {user?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <h2>{user?.username || "CodeMaster User"}</h2>

        <p>{user?.email || "No email available"}</p>

        <div style={styles.stats}>
          <div>
            <strong>0</strong>
            <span>Solved</span>
          </div>

          <div>
            <strong>0</strong>
            <span>Submissions</span>
          </div>

          <div>
            <strong>0</strong>
            <span>Rank</span>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 20px",
    background: "#f5f5f5",
  },

  card: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "40px",
    background: "#fff",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  avatar: {
    width: "90px",
    height: "90px",
    margin: "25px auto",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#111827",
    color: "#fff",
    fontSize: "36px",
    fontWeight: "bold",
  },

  stats: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "35px",
    paddingTop: "25px",
    borderTop: "1px solid #ddd",
  },
};
