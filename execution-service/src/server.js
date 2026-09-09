const express = require("express");
const cors = require("cors");

const executeCode = require("./executor");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CodeMaster Execution Service is running"
  });
});

app.post("/execute", async (req, res) => {
  try {
    const { language, code, testCases } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: "Language and code are required"
      });
    }

    const result = await executeCode({
      language,
      code,
      testCases: testCases || []
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("Execution error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

const PORT = 6000;

app.listen(PORT, () => {
  console.log(
    `CodeMaster Execution Service running on http://localhost:${PORT}`
  );
});
