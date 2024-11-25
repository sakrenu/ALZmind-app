// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import './App.css';

// const App = () =>{
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<h1>Welcome to the Dashboard</h1>} />
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// ------with landing page ----
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import LandingPage from './components/LandingPage/LandingPage';
// // import LandingPage from './components/LandingPage/LandingPage';

// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<h1>Welcome to the Dashboard</h1>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

//-----with dashboards - 
// App.js
// 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/Landingpage/LandingPage';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NewsPage from './components/NewsPage';
import ChatPage from './components/ChatPage';

import './App.css';
// import ChatPage from './components/ChatPage';

// Unauthorized Page
const UnauthorizedPage = () => (
  <div className="container mx-auto p-4 text-center">
    <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized Access</h1>
    <p className="text-gray-700">You don't have permission to access this page.</p>
    <a href="/" className="text-blue-500 underline">Go back to the homepage</a>
  </div>
);

// 404 Not Found Page
const NotFoundPage = () => (
  <div className="container mx-auto p-4 text-center">
    <h1 className="text-3xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
    <p className="text-gray-700">The page you are looking for does not exist.</p>
    <a href="/" className="text-blue-500 underline">Go back to the homepage</a>
  </div>
);


// Main App Component
const App = () => {

  return (
    <Router>
      <Routes>
      
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/news" element={<NewsPage />} /> {/* Added News route */}
        <Route path="/chat" element={<ChatPage />} /> 
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
       

        {/* Protected Routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
