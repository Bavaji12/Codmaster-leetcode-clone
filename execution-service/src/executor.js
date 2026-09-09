const { execFile } = require("child_process");

function executeJavaScript(code) {
  return new Promise((resolve) => {
    execFile(
      process.execPath,
      ["-e", code],
      {
        timeout: 5000,
        maxBuffer: 1024 * 1024
      },
      (error, stdout, stderr) => {
        if (error) {
          resolve({
            success: false,
            output: stderr || error.message
          });
          return;
        }

        resolve({
          success: true,
          output: stdout
        });
      }
    );
  });
}

async function executeCode({ language, code }) {
  if (language !== "javascript") {
    return {
      success: false,
      output: `${language} execution will be added next.`
    };
  }

  return executeJavaScript(code);
}

module.exports = executeCode;
