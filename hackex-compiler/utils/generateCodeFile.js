const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const dirExecutionCodes = path.join(__dirname, "executionCodes");

if (!fs.existsSync(dirExecutionCodes)) {
  fs.mkdirSync(dirExecutionCodes, { recursive: true });
}

const generateCodeFile = (langName, executionCode) => {
  const executionId = uuidv4();
  const fileName = `${executionId}.${langName}`;
  fs.writeFileSync(path.join(dirExecutionCodes, fileName), executionCode);
  return path.join(dirExecutionCodes, fileName);
};

module.exports = { generateCodeFile };
