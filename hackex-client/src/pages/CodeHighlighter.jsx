/* eslint-disable react/prop-types */
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { githubLight } from "@uiw/codemirror-theme-github";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";
import { bespin } from "@uiw/codemirror-theme-bespin";
import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
// import { indentUnit } from "@codemirror/language";
// import { EditorState } from "@codemirror/state";

const languageExtensions = {
  cpp,
  java,
  python,
  javascript,
};

const themes = {
  oneDark,
  githubLight,
  solarizedLight,
  solarizedDark,
  bespin,
  duotoneDark,
  dracula,
  xcodeDark,
  xcodeLight,
  vscodeDark,
  okaidia,
  duotoneLight,
};

const CodeHighlighter = ({
  language = "cpp",
  height = "1000px",
  code = "",
  setCode,
  theme = "solarizedDark",
}) => {
  if (language === "c") language = "cpp";

  if (language === "c") language = "cpp";
  if (language === "js") language = "javascript";

  console.log(height);

  return (
    <CodeMirror
      value={code}
      height={height}
      theme={themes[theme]}
      extensions={[languageExtensions[language]()]}
      onChange={(value) => setCode(value)}
      options={{
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
      }}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
      // className="codemirror-transparent"
    />
  );
};

export default CodeHighlighter;
