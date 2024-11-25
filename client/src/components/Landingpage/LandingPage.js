// import React from 'react';
// import { Link } from 'react-router-dom';
// import './LandingPage.css'; // Ensure this CSS file is created for styling.

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       <nav className="navbar">
//         <h1>Alzheimer's Detection</h1>
//         <div className="nav-links">
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       </nav>
//       <div className="landing-content">
//         <h2>Welcome to Alzheimer's Support Platform</h2>
//         <p>
//           Learn more about early detection, support tools, and resources for
//           Alzheimer’s patients and caregivers.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

// -----------------working one below ---------------------
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './LandingPage.css'; // Ensure this CSS file is created for styling.

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       <nav className="navbar">
//         <h1>Alzheimer's Detection</h1>
//         <div className="nav-links">
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/news">News</Link> {/* Added News link */}
//           <Link to="/chat">Chat with assistent</Link>
//         </div>
//       </nav>
//       <div className="landing-content">
//         <h2>Welcome to Alzheimer's Support Platform</h2>
//         <p>
//           Learn more about early detection, support tools, and resources for
//           Alzheimer’s patients and caregivers.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

// ---------------------working one above 25th nov-----------------
import React from 'react';

const LandingPage = () => {
  const handleRedirect = (url) => {
    window.location.href = url;
  };

  const styles = {
    root: {
      backgroundImage: "url('/background.png')", // Path to your image in public folder
      backgroundColor: 'rgba(230, 230, 250, 0.9)', // Reduced translucency
      backgroundBlendMode: 'overlay',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    navbar: {
      backgroundColor: '#373784', // Deep violet
      color: 'white',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navLinks: {
      display: 'flex',
      gap: '16px',
    },
    button: {
      backgroundColor: '#5F599A', // Ultraviolet
      color: 'white',
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
      textDecoration: 'none',
    },
    buttonHover: {
      backgroundColor: '#877BB0', // African violet
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '16px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#5F599A', // Ultraviolet
      marginBottom: '16px',
    },
    description: {
      fontSize: '1.125rem',
      color: '#5F599A', // Ultraviolet for softer readability
      lineHeight: '1.6',
      maxWidth: '800px',
      textAlign: 'justify',
    },
    arrowBounce: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderBottom: '10px solid white',
      animation: 'bounce 2s infinite',
    },
  };

  return (
    <div style={styles.root}>
      <nav style={styles.navbar}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Alzmind</h1>
        <div style={styles.navLinks}>
          <button
            onClick={() => handleRedirect('/login')}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login
          </button>
          <button
            onClick={() => handleRedirect('/signup')}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Sign Up
          </button>
          <button
            onClick={() => handleRedirect('http://127.0.0.1:5000/news')}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Latest News
          </button>
          <button
            onClick={() => handleRedirect('http://127.0.0.1:5000/chat')}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Chat with Assistant
          </button>
        </div>
      </nav>
      <div style={styles.content}>
      <h2 style={styles.title}>Welcome to Alz Mind</h2>
      <p style={styles.description}>
        "Memories define who we are." Alz Mind is your companion in the journey against Alzheimer's. 
        <br /><br />
        For doctors, our platform offers seamless access to patient data and AI-driven tools to make informed decisions effortlessly. 
        <br /><br />
        For patients, we provide an intuitive platform to take tests, share reports digitally with doctors, and access resources without the hassle of carrying physical documents. Caregivers can also benefit from resources tailored to their needs. 
        <br /><br />
        Stay updated with the latest Alzheimer's news and chat with our AI assistant to find answers at your fingertips. Log in as a doctor or patient and experience the ease of Alz Mind.
      </p>

        <div style={styles.arrowBounce}></div>
      </div>
    </div>
  );
};

export default LandingPage;








// // export default LandingPage;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       const response = await fetch('/api/news');
//       const data = await response.json();
//       setArticles(data.articles);
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-800 to-gray-900 text-white p-4">
//       <nav className="flex justify-between items-center p-4 border-b-2 border-blue-600">
//         <h1 className="text-2xl font-bold">Alzheimer's Detection</h1>
//         <div className="space-x-4">
//           <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
//           <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign Up</Link>
//         </div>
//       </nav>
//       <div className="max-w-2xl mx-auto mt-10 text-center">
//         <h2 className="text-4xl font-bold mb-4">Welcome to Alzheimer's Support Platform</h2>
//         <p className="text-lg mb-8">
//           Learn more about early detection, support tools, and resources for
//           Alzheimer’s patients and caregivers.
//         </p>
//         <div className="space-y-4">
//           <h3 className="text-2xl font-semibold">Real-time Alzheimer's News</h3>
//           {articles.map((article, index) => (
//             <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
//               <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
//                 <h4 className="text-xl font-semibold mb-2">{article.title}</h4>
//               </a>
//               <p className="text-gray-400">{article.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   const [articles, setArticles] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch('/api/news');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setArticles(data.articles);
//       } catch (error) {
//         setError(error.message);
//         console.error('Failed to fetch news:', error);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-r from-blue-800 to-gray-900 text-white p-4">
//         <nav className="flex justify-between items-center p-4 border-b-2 border-blue-600">
//           <h1 className="text-2xl font-bold">Alzheimer's Detection</h1>
//           <div className="space-x-4">
//             <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
//             <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign Up</Link>
//           </div>
//         </nav>
//         <div className="max-w-2xl mx-auto mt-10 text-center">
//           <h2 className="text-4xl font-bold mb-4">Welcome to Alzheimer's Support Platform</h2>
//           <p className="text-lg mb-8">
//             Learn more about early detection, support tools, and resources for
//             Alzheimer’s patients and caregivers.
//           </p>
//           <div className="text-red-500">Error: {error}</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-800 to-gray-900 text-white p-4">
//       <nav className="flex justify-between items-center p-4 border-b-2 border-blue-600">
//         <h1 className="text-2xl font-bold">Alzheimer's Detection</h1>
//         <div className="space-x-4">
//           <Link to="/login" className="text-blue-400 hover:text-blue-300">Login</Link>
//           <Link to="/signup" className="text-blue-400 hover:text-blue-300">Sign Up</Link>
//         </div>
//       </nav>
//       <div className="max-w-2xl mx-auto mt-10 text-center">
//         <h2 className="text-4xl font-bold mb-4">Welcome to Alzheimer's Support Platform</h2>
//         <p className="text-lg mb-8">
//           Learn more about early detection, support tools, and resources for
//           Alzheimer’s patients and caregivers.
//         </p>
//         <div className="space-y-4">
//           <h3 className="text-2xl font-semibold">Real-time Alzheimer's News</h3>
//           {articles.length > 0 ? (
//             articles.map((article, index) => (
//               <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
//                 <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
//                   <h4 className="text-xl font-semibold mb-2">{article.title}</h4>
//                 </a>
//                 <p className="text-gray-400">{article.description}</p>
//               </div>
//             ))
//           ) : (
//             <p>No news articles available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import './LandingPage.css';

// const LandingPage = () => {
//   const [articles, setArticles] = useState([]);

//   // Fetch news articles from the Flask API
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/get_news');
//         if (!response.ok) {
//           throw new Error('Failed to fetch news');
//         }
//         const data = await response.json(); // Parse the JSON response
//         setArticles(data.articles); // Update state with articles
//       } catch (error) {
//         console.error('Error fetching news:', error);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="landing-page">
//       <nav className="navbar">
//         <h1>Alzheimer's Detection</h1>
//         <div className="nav-links">
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       </nav>
//       <div className="landing-content">
//         <h2>Welcome to Alzheimer's Support Platform</h2>
//         <p>
//           Learn more about early detection, support tools, and resources for
//           Alzheimer’s patients and caregivers.
//         </p>
//         <div className="news-section">
//           <h3>Latest Alzheimer's News</h3>
//           {articles.length === 0 ? (
//             <p>Loading news...</p>
//           ) : (
//             articles.map((article, index) => (
//               <div key={index} className="news-article">
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">
//                   <h4>{article.title}</h4>
//                 </a>
//                 <p>{article.description}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;