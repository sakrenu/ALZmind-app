// import React, { useState } from 'react';
// import './CognitiveTest.css';

// const CognitiveTest = () => {
//   const [signal, setSignal] = useState("");
//   const [results, setResults] = useState(null);
//   const [sessionId, setSessionId] = useState(Date.now()); // Unique session ID

//   const startTest = async () => {
//     const response = await fetch('/start-test', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ session_id: sessionId }),
//     });
//     const data = await response.json();
//     setSignal(data.signal);
//     setResults(null); // Reset results for a new test
//   };

//   const submitResponse = async (isGoResponse) => {
//     const response = await fetch('/submit-response', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ session_id: sessionId, is_go_response: isGoResponse }),
//     });
//     const data = await response.json();
//     if (data.results) {
//       setResults(data.results);
//     } else {
//       setSignal(data.signal);
//     }
//   };

//   return (
//     <div className="cognitive-test">
//       <h1>Go/No-Go Cognitive Test</h1>
//       {signal ? (
//         <>
//           <h2>{signal}</h2>
//           <button onClick={() => submitResponse(true)}>Go</button>
//           <button onClick={() => submitResponse(false)}>No-Go</button>
//         </>
//       ) : (
//         <button onClick={startTest}>Start Test</button>
//       )}
//       {results && (
//         <div className="results">
//           <h2>Results</h2>
//           <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
//           <p>Precision: {results.precision.toFixed(2)}%</p>
//           <p>Average Response Time: {results.avg_response_time.toFixed(2)} seconds</p>
//           <p>Response Time Variability: {results.response_time_variability.toFixed(2)} seconds</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default CognitiveTest;
// import React, { useState } from 'react';
// import './CognitiveTest.css';

// const CognitiveTest = () => {
//   const [signal, setSignal] = useState(""); // Current signal ("Go" or "No-Go")
//   const [results, setResults] = useState(null); // Results from the backend
//   const [sessionId] = useState(Date.now()); // Unique session ID
//   const [loading, setLoading] = useState(false); // Loading state for fetch calls
//   const [error, setError] = useState(""); // Error messages

//   // Start a new test session
//   const startTest = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch('/start-test', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ session_id: sessionId }),
//       });
//       const data = await response.json();
//       setSignal(data.signal);
//       setResults(null); // Reset results for a new test
//     } catch (err) {
//       setError("Failed to start the test. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit a response to the current signal
//   const submitResponse = async (isGoResponse) => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch('/submit-response', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ session_id: sessionId, is_go_response: isGoResponse }),
//       });
//       const data = await response.json();
//       if (data.results) {
//         setResults(data.results); // Display results if the test is completed
//       } else {
//         setSignal(data.signal); // Update the signal for the next trial
//       }
//     } catch (err) {
//       setError("Failed to submit your response. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="cognitive-test">
//       <h1 className="text-3xl font-bold mb-4">Go/No-Go Cognitive Test</h1>

//       {/* Display the current signal or the Start Test button */}
//       {signal ? (
//         <>
//           <h2 className="text-2xl text-blue-500 mb-6">Current Signal: {signal}</h2>
//           <div className="flex gap-4">
//             <button
//               onClick={() => submitResponse(true)}
//               className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//               disabled={loading}
//             >
//               Go
//             </button>
//             <button
//               onClick={() => submitResponse(false)}
//               className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//               disabled={loading}
//             >
//               No-Go
//             </button>
//           </div>
//         </>
//       ) : (
//         <button
//           onClick={startTest}
//           className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Starting..." : "Start Test"}
//         </button>
//       )}

//       {/* Display results if available */}
//       {results && (
//         <div className="results mt-8 p-4 bg-gray-100 rounded shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
//           <p className="text-gray-700">Accuracy: {results.accuracy.toFixed(2)}%</p>
//           <p className="text-gray-700">Precision: {results.precision.toFixed(2)}%</p>
//           <p className="text-gray-700">
//             Average Response Time: {results.avg_response_time.toFixed(2)} seconds
//           </p>
//           <p className="text-gray-700">
//             Response Time Variability: {results.response_time_variability.toFixed(2)} seconds
//           </p>
//         </div>
//       )}

//       {/* Display error messages */}
//       {error && (
//         <div className="error mt-4 text-red-500 font-semibold">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // export default CognitiveTest;
// import React, { useState } from 'react';
// import './CognitiveTest.css';

// const CognitiveTest = () => {
//   const [signal, setSignal] = useState(""); // Current signal ("Go" or "No-Go")
//   const [results, setResults] = useState(null); // Results from the backend
//   const [sessionId] = useState(Date.now()); // Unique session ID
//   const [loading, setLoading] = useState(false); // Loading state for fetch calls
//   const [error, setError] = useState(""); // Error messages

//   // Start a new test session
//   const startTest = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('/start-test', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ session_id: sessionId }),
//       });
//       const data = await response.json();
//       if (data.signal) {
//         setSignal(data.signal);
//         setResults(null); // Reset results for a new test
//         setError(""); // Clear any previous error
//       } else {
//         setError("No signal received from the server.");
//       }
//     } catch (err) {
//       setError("Failed to start the test. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit a response to the current signal
//   const submitResponse = async (isGoResponse) => {
//     setLoading(true);
//     try {
//       const response = await fetch('/submit-response', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ session_id: sessionId, is_go_response: isGoResponse }),
//       });
//       const data = await response.json();
//       if (data.results) {
//         setResults(data.results); // Display results if the test is completed
//         setSignal(""); // Clear signal
//       } else if (data.signal) {
//         setSignal(data.signal); // Update the signal for the next trial
//       } else {
//         setError("Unexpected response from the server.");
//       }
//     } catch (err) {
//       setError("Failed to submit your response. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="cognitive-test">
//       <h1 className="text-3xl font-bold mb-4">Go/No-Go Cognitive Test</h1>

//       {/* Display the current signal or the Start Test button */}
//       {signal ? (
//         <>
//           <h2 className="text-2xl text-blue-500 mb-6">Current Signal: {signal}</h2>
//           <div className="flex gap-4">
//             <button
//               onClick={() => submitResponse(true)}
//               className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//               disabled={loading}
//             >
//               Go
//             </button>
//             <button
//               onClick={() => submitResponse(false)}
//               className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//               disabled={loading}
//             >
//               No-Go
//             </button>
//           </div>
//         </>
//       ) : (
//         <button
//           onClick={startTest}
//           className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Starting..." : "Start Test"}
//         </button>
//       )}

//       {/* Display results if available */}
//       {results && (
//         <div className="results mt-8 p-4 bg-gray-100 rounded shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
//           <p className="text-gray-700">Accuracy: {results.accuracy?.toFixed(2) ?? "N/A"}%</p>
//           <p className="text-gray-700">Precision: {results.precision?.toFixed(2) ?? "N/A"}%</p>
//           <p className="text-gray-700">
//             Average Response Time: {results.avg_response_time?.toFixed(2) ?? "N/A"} seconds
//           </p>
//           <p className="text-gray-700">
//             Response Time Variability: {results.response_time_variability?.toFixed(2) ?? "N/A"} seconds
//           </p>
//         </div>
//       )}

//       {/* Display error messages */}
//       {error && (
//         <div className="error mt-4 text-red-500 font-semibold">
//           <p>{error}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CognitiveTest;
import React, { useState } from 'react';
import './CognitiveTest.css';

const CognitiveTest = ({ signal, onResponse, instructions }) => {
  const [loading, setLoading] = useState(false); // Loading state for fetch calls
  const [error, setError] = useState(""); // Error messages

  // Submit a response to the current signal
  const submitResponse = async (isGoResponse) => {
    setLoading(true);
    try {
      const response = await fetch('/submit-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_go_response: isGoResponse }),
      });
      const data = await response.json();
      if (data.results) {
        onResponse(data.results); // Display results if the test is completed
      } else if (data.signal) {
        onResponse(data.signal); // Update the signal for the next trial
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      setError("Failed to submit your response. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cognitive-test bg-lavender min-h-screen p-6 text-white">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-deepviolet">Go/No-Go Cognitive Test</h1>
      </header>

      <section className="instructions bg-africanviolet p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-2 text-white">Instructions</h2>
        <p className="text-periwinkle">
          {instructions || "This is a Go/No-Go cognitive test. You will be presented with a series of signals. Respond 'Go' if the signal is 'Go' and 'No-Go' if the signal is 'No-Go'. Try to respond as quickly and accurately as possible."}
        </p>
      </section>

      {/* Display the current signal or the Start Test button */}
      {signal ? (
        <>
          <h2 className="text-2xl text-ultraviolet mb-6">Current Signal: {signal}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => submitResponse(true)}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              disabled={loading}
            >
              Go
            </button>
            <button
              onClick={() => submitResponse(false)}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              disabled={loading}
            >
              No-Go
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => onResponse("start")}
          className="bg-deepviolet text-white px-6 py-3 rounded hover:bg-ultraviolet"
          disabled={loading}
        >
          {loading ? "Starting..." : "Start Test"}
        </button>
      )}

      {/* Display error messages */}
      {error && (
        <div className="error mt-4 text-red-500 font-semibold">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CognitiveTest;
