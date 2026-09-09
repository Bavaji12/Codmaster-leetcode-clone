"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProblemsPage() {
  const router = useRouter();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    fetchProblems();
  }, [difficulty]);

  const fetchProblems = async () => {
    try {
      setLoading(true);

      let url = "http://localhost:5000/api/problems";

      const params = new URLSearchParams();

      if (difficulty !== "All") {
        params.append("difficulty", difficulty);
      }

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProblems(data.problems);
      }
    } catch (error) {
      console.error("Failed to load problems:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProblems();
  };

  const difficultyClass = (level) => {
    if (level === "Easy") return "easy";
    if (level === "Medium") return "medium";
    if (level === "Hard") return "hard";
    return "";
  };

  return (
    <main className="problems-container">

      <div className="problems-header">
        <h1>CodeMaster Problems</h1>

        <p>
          Practice coding problems and improve your DSA skills.
        </p>
      </div>

      <form onSubmit={handleSearch} className="search-section">
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

      <div className="filters">
        {["All", "Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={difficulty === level ? "active-filter" : ""}
          >
            {level}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">
          Loading problems...
        </div>
      ) : problems.length === 0 ? (
        <div className="empty">
          No problems found.
        </div>
      ) : (
        <div className="problem-list">

          {problems.map((problem) => (
            <div className="problem-card" key={problem._id}>

              <div className="problem-info">

                <h2>{problem.title}</h2>

                <div className="problem-meta">

                  <span className={difficultyClass(problem.difficulty)}>
                    {problem.difficulty}
                  </span>

                  <span>
                    {problem.category}
                  </span>

                  {problem.topics?.map((topic) => (
                    <span key={topic}>
                      {topic}
                    </span>
                  ))}

                </div>

                <p>
                  Acceptance Rate:{" "}
                  {problem.acceptanceRate || 0}%
                </p>

              </div>

              <button
                className="solve-button"
                onClick={() =>
                  router.push(`/problems/${problem.slug}`)
                }
              >
                Solve Problem
              </button>

            </div>
          ))}

        </div>
      )}

      <style jsx>{`
        .problems-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 50px 20px;
        }

        .problems-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .problems-header h1 {
          font-size: 38px;
          margin-bottom: 10px;
        }

        .problems-header p {
          color: #666;
          font-size: 17px;
        }

        .search-section {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .search-section input {
          flex: 1;
          padding: 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
        }

        .search-section button {
          padding: 14px 25px;
          border: none;
          border-radius: 8px;
          background: #111;
          color: white;
          cursor: pointer;
        }

        .filters {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        .filters button {
          padding: 10px 20px;
          border: 1px solid #ccc;
          border-radius: 20px;
          background: white;
          cursor: pointer;
        }

        .filters .active-filter {
          background: #111;
          color: white;
        }

        .problem-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .problem-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 12px;
          background: white;
        }

        .problem-card h2 {
          margin: 0 0 12px;
        }

        .problem-meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .problem-meta span {
          padding: 5px 10px;
          background: #f2f2f2;
          border-radius: 5px;
          font-size: 14px;
        }

        .problem-meta .easy {
          background: #dcfce7;
          color: #166534;
        }

        .problem-meta .medium {
          background: #fef3c7;
          color: #92400e;
        }

        .problem-meta .hard {
          background: #fee2e2;
          color: #991b1b;
        }

        .problem-info p {
          color: #777;
          margin-top: 12px;
        }

        .solve-button {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          background: #111;
          color: white;
          cursor: pointer;
        }

        .solve-button:hover,
        .search-section button:hover {
          opacity: 0.8;
        }

        .loading,
        .empty {
          text-align: center;
          padding: 50px;
          color: #666;
        }

        @media (max-width: 700px) {
          .problem-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }

          .solve-button {
            width: 100%;
          }
        }
      `}</style>

    </main>
  );
}
