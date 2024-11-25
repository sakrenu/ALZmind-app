import React from 'react';

const GoNoGoTestComponent = ({ signal, onResponse }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal}</h2>
    <div className="flex gap-4">
      <button
        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        onClick={() => onResponse(true)}
      >
        Go
      </button>
      <button
        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
        onClick={() => onResponse(false)}
      >
        No-Go
      </button>
    </div>
  </div>
);

export default GoNoGoTestComponent;
