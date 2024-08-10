const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const outPath = path.join(__dirname, "outputExe");

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

const executeCodeCpp = (filePath, inputPath) => {
  const executionId = path.basename(filePath).split(".")[0];
  const outName = `${executionId}.exe`;
  const outputPath = path.join(outPath, outName);
  const command = `g++ ${filePath} -o ${outputPath} && cd ${outPath} && .\\${executionId}.exe < ${inputPath}`;

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${err.message}`);
        console.error(`stderr: ${stderr}`);
        reject(`Compilation or execution error: ${stderr}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(`Execution error: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

module.exports = { executeCodeCpp };
