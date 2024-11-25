// import React from 'react';

// const StroopTest = ({ signal, onResponse }) => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal.word}</h2>
//       <div style={{ fontSize: '24px', color: signal.color }}>
//         {signal.word}
//       </div>
//       <div className="flex gap-4 mt-4">
//         {['red', 'blue', 'green', 'yellow'].map(color => (
//           <button
//             key={color}
//             style={{ backgroundColor: color }}
//             className="text-white px-6 py-3 rounded-md hover:bg-opacity-80"
//             onClick={() => onResponse(color)}
//           >
//             {color.charAt(0).toUpperCase() + color.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StroopTest;
import React from 'react';

const StroopTest = ({ signal, onResponse }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Current Signal: {signal.word}</h2>
      <div style={{ fontSize: '24px', color: signal.color }}>
        {signal.word}
      </div>
      <div className="flex gap-4 mt-4">
        {['red', 'blue', 'green', 'yellow'].map(color => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="text-white px-6 py-3 rounded-md hover:bg-opacity-80"
            onClick={() => onResponse(color)}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StroopTest;
