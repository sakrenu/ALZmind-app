// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import { Link, useNavigate } from "react-router-dom"
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error , setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('Login successful!');
//     } catch (error) {
//       setError('Error logging in: ' + error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Login to Alzheimers detection App</h2>
//         {error && <p className="auth-error">{error}</p>}
//         <form onSubmit={handleLogin} className="auth-form">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="auth-input"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="auth-input"
//           />
//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//         <p className="auth-footer">
//           Not registered? <Link to="/signup" className="auth-link">Create an account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
// //       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
// //       <button onClick={handleLogin}>Login</button>
// //     </div>
// //   );
// // }

// // export default Login;

//--wiht langding page alone - -----
// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';
// import { Link, useNavigate } from "react-router-dom"
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error , setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('Login successful!');
//     } catch (error) {
//       setError('Error logging in: ' + error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Login to Alzheimers detection App</h2>
//         {error && <p className="auth-error">{error}</p>}
//         <form onSubmit={handleLogin} className="auth-form">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="auth-input"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="auth-input"
//           />
//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//         <p className="auth-footer">
//           Not registered? <Link to="/signup" className="auth-link">Create an account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebaseConfig';
// import { Link, useNavigate } from "react-router-dom";
// import { doc, getDoc } from 'firebase/firestore';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
//       // Get user role from Firestore
//       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
//       const userRole = userDoc.data()?.role || 'patient';
      
//       // Store role in localStorage
//       localStorage.setItem('userRole', userRole);
      
//       // Navigate based on role
//       if (userRole === 'doctor') {
//         navigate('/doctor-dashboard');
//       } else {
//         navigate('/patient-dashboard');
//       }
//     } catch (error) {
//       setError('Error logging in: ' + error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Login to Alzheimers Detection App</h2>
//         {error && <p className="auth-error">{error}</p>}
//         <form onSubmit={handleLogin} className="auth-form">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="auth-input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="auth-input"
//             required
//           />
//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//         <p className="auth-footer">
//           Not registered? <Link to="/signup" className="auth-link">Create an account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebaseConfig';
// import { Link, useNavigate } from "react-router-dom";
// import { doc, getDoc } from 'firebase/firestore';
// import './Login.css'; // Add custom styles in a CSS file for better styling control

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);

//       // Get user role from Firestore
//       const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
//       const userRole = userDoc.data()?.role || 'patient';

//       // Store role in localStorage
//       localStorage.setItem('userRole', userRole);

//       // Navigate based on role
//       if (userRole === 'doctor') {
//         navigate('/doctor-dashboard');
//       } else {
//         navigate('/patient-dashboard');
//       }
//     } catch (error) {
//       setError('Error logging in: ' + error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Login to Alzheimer's Detection App</h2>
//         {error && <p className="auth-error">{error}</p>}
//         <form onSubmit={handleLogin} className="auth-form">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="auth-input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="auth-input"
//             required
//           />
//           <button type="submit" className="auth-btn">Login</button>
//         </form>
//         <p className="auth-footer">
//           Not registered? <Link to="/signup" className="auth-link">Create an account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';
import './Login.css'; // Add custom styles in a CSS file for better styling control

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userRole = userDoc.data()?.role || 'patient';

      // Store role in localStorage
      localStorage.setItem('userRole', userRole);

      // Navigate based on role
      if (userRole === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        setError('Network error: Please check your internet connection.');
      } else {
        setError('Error logging in: ' + error.message);
      }
    }
  };

  return (
    <div className="auth-container bg-periwinkle min-h-screen flex items-center justify-center">
      <div className="auth-card bg-white p-8 rounded-lg shadow-lg">
        <h2 className="auth-title text-2xl font-bold text-deepviolet mb-4">Login to Alzheimer's Detection App</h2>
        {error && <p className="auth-error text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input mb-4 p-2 border border-africanviolet rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input mb-4 p-2 border border-africanviolet rounded w-full"
            required
          />
          <button type="submit" className="auth-btn bg-deepviolet text-white p-2 rounded w-full hover:bg-ultraviolet">Login</button>
        </form>
        <p className="auth-footer mt-4 text-africanviolet">
          Not registered? <Link to="/signup" className="auth-link text-ultraviolet hover:text-periwinkle">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
