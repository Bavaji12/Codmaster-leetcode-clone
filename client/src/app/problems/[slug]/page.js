"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";

export default function ProblemPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  // Load problem
  useEffect(() => {
    if (!slug) return;

    const loadProblem = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/problems/${slug}`
        );

        const data = await response.json();

        if (data.success) {
          setProblem(data.problem);
          setCode(data.problem.starterCode?.javascript || "");
        } else {
          setProblem(null);
        }
      } catch (error) {
        console.error("Failed to load problem:", error);
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [slug]);

  // Change language
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);

    setCode(problem?.starterCode?.[newLanguage] || "");

    setOutput("");
  };

  // Run code
  const handleRun = async () => {
    if (!code.trim()) {
      setOutput("Please enter some code first.");
      return;
    }

    setRunning(true);
    setOutput("Running code...");

    try {
      const response = await fetch("http://localhost:6000/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          code: code,
          testCases: [],
        }),
      });

      const data = await response.json();

      if (data.success) {
        setOutput(data.output || "Code executed successfully.");
      } else {
        setOutput(
          data.output ||
            data.message ||
            "Code execution failed."
        );
      }
    } catch (error) {
      console.error("Execution error:", error);

      setOutput(
        "Unable to connect to execution service.\n\n" +
        "Make sure the execution service is running on port 6000."
      );
    } finally {
      setRunning(false);
    }
  };

  // Submit
  const handleSubmit = async () => {
    setOutput("Submission service will be connected next.");
  };

  // Loading
  if (loading) {
    return (
      <div className="center">
        <h2>Loading problem...</h2>
      </div>
    );
  }

  // Problem not found
  if (!problem) {
    return (
      <div className="center">
        <h2>Problem not found</h2>

        <button onClick={() => router.push("/problems")}>
          Back to Problems
        </button>
      </div>
    );
  }

  return (
    <main className="page">

      {/* TOP BAR */}
      <header className="topbar">

        <button
          className="backButton"
          onClick={() => router.push("/problems")}
        >
          ← Problems
        </button>

        <h2>CodeMaster</h2>

        <span
          className={`difficulty ${problem.difficulty.toLowerCase()}`}
        >
          {problem.difficulty}
        </span>

      </header>

      {/* WORKSPACE */}
      <div className="workspace">

        {/* PROBLEM */}
        <section className="problem-panel">

          <h1>{problem.title}</h1>

          {/* TOPICS */}
          {problem.topics?.length > 0 && (
            <div className="topics">

              {problem.topics.map((topic) => (
                <span key={topic}>
                  {topic}
                </span>
              ))}

            </div>
          )}

          {/* DESCRIPTION */}
          <h2>Description</h2>

          <p className="description">
            {problem.description}
          </p>

          {/* EXAMPLES */}
          {problem.examples?.length > 0 && (
            <div>

              <h2>Examples</h2>

              {problem.examples.map((example, index) => (
                <div
                  className="example"
                  key={index}
                >

                  <h3>
                    Example {index + 1}
                  </h3>

                  <p>
                    <strong>Input:</strong>{" "}
                    {example.input}
                  </p>

                  <p>
                    <strong>Output:</strong>{" "}
                    {example.output}
                  </p>

                  {example.explanation && (
                    <p>
                      <strong>
                        Explanation:
                      </strong>{" "}
                      {example.explanation}
                    </p>
                  )}

                </div>
              ))}

            </div>
          )}

          {/* CONSTRAINTS */}
          {problem.constraints?.length > 0 && (
            <div className="constraints">

              <h2>Constraints</h2>

              <ul>

                {problem.constraints.map(
                  (constraint, index) => (
                    <li key={index}>
                      {constraint}
                    </li>
                  )
                )}

              </ul>

            </div>
          )}

        </section>

        {/* EDITOR */}
        <section className="editor-panel">

          {/* TOOLBAR */}
          <div className="toolbar">

            <select
              value={language}
              onChange={(e) =>
                changeLanguage(e.target.value)
              }
            >

              <option value="javascript">
                JavaScript
              </option>

              <option value="python">
                Python
              </option>

              <option value="java">
                Java
              </option>

              <option value="cpp">
                C++
              </option>

            </select>

            <div className="actions">

              <button
                onClick={handleRun}
                disabled={running}
              >
                {running
                  ? "Running..."
                  : "▶ Run"}
              </button>

              <button
                className="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>

            </div>

          </div>

          {/* MONACO EDITOR */}
          <div className="editor">

            <Editor
              height="100%"
              language={
                language === "cpp"
                  ? "cpp"
                  : language
              }
              value={code}
              onChange={(value) =>
                setCode(value || "")
              }
              theme="vs-dark"
              options={{
                minimap: {
                  enabled: false,
                },

                fontSize: 15,

                automaticLayout: true,

                wordWrap: "on",

                scrollBeyondLastLine: false,
              }}
            />

          </div>

          {/* OUTPUT */}
          <div className="output">

            <div className="outputHeader">
              <h3>Output</h3>

              {output && (
                <button
                  className="clearButton"
                  onClick={() => setOutput("")}
                >
                  Clear
                </button>
              )}
            </div>

            <pre>
              {output ||
                "Run your code to see the output."}
            </pre>

          </div>

        </section>

      </div>

      {/* CSS */}
      <style jsx>{`

        .page {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .topbar {
          height: 60px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 20px;
          background: white;
          border-bottom: 1px solid #ddd;
        }

        .topbar h2 {
          flex: 1;
          margin: 0;
          font-size: 20px;
        }

        .backButton {
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 15px;
          padding: 8px;
        }

        .backButton:hover {
          background: #f1f1f1;
          border-radius: 6px;
        }

        .difficulty {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
        }

        .easy {
          background: #dcfce7;
          color: #166534;
        }

        .medium {
          background: #fef3c7;
          color: #92400e;
        }

        .hard {
          background: #fee2e2;
          color: #991b1b;
        }

        .workspace {
          display: grid;
          grid-template-columns: 42% 58%;
          height: calc(100vh - 60px);
        }

        .problem-panel {
          background: white;
          padding: 30px;
          overflow-y: auto;
          border-right: 1px solid #ddd;
        }

        .problem-panel h1 {
          font-size: 30px;
          margin-top: 0;
          margin-bottom: 15px;
        }

        .problem-panel h2 {
          margin-top: 25px;
          font-size: 20px;
        }

        .topics {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .topics span {
          padding: 6px 10px;
          background: #eee;
          border-radius: 5px;
          font-size: 13px;
        }

        .description {
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .example {
          margin-top: 15px;
          padding: 18px;
          background: #f7f7f7;
          border-radius: 8px;
        }

        .example h3 {
          margin-top: 0;
        }

        .example p {
          line-height: 1.6;
        }

        .constraints li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .editor-panel {
          display: flex;
          flex-direction: column;
          min-width: 0;
          background: #1e1e1e;
        }

        .toolbar {
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          background: #1e1e1e;
          border-bottom: 1px solid #333;
        }

        .toolbar select {
          padding: 8px 12px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          background: white;
        }

        .actions {
          display: flex;
          align-items: center;
        }

        .toolbar button {
          padding: 8px 15px;
          margin-left: 8px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
        }

        .toolbar button:hover {
          opacity: 0.9;
        }

        .toolbar button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .toolbar .submit {
          background: #16a34a;
          color: white;
        }

        .editor {
          flex: 1;
          min-height: 0;
        }

        .output {
          height: 150px;
          padding: 15px;
          background: #111;
          color: white;
          overflow: auto;
          border-top: 1px solid #333;
        }

        .outputHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .output h3 {
          margin: 0;
        }

        .output pre {
          margin: 0;
          color: #ccc;
          white-space: pre-wrap;
          font-family: monospace;
        }

        .clearButton {
          background: transparent;
          border: 1px solid #555;
          color: #ccc;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .center {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .center button {
          padding: 10px 18px;
          border: none;
          border-radius: 6px;
          background: #111;
          color: white;
          cursor: pointer;
        }

        @media (max-width: 900px) {

          .workspace {
            grid-template-columns: 1fr;
            height: auto;
          }

          .problem-panel {
            min-height: 500px;
          }

          .editor-panel {
            height: 700px;
          }

        }

      `}</style>

    </main>
  );
}