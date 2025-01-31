import { useState } from "react";
import "./index.css";

const CodeEditorApp = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleRunCode = () => {
    try {
      let capturedOutput = "";

      // Custom console.log capture
      const customLog = (...args) => {
        capturedOutput += args.join(" ") + "\n";
      };

      // Capture result or implicit expression value
      const result = new Function("console", `
        let result;
        result = eval(\`${code}\`);
        return result;
      `)( { log: customLog });

      setOutput(
        `${capturedOutput}${
          result !== undefined ? `Result: ${result}` : "Code executed successfully"
        }`
      );
    } catch (error) {
      setOutput(`Error: ${error.toString()}`);
    }
  };

  return (
    <div className="container">
      <h1>Code Editor</h1>
      <textarea
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleRunCode}>Run Code</button>
      <h2>Output:</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditorApp;
