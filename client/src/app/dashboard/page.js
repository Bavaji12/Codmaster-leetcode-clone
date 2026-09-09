"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main style={{
      maxWidth: "900px",
      margin: "60px auto",
      padding: "30px"
    }}>
      <h1>Welcome to CodeMaster 🎉</h1>

      {user && (
        <>
          <h2>Hello, {user.username} 👋</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role || "user"}</p>
        </>
      )}

      <hr style={{ margin: "30px 0" }} />

      <h2>CodeMaster Dashboard</h2>

      <p>Start solving coding problems and improve your DSA skills.</p>

      <br />

      <button onClick={() => router.push("/problems")}>
        Explore Problems
      </button>

      {" "}

      <button onClick={logout}>
        Logout
      </button>
    </main>
  );
}
