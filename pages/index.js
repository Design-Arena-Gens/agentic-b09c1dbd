import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [scripts, setScripts] = useState([
    { name: 'Hello World', code: 'console.log("Hello, World!");' },
    { name: 'Current Time', code: 'console.log(new Date().toLocaleString());' },
    { name: 'Random Number', code: 'console.log(Math.floor(Math.random() * 100));' }
  ]);

  const runScript = () => {
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
      };

      eval(input);

      console.log = originalLog;
      setOutput(logs.join('\n') || 'Script executed successfully (no output)');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const loadScript = (code) => {
    setInput(code);
    setOutput('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#667eea',
          marginBottom: '30px'
        }}>
          📜 Script Runner
        </h1>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Sample Scripts:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {scripts.map((script, index) => (
              <button
                key={index}
                onClick={() => loadScript(script.code)}
                style={{
                  padding: '8px 16px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {script.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '10px',
            color: '#333',
            fontWeight: 'bold'
          }}>
            Enter Your Script:
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="console.log('Hello!');"
            style={{
              width: '100%',
              height: '150px',
              padding: '10px',
              borderRadius: '5px',
              border: '2px solid #667eea',
              fontSize: '14px',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          onClick={runScript}
          style={{
            width: '100%',
            padding: '12px',
            background: '#764ba2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}
        >
          ▶️ Run Script
        </button>

        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '5px',
          border: '2px solid #ddd'
        }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Output:</h3>
          <pre style={{
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#333',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}>
            {output || 'No output yet. Run a script to see results.'}
          </pre>
        </div>
      </div>
    </div>
  );
}
