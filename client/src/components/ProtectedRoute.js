// // components/ProtectedRoute.js
// import { Navigate } from 'react-router-dom';
// import { auth } from '../firebaseConfig';

// const ProtectedRoute = ({ children, allowedRole }) => {
//   const userRole = localStorage.getItem('userRole');
  
//   if (!auth.currentUser) {
//     return <Navigate to="/login" />;
//   }

//   if (allowedRole && userRole !== allowedRole) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children, allowedRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner if needed
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userRole = localStorage.getItem('userRole');
  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
