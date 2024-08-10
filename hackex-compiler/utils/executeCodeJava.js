/* eslint-disable prefer-promise-reject-errors */
// // const path = require("path");
// // const fs = require("fs");
// // // const { v4: uuidv4 } = require("uuid");
// // const { exec } = require("child_process");

// // const outPath = path.join(__dirname, "outputExe");

// // if (!fs.existsSync(outPath)) {
// //   fs.mkdirSync(outPath, { recursive: true });
// // }

// // // eslint-disable-next-line no-unused-vars
// // const executeCodeJava = (filePath, inputPath, fileNameWithoutExtension) => {
// //   const executionId = path.basename(filePath).split(".")[0];
// //   const outName = `${executionId}.txt`; // Change to .txt to store output as text
// //   const outputPath = path.join(outPath, outName);

// //   return new Promise((resolve, reject) => {
// //     // Execute Python script and redirect output to file
// //     exec(
// //       `javac ${filePath} && java ${executionId} < ${inputPath} > ${outputPath}`,
// //       (err, stdout, stderr) => {
// //         if (err) {
// //           reject(err);
// //           return;
// //         }

// //         if (stderr) {
// //           reject(stderr);
// //           return;
// //         }

// //         // Read the output from the file
// //         fs.readFile(outputPath, "utf8", (readErr, data) => {
// //           if (readErr) {
// //             reject(readErr);
// //             return;
// //           }

// //           // Resolve with the output data
// //           resolve(data);
// //         });
// //       }
// //     );
// //   });
// // };

// // module.exports = { executeCodeJava };

// const path = require("path");
// const fs = require("fs");
// const { exec } = require("child_process");

// const outPath = path.join(__dirname, "outputExe");

// if (!fs.existsSync(outPath)) {
//   fs.mkdirSync(outPath, { recursive: true });
// }

// // eslint-disable-next-line no-unused-vars
// const executeCodeJava = (filePath, inputPath) => {
//   const executionId = path.basename(filePath, ".java"); // Get the base name without .java extension
//   const classFilePath = path.join(outPath, `${executionId}.class`);
//   const outputPath = path.join(outPath, `${executionId}.txt`); // Change to .txt to store output as text

//   return new Promise((resolve, reject) => {
//     // Compile the Java file
//     exec(
//       `javac -d ${outPath} ${filePath}`,
//       (compileErr, compileStdout, compileStderr) => {
//         if (compileErr) {
//           reject(compileErr);
//           return;
//         }

//         if (compileStderr) {
//           reject(compileStderr);
//           return;
//         }

//         // Run the compiled Java class and redirect input/output
//         exec(
//           `java -cp ${outPath} ${executionId} < ${inputPath} > ${outputPath}`,
//           (runErr, runStdout, runStderr) => {
//             if (runErr) {
//               reject(runErr);
//               return;
//             }

//             if (runStderr) {
//               reject(runStderr);
//               return;
//             }

//             // Read the output from the file
//             fs.readFile(outputPath, "utf8", (readErr, data) => {
//               if (readErr) {
//                 reject(readErr);
//                 return;
//               }

//               // Resolve with the output data
//               resolve(data);
//             });
//           }
//         );
//       }
//     );
//   });
// };

// module.exports = { executeCodeJava };

/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const outPath = path.join(__dirname, "outputExe");

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

// eslint-disable-next-line no-unused-vars
const executeCodeJava = (filePath, inputPath) => {
  const className = path.basename(filePath, ".java"); // Class name is the same as the file name without extension
  const outputPath = path.join(outPath, `${className}.txt`); // Path for the output file

  return new Promise((resolve, reject) => {
    // Compile the Java file
    exec(`javac ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Compilation Error: ${stderr}`);
        return;
      }

      // Run the compiled Java file
      exec(
        `java -cp ${path.dirname(filePath)} ${className} < ${inputPath} > ${outputPath}`,
        (err, stdout, stderr) => {
          if (err) {
            reject(`Runtime Error: ${stderr}`);
            return;
          }

          // Read the output from the file
          fs.readFile(outputPath, "utf8", (readErr, data) => {
            if (readErr) {
              reject(`Read Error: ${readErr}`);
              return;
            }

            // Resolve with the output data
            resolve(data);
          });
        }
      );
    });
  });
};

module.exports = { executeCodeJava };
