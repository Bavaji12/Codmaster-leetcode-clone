const http = require("http");

const runCode = async (req, res) => {
  try {
    const { language, code, testCases = [] } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        message: "Language and code are required"
      });
    }

    const postData = JSON.stringify({
      language,
      code,
      testCases
    });

    const request = http.request(
      {
        hostname: "127.0.0.1",
        port: 6000,
        path: "/execute",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData)
        }
      },
      (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            const result = JSON.parse(data);

            console.log(
              "Execution service response:",
              response.statusCode,
              result
            );

            return res.status(response.statusCode).json(result);
          } catch (error) {
            console.error("Invalid execution response:", data);

            return res.status(500).json({
              success: false,
              message: "Invalid response from execution service"
            });
          }
        });
      }
    );

    request.on("error", (error) => {
      console.error("Execution service connection error:", error);

      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: "Code execution service unavailable",
          error: error.message
        });
      }
    });

    request.write(postData);
    request.end();

  } catch (error) {
    console.error("Execution error:", error);

    return res.status(500).json({
      success: false,
      message: "Code execution service unavailable",
      error: error.message
    });
  }
};

module.exports = {
  runCode
};
