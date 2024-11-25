// 
// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

// function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert('Signup successful!');
//     } catch (error) {
//       alert('Error signing up: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// }

// export default Signup;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import './signup.css'; // Dark blue background is here

// function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('Patient'); // Default is student
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const provider = new GoogleAuthProvider();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         navigate('/dashboard'); // Route to dashboard after login
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Login failed. Check your credentials.");
//       });
//   };

//   const handleGoogleSignIn = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         navigate('/dashboard'); // Route to dashboard after Google sign-in
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Google Sign-In failed.");
//       });
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login to adt</h2>

//       <form onSubmit={handleLogin}>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

//         {/* Role Selection */}
//         <div className="role-selection">
//           <label>
//             <input type="radio" value="Patient" checked={role === 'Patient'} onChange={() => setRole('patient')} />
//             Login as Patient
//           </label>
//           <label>
//             <input type="radio" value="doctor" checked={role === 'doctor'} onChange={() => setRole('doctor')} />
//             Login as Doctor
//           </label>
//         </div>

//         <button type="submit">Login</button>
//       </form>

//       <button onClick={handleGoogleSignIn} className="google-signin">
//         Sign in with Google
//       </button>

//       <p>Not registered? <Link to="/signup">Create an account</Link></p>
//     </div>
//   );
// }

// export default Signup;




// --------this is with dashboards 
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'; // Add custom styles in a CSS file for better styling control

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('userRole', role);

      if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (error) {
      setError('Error signing up: ' + error.message);
    }
  };

  return (
    <div className="auth-container bg-lavender min-h-screen flex items-center justify-center">
      <div className="auth-card bg-white p-8 rounded-lg shadow-lg">
        <h2 className="auth-title text-2xl font-bold text-deepviolet mb-4">Sign Up</h2>
        {error && <p className="auth-error text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="auth-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input mb-4 p-2 border border-africanviolet rounded w-full"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input mb-4 p-2 border border-africanviolet rounded w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input mb-4 p-2 border border-africanviolet rounded w-full"
            required
          />
          <div className="role-selection mb-4">
            <label className="role-label mr-4">
              <input
                type="radio"
                value="patient"
                checked={role === "patient"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              Patient
            </label>
            <label className="role-label">
              <input
                type="radio"
                value="doctor"
                checked={role === "doctor"}
                onChange={(e) => setRole(e.target.value)}
                className="mr-2"
              />
              Doctor
            </label>
          </div>
          <button type="submit" className="auth-btn bg-deepviolet text-white p-2 rounded w-full hover:bg-ultraviolet">Sign Up</button>
        </form>
        <p className="auth-footer mt-4 text-africanviolet">
          Already have an account? <Link to="/login" className="auth-link text-ultraviolet hover:text-periwinkle">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
