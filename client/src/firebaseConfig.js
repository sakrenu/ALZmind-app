import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGPJeG530wasjDq634rug8EGH9xRh7u9M",
  authDomain: "aih-alz-detect.firebaseapp.com",
  projectId: "aih-alz-detect",
  storageBucket: "aih-alz-detect.firebasestorage.app",
  messagingSenderId: "951947844576",
  appId: "1:951947844576:web:4a19c1a0c117688b6d2985",
  measurementId: "G-BZFBP9XFMC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCGPJeG530wasjDq634rug8EGH9xRh7u9M",
//   authDomain: "aih-alz-detect.firebaseapp.com",
//   projectId: "aih-alz-detect",
//   storageBucket: "aih-alz-detect.firebasestorage.app",
//   messagingSenderId: "951947844576",
//   appId: "1:951947844576:web:4a19c1a0c117688b6d2985",
//   measurementId: "G-BZFBP9XFMC"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// export { auth, db, storage };


