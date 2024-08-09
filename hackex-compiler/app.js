const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { generateCodeFile } = require("./utils/generateCodeFile");
const { executeCodeCpp } = require("./utils/executeCodeCpp");
const { generateInputFile } = require("./utils/generateInputFile");
const { executeCodePython } = require("./utils/executeCodePython");
const { executeCodeJava } = require("./utils/executeCodeJava");
const { executeCodeJavaScript } = require("./utils/executeCodeJavascript");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.post("/execute", async (req, res) => {
  const { langName, executionCode, customInput = "" } = req.body;

  if (!langName || !executionCode) {
    return res.status(500).json({
      status: "fail",
      message:
        "Invalid request! Please provide both name of language and code to execute.",
    });
  }

  try {
    const filePath = generateCodeFile(langName, executionCode);
    const inputPath = generateInputFile(customInput);
    let out;
    switch (langName) {
      case "cpp":
        out = await executeCodeCpp(filePath, inputPath);
        break;
      case "c":
        out = await executeCodeCpp(filePath, inputPath);
        break;
      case "python":
        out = await executeCodePython(filePath, inputPath);
        break;
      case "java":
        out = await executeCodeJava(filePath, inputPath);
        break;
      case "js":
        out = await executeCodeJavaScript(filePath, inputPath);
        break;
      default:
        throw new Error("Invalid language");
    }

    res.status(200).json({ langName, executionCode, filePath, out, inputPath });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
