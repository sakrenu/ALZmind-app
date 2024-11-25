import React, { useState, useEffect } from 'react';

const StroopTestComponent = ({ onComplete, languageCode, signal, onResponse }) => {
  const [currentWord, setCurrentWord] = useState(signal.word || '');
  const [currentColor, setCurrentColor] = useState(signal.color || '');
  const [correctResponses, setCorrectResponses] = useState(0);
  const [totalTrials, setTotalTrials] = useState(10);
  const [currentTrial, setCurrentTrial] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const colorWords = ["Red", "Blue", "Green", "Yellow"];
  const displayColors = ["red", "blue", "green", "yellow"];

  useEffect(() => {
    if (signal.word && signal.color) {
      setCurrentWord(signal.word);
      setCurrentColor(signal.color);
    }
  }, [signal]);

  const evaluateStroopResponse = (color) => {
    setCurrentTrial(currentTrial + 1);
    if (color === currentColor) {
      setCorrectResponses(correctResponses + 1);
    }
    onResponse(color);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Stroop Test</h2>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-4" style={{ color: currentColor }}>
          {currentWord}
        </div>
        <div className="flex gap-4">
          {displayColors.map((color) => (
            <button
              key={color}
              className="bg-gray-300 text-white px-6 py-3 rounded-md hover:bg-gray-400"
              style={{ backgroundColor: color }}
              onClick={() => evaluateStroopResponse(color)}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StroopTestComponent;
