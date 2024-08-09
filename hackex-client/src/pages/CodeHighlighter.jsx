import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';

const languageExtensions = {
  cpp,
  java,
  python,
  javascript,
};

// eslint-disable-next-line react/prop-types
const CodeHighlighter = ({ language }) => {
  const [code, setCode] = useState('');

  return (
    <div>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[
          languageExtensions[language](), // Language extension
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
