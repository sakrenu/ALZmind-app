// import React, { useState } from 'react';

// const ChatPage = () => {
//     const [messages, setMessages] = useState([]);
//     const [userInput, setUserInput] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const response = await fetch('http://127.0.0.1:5000/chat', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: new URLSearchParams({
//                 'user_input': userInput,
//             }),
//         });

//         const data = await response.json();
//         setMessages([...messages, { role: 'user', content: userInput }, { role: 'assistant', content: data.response }]);
//         setUserInput(''); // Clear the input field
//     };

//     return (
//         <div>
//             <h1>Chat with the Assistant</h1>
//             <div id="chat">
//                 {messages.map((msg, index) => (
//                     <div key={index} className={`message ${msg.role}`}>
//                         <strong>{msg.role}:</strong> {msg.content}
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                     placeholder="Type your message..."
//                     required
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// };

// export default ChatPage;
// ChatPage.js
import React, { useEffect } from 'react';

const ChatPage = () => {
  useEffect(() => {
    window.location.href = 'http://127.0.0.1:5000/chat'; // Redirect to Flask
  }, []);

  return <div>Redirecting to Chat...</div>;
};

export default ChatPage;