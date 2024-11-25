import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setResult({ error: 'Failed to process the image. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="block">
        <span className="sr-only">Choose a file</span>
        <input
          type="file"
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
          onChange={handleFileChange}
        />
      </label>
      <button
        className={`${
          loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
        } text-white px-6 py-2 rounded font-semibold`}
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Upload and Predict'}
      </button>
      {result && (
        <div className="w-full bg-green-50 border border-green-200 rounded p-4 mt-4">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p className="text-gray-800">
                <strong>Class:</strong> {result.class}
              </p>
              <p className="text-gray-800">
                <strong>Confidence:</strong> {result.confidence.toFixed(2)}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
