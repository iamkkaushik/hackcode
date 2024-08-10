
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const outPath = path.join(__dirname, "outputExe");

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

// eslint-disable-next-line no-unused-vars
const executeCodeJavaScript = (filePath, inputPath) => {
  const executionId = path.basename(filePath, ".js"); // Get the base name without .js extension
  const outputPath = path.join(outPath, `${executionId}.txt`); // Path for the output file

  return new Promise((resolve, reject) => {
    // Execute the JavaScript file with input redirection and output redirection
    exec(
      `node ${filePath} < ${inputPath} > ${outputPath}`,
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
          return;
        }

        if (stderr) {
          reject(stderr);
          return;
        }

        // Read the output from the file
        fs.readFile(outputPath, "utf8", (readErr, data) => {
          if (readErr) {
            reject(readErr);
            return;
          }

          // Resolve with the output data
          resolve(data);
        });
      }
    );
  });
};

module.exports = { executeCodeJavaScript };