const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const dirCustomInputs = path.join(__dirname, "customInputs");

if (!fs.existsSync(dirCustomInputs)) {
  fs.mkdirSync(dirCustomInputs, { recursive: true });
}

const generateInputFile = (customInput) => {
  const executionId = uuidv4();
  const inputFileName = `${executionId}.txt`;
  fs.writeFileSync(path.join(dirCustomInputs, inputFileName), customInput);
  return path.join(dirCustomInputs, inputFileName);
};

module.exports = { generateInputFile };
