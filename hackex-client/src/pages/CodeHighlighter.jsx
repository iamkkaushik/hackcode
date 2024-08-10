/* eslint-disable react/prop-types */
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
// import {
//   dracula,
//   solarizedDark,
//   oneDark,
//   monokai,
// } from "@uiw/codemirror-theme-dracula";

const languageExtensions = {
  cpp,
  java,
  python,
  javascript,
};

// const themes = {
//   dracula,
//   solarizedDark,
//   oneDark,
//   monokai,
// };

// eslint-disable-next-line react/prop-types
const CodeHighlighter = ({
  language,
  height = "1000px",
  // theme = "dracula",
}) => {
  const [code, setCode] = useState("");

  console.log(height);

  return (
    <div>
      <CodeMirror
        value={code}
        height={height}
        extensions={[
          languageExtensions[language](), // Language extension
          // themes[theme],
        ]}
        onChange={(value) => setCode(value)}
        options={{
          lineNumbers: true,
          indentUnit: 4,
          tabSize: 4,
        }}
      />
    </div>
  );
};

export default CodeHighlighter;
