// import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';

const languageExtensions = {
  cpp,
  java,
  python,
  javascript
};

// eslint-disable-next-line react/prop-types
const CodeHighlighter = ({ language, code, setCode }) => {

	if(language==='c') language='cpp'
	// if(language === 'javascript') language = 'js'
	// console.log(language)
	// console.log(code)
	if(language==='c') language='cpp'
	if(language === 'js') language = 'javascript'
	// console.log(language)
	// console.log(code)

  return (
    <div>
      <CodeMirror
        value={code}
        height="200px"
        extensions={[languageExtensions[language]()]}
        onChange={(value) => setCode(value)} // Call setCode to update the input
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
