/* eslint-disable react/prop-types */
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
const CodeHighlighter = ({ language, height = "1000px", code, setCode }) => {
  if (language === "c") language = "cpp";

  if (language === "c") language = "cpp";
  if (language === "js") language = "javascript";

  return (
    <div>
      <CodeMirror
        value={code}
        height={height}
        extensions={[languageExtensions[language]()]}
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
