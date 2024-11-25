// import React, { useState, useEffect } from 'react';

// const MemoryTest = ({ signal, onResponse }) => {
//   const [sequence, setSequence] = useState("");
//   const [instruction, setInstruction] = useState("");
//   const [userResponse, setUserResponse] = useState("");

//   useEffect(() => {
//     if (signal) {
//       setSequence(signal.sequence);
//       setInstruction(signal.instruction);
//     }
//   }, [signal]);

//   const handleSubmit = () => {
//     onResponse(userResponse);
//     setUserResponse("");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h2 className="text-2xl font-bold text-blue-600 mb-4">{instruction}</h2>
//       <div className="text-4xl mb-4">{sequence}</div>
//       <input
//         type="text"
//         value={userResponse}
//         onChange={(e) => setUserResponse(e.target.value)}
//         className="border border-gray-300 p-2 mb-4"
//       />
//       <button
//         className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default MemoryTest;
// import React, { useState, useEffect } from 'react';

// const MemoryTest = ({ signal, onResponse }) => {
//   const [sequence, setSequence] = useState("");
//   const [instruction, setInstruction] = useState("");
//   const [userResponse, setUserResponse] = useState("");

//   useEffect(() => {
//     if (signal) {
//       setSequence(signal.sequence);
//       setInstruction(signal.instruction);
//     }
//   }, [signal]);

//   const handleSubmit = () => {
//     onResponse(userResponse);
//     setUserResponse("");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h2 className="text-2xl font-bold text-blue-600 mb-4">{instruction}</h2>
//       <div className="text-4xl mb-4">{sequence}</div>
//       <input
//         type="text"
//         value={userResponse}
//         onChange={(e) => setUserResponse(e.target.value)}
//         className="border border-gray-300 p-2 mb-4"
//       />
//       <button
//         className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default MemoryTest;
import React, { useState, useEffect } from 'react';

const MemoryTest = ({ signal, onResponse }) => {
  const [sequence, setSequence] = useState("");
  const [instruction, setInstruction] = useState("");
  const [userResponse, setUserResponse] = useState("");

  useEffect(() => {
    if (signal) {
      setSequence(signal.sequence);
      setInstruction(signal.instruction);
    }
  }, [signal]);

  const handleSubmit = () => {
    onResponse(userResponse);
    setUserResponse("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{instruction}</h2>
      <div className="text-4xl mb-4">{sequence}</div>
      <input
        type="text"
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        className="border border-gray-300 p-2 mb-4"
      />
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default MemoryTest;
