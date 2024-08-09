const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { generateCodeFile } = require("./utils/generateCodeFile");
const { executeCode } = require("./utils/executeCode");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.post("/execute", async (req, res) => {
  const { langName, executionCode } = req.body;

  if (!langName || !executionCode) {
    return res.status(500).json({
      status: "fail",
      message:
        "Invalid request! Please provide both name of language and code to execute.",
    });
  }

  try {
    const filePath = generateCodeFile(langName, executionCode);
    const out = await executeCode(filePath, langName);
    res.status(200).json({ langName, executionCode, filePath, out });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
