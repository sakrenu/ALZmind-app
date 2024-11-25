import React from 'react';

const MemoryTestResults = ({ results }) => {
  return (
    <div className="results text-center">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Test Results</h2>
      <p>Accuracy: {results.accuracy.toFixed(2)}%</p>
      <p>Total Trials: {results.total_trials}</p>
      <p>Correct Responses: {results.correct_responses}</p>
    </div>
  );
};

export default MemoryTestResults;
