import React from 'react';

const CognitiveTestResults = ({ results }) => {
  return (
    <div className="results text-center">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
      <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
      <p>Precision: {results.precision.toFixed(2)}%</p>
      <p>Average Response Time: {results.avg_response_time.toFixed(2)} seconds</p>
      <p>Response Time Variability: {results.response_time_variability.toFixed(2)} seconds</p>
    </div>
  );
};

export default CognitiveTestResults;
