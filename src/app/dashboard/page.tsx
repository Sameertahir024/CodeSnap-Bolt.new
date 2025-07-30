'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AIDetector() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const detectContent = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const options = {
        method: 'POST',
        url: 'https://ai-content-detector6.p.rapidapi.com/v1/ai-detector',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_KEY,
          'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_HOST,
          'Content-Type': 'application/json'
        },
        data: {
          text
        }
      };

      const response = await axios.request(options);
      setResult(response.data);
    } catch (err: any) {
      setError('Failed to detect content. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
       <div className="flex gap-2 justify-between">
            
              <p>
                <strong>Confidence:</strong>{" "}
                <span className="text-green-600 uppercase">
                  {result?.confidence}
                </span>
              </p>
              <p>
                <strong>language:</strong>{" "}
                <span className="text-green-600 uppercase">
                  {result?.language}
                </span>
              </p>
              <p>
                <strong>probabilities:</strong>{" "}
                <span className="text-green-600 uppercase">
                  {result?.probabilities?.ai}
                </span>
              </p>
              <p>
                <strong>human:</strong>{" "}
                <span className="text-green-600 uppercase">
                  {result?.probabilities?.human}
                </span>
              </p>
              <p>
                <strong>MIxMIx:</strong>{" "}
                <span className="text-green-600 uppercase">
                  {result?.probabilities.mix}
                </span>
              </p>
            </div>
        
      <h1 className="text-2xl font-bold">🧠 AI Content Detector</h1>
      
      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type text to check if it's AI-generated..."
        className="w-full border rounded p-3 text-sm"
      />

      <button
        onClick={detectContent}
        className="px-6 py-2 bg-blue-600  rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading || !text.trim()}
      >
        {loading ? 'Analyzing...' : 'Detect AI Content'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded ">
          <h2 className="text-lg font-semibold mb-2">Result</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
