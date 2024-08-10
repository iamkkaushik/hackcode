// /* eslint-disable import/no-extraneous-dependencies */
// const path = require("path");
// const fs = require("fs");
// // const { v4: uuidv4 } = require("uuid");
// const { exec } = require("child_process");

// const outPath = path.join(__dirname, "outputExe");

// if (!fs.existsSync(outPath)) {
//   fs.mkdirSync(outPath, { recursive: true });
// }

// // eslint-disable-next-line no-unused-vars
// const executeCodeCpp = (filePath, inputPath) => {
//   const executionId = path.basename(filePath).split(".")[0];
//   const outName = `${executionId}.exe`;
//   const outputPath = path.join(outPath, outName);
//   return new Promise((resolve, reject) => {
//     exec(
//       `g++ ${filePath} -o ${outputPath} && cd ${outPath} && .\\${executionId}.exe < ${inputPath}`,
//       (err, stdout, stderr) => {
//         if (err) {
//           reject(err);
//         }

//         if (stderr) reject(stderr);

//         resolve(stdout);
//       }
//     );
//   });
// };

// module.exports = { executeCodeCpp };

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
