import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import GoNoGoTestComponent from './GoNoGoTestComponent';
import StroopTest from './StroopTest';
import MemoryTest from './MemoryTest';
import CognitiveTestResults from './CognitiveTestResults';
import StroopTestResults from './StroopTestResults';
import MemoryTestResults from './MemoryTestResults';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import CloudinaryUploadWidget from '../CloudinaryUploadWidget'; // Import the Cloudinary Upload Widget

const PatientDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTest, setActiveTest] = useState(null);
  const [signal, setSignal] = useState(null);
  const [results, setResults] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [profile, setProfile] = useState(null);
  const [mriScanUrl, setMriScanUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCaregiversManual, setShowCaregiversManual] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [prescription, setPrescription] = useState('');
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
      setUserData({
        name: "John Doe",
        email: "john@example.com",
        nextTest: "Cognitive Assessment - April 20, 2024",
      });
      setLoading(false);
    };

    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          setMriScanUrl(docSnap.data().mriScanUrl);
        }
      }
    };

    fetchUserData();
    fetchUserProfile();
  }, []);

  const handleStartTest = async (testType) => {
    const sessionId = "unique_session_id"; // Generate or fetch a session ID
    const backendTestTypeMap = {
      "Cognitive Assessment Test": "GoNoGo",
      "Memory Test": "Memory",
      "Stroop Test": "Stroop",
    };
    try {
      const response = await fetch("http://127.0.0.1:5000/start-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          test_type: backendTestTypeMap[testType],
          language_code: selectedLanguage,
        }),
      });
      const data = await response.json();
      console.log("Test started:", data);
      setSignal(data.signal);
      setActiveTest(testType);
    } catch (error) {
      console.error("Error starting test:", error);
    }
  };

  const handleTestCompletion = (response) => {
    const sessionId = "unique_session_id";
    fetch("http://127.0.0.1:5000/submit-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
        response: response,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          console.log("Test completed:", data.results);
          setSignal("");
          setResults(data.results);
        } else {
          setSignal(data.signal);
        }
      })
      .catch((error) => {
        console.error("Error submitting response:", error);
      });
  };

  const handleReturnToDashboard = () => {
    setActiveTest(null);
    setResults(null);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), profile, { merge: true });
      setIsEditing(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleMriScanUpload = (url) => {
    const user = auth.currentUser;
    if (user) {
      setMriScanUrl(url);
      updateDoc(doc(db, 'users', user.uid), { mriScanUrl: url });
      alert("MRI scan uploaded successfully!");
    }
  };
  const handleEmergencyContactChange = (e) => {
    setEmergencyContact(e.target.value);
  };

  const handleEmergencyContactSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), { emergencyContact: emergencyContact });
      alert("Emergency contact updated successfully!");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API delay
      setUserData({
        name: "John Doe",
        email: "john@example.com",
        nextTest: "Cognitive Assessment - April 20, 2024",
      });
      setLoading(false);
    };

    const fetchPrescription = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPrescription(docSnap.data().prescription || '');
          setPrescriptionImage(docSnap.data().prescriptionImage || null);
        }
      }
    };

    fetchUserData();
    fetchPrescription();
  }, []);



  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (activeTest === "Cognitive Assessment Test" && !results) {
    return (
      <GoNoGoTestComponent
        signal={signal}
        onResponse={handleTestCompletion}
      />
    );
  }

  if (activeTest === "Stroop Test" && !results) {
    return (
      <StroopTest
        signal={signal}
        onResponse={handleTestCompletion}
      />
    );
  }

  if (activeTest === "Memory Test" && !results) {
    return (
      <MemoryTest
        signal={signal}
        onResponse={handleTestCompletion}
      />
    );
  }

  if (results) {
    return (
      <div>
        {activeTest === "Cognitive Assessment Test" && <CognitiveTestResults results={results} />}
        {activeTest === "Stroop Test" && <StroopTestResults results={results} />}
        {activeTest === "Memory Test" && <MemoryTestResults results={results} />}
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 mt-4"
          onClick={handleReturnToDashboard}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const tests = [
    {
      id: 1,
      title: "Cognitive Assessment Test",
      description: "Test your cognitive abilities with our comprehensive assessment.",
      duration: "20 min",
      lastCompleted: "March 15, 2024",
    },
    {
      id: 2,
      title: "Memory Test",
      description: "Evaluate your memory capabilities with our specialized test.",
      duration: "15 min",
      lastCompleted: "March 10, 2024",
    },
    {
      id: 3,
      title: "Stroop Test",
      description: "Evaluate your cognitive flexibility with the Stroop Test.",
      duration: "10 min",
      lastCompleted: "March 12, 2024",
    },
  ];

  return (
    <div className="bg-lavender min-h-screen p-6">
      <header className="flex justify-between items-center bg-deepviolet shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-white">Patient Support</h1>
        <button onClick={() => auth.signOut()} className="bg-ultraviolet text-white px-4 py-2 rounded-md hover:bg-africanviolet">
          Logout
        </button>
      </header>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-africanviolet shadow-lg rounded-lg p-6 col-span-1 md:col-span-2">
        <h2 className="text-xl text-deepviolet font-bold mb-4">👤 Welcome, {profile?.name || ''}</h2>
        <p className="text-periwinkle">{profile?.email || ''}</p>
        <p className="text-periwinkle mt-2">Next Test: {userData.nextTest}</p>
      </div>

      <div className="bg-africanviolet shadow-lg rounded-lg p-6">
        <h2 className="text-xl text-deepviolet font-bold mb-4">Select Language</h2>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-deepviolet leading-tight focus:outline-none focus:shadow-outline bg-lavender"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="te">Telugu</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
          <option value="gu">Gujarati</option>
          <option value="kn">Kannada</option>
          <option value="ml">Malayalam</option>
          <option value="pa">Punjabi</option>
        </select>
      </div>
    </div>

      

       <div className="bg-africanviolet shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl text-deepviolet font-bold mb-4">👤 Profile</h2>
      {isEditing ? (
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-periwinkle mb-2">Name</label>
            <input
              type="text"
              value={profile?.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Email</label>
            <input
              type="email"
              value={profile?.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Contact No</label>
            <input
              type="text"
              value={profile?.contactNo || ''}
              onChange={(e) => setProfile({ ...profile, contactNo: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Gender</label>
            <input
              type="text"
              value={profile?.gender || ''}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Education</label>
            <input
              type="text"
              value={profile?.education || ''}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Ethnicity</label>
            <input
              type="text"
              value={profile?.ethnicity || ''}
              onChange={(e) => setProfile({ ...profile, ethnicity: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Race Category</label>
            <input
              type="text"
              value={profile?.race_cat || ''}
              onChange={(e) => setProfile({ ...profile, race_cat: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Apoe Allele Type</label>
            <input
              type="text"
              value={profile?.Apoe_allele_type || ''}
              onChange={(e) => setProfile({ ...profile, Apoe_allele_type: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">Imputed Genotype</label>
            <input
              type="text"
              value={profile?.Imputed_genotype || ''}
              onChange={(e) => setProfile({ ...profile, Imputed_genotype: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div>
            <label className="block text-periwinkle mb-2">MMSE</label>
            <input
              type="text"
              value={profile?.Mmse || ''}
              onChange={(e) => setProfile({ ...profile, Mmse: e.target.value })}
              className="w-full p-2 border rounded bg-gray-100 text-deepviolet"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-deepviolet text-white px-4 py-2 rounded-md hover:bg-ultraviolet">
              Save Profile
            </button>
            <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Contact No:</strong> {profile?.contactNo}</p>
          <p><strong>Gender:</strong> {profile?.gender}</p>
          <p><strong>Education:</strong> {profile?.education}</p>
          <p><strong>Ethnicity:</strong> {profile?.ethnicity}</p>
          <p><strong>Race Category:</strong> {profile?.race_cat}</p>
          <p><strong>Apoe Allele Type:</strong> {profile?.Apoe_allele_type}</p>
          <p><strong>Imputed Genotype:</strong> {profile?.Imputed_genotype}</p>
          <p><strong>MMSE:</strong> {profile?.Mmse}</p>
          <button onClick={handleEditProfile} className="bg-deepviolet text-white px-4 py-2 rounded-md hover:bg-ultraviolet mt-4">
            Edit Profile
          </button>
        </div>
      )}
    </div>

      
      <div className="bg-africanviolet shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl text-deepviolet font-bold mb-4">Upload MRI Scan</h2>
      <CloudinaryUploadWidget onUploadSuccess={handleMriScanUpload} />
      {mriScanUrl && (
        <div className="mt-4">
          <p className="text-periwinkle">MRI Scan Uploaded:</p>
          <a href={mriScanUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            View MRI Scan
          </a>
        </div>
      )}
    </div>
 
      <section>
      <h2 className="text-2xl font-bold text-deepviolet mb-4">Available Tests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-deepviolet shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{test.title}</h3>
            <p className="text-periwinkle mb-4">{test.description}</p>
            <div className="flex justify-between text-sm text-periwinkle mb-4">
              <span>⏱️ {test.duration}</span>
              <span>🕒 Last: {test.lastCompleted}</span>
            </div>
            <button
              className="w-full bg-ultraviolet text-white py-2 rounded-md hover:bg-africanviolet transition-colors"
              onClick={() => handleStartTest(test.title)}
            >
              Start Test
            </button>
          </div>
        ))}
      </div>
    </section>

{/*     
    </div> */}

<div className="mt-8 bg-africanviolet shadow-lg rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center bg-deepviolet p-4 rounded-lg mb-4">
          <div>
            <h2 className="text-xl font-bold mb-2 text-white">My Prescription</h2>
          </div>
          <button
            onClick={() => setShowPrescription(!showPrescription)}
            className="bg-ultraviolet text-white px-4 py-2 rounded hover:bg-africanviolet"
          >
            {showPrescription ? "Hide Prescription" : "View Prescription"}
          </button>
        </div>
        {showPrescription && (
          <div className="mt-4">
            {prescriptionImage && (
              <img src={prescriptionImage} alt="Prescription" className="w-full mb-4" />
            )}
            <p className="text-periwinkle">{prescription}</p>
          </div>
        )}
      </div>

    <div className=" mt-8 bg-africanviolet shadow-lg rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center bg-deepviolet p-4 rounded-lg mb-4">
          <div>
            <h2 className="text-xl font-bold mb-2 text-white">Caregivers Manual</h2>
            <p className="text-periwinkle">
              Instructions and guidelines for caregivers to support Alzheimer's patients.
            </p>
          </div>
          <button
            onClick={() => setShowCaregiversManual(!showCaregiversManual)}
            className="bg-ultraviolet text-white px-4 py-2 rounded hover:bg-africanviolet"
          >
            {showCaregiversManual ? "Hide" : "Learn More"}
          </button>
        </div>
        {showCaregiversManual && (
          <div className="mt-4">
            <p className="text-periwinkle">
              Here are some instructions for caregivers:
            </p>
            {/* <ul className="list-disc list-inside text-periwinkle">
              <li>Ensure the patient takes their medication on time.</li>
              <li>Provide a balanced and nutritious diet.</li>
              <li>Encourage regular physical activity.</li>
              <li>Maintain a safe and comfortable living environment.</li>
              <li>Engage the patient in mentally stimulating activities.</li>
              <li>Monitor for any changes in behavior or health and report to the doctor.</li>
            </ul> */}
            <ul className="list-disc list-inside text-periwinkle">
  <li>
    <strong  className='text-deepviolet'>Create a Safe and Comfortable Environment:</strong>
    <ul className="list-disc list-inside">
      <li>Remove potential hazards to prevent accidents (e.g., sharp objects, slippery floors).</li>
      <li>Label doors and drawers to help with orientation and reduce confusion.</li>
      <li>Keep pathways clear and well-lit to minimize the risk of falls.</li>
    </ul>
    <hr />
  </li>

  <li>
    <strong  className='text-deepviolet'>Maintain a Daily Routine:</strong>
    <ul className="list-disc list-inside">
      <li>Establish regular times for meals, medications, and activities to reduce anxiety.</li>
      <li>Include familiar tasks that they enjoy or can still manage, such as folding laundry or gardening.</li>
      <li>Be flexible and adjust the routine to their mood and energy levels.</li>
    </ul>
    <hr />
  </li>

  <li>
    <strong className='text-deepviolet'>Communicate with Patience and Clarity:</strong>
    <ul className="list-disc list-inside">
      <li>Use simple words and short sentences.</li>
      <li>Maintain eye contact and speak in a calm, reassuring tone.</li>
      <li>Avoid correcting or arguing; instead, redirect conversations if confusion arises.</li>
    </ul>
    <hr />
  </li>

  <li>
    <strong  className='text-deepviolet'>Encourage Physical and Mental Activity:</strong>
    <ul className="list-disc list-inside">
      <li>Take short walks or engage in light exercises to promote mobility and circulation.</li>
      <li>Play memory games, listen to music, or do puzzles to stimulate their mind.</li>
      <li>Allow them to participate in simple chores or hobbies they used to enjoy.</li>
    </ul>
    <hr />
  </li>

  <li>
    <strong  className='text-deepviolet'>Address Emotional Needs:</strong>
    <ul className="list-disc list-inside">
      <li>Show empathy and reassurance when they feel confused or agitated.</li>
      <li>Offer physical touch, such as holding their hand, to convey comfort and love.</li>
      <li>Celebrate small successes to boost their self-esteem.</li>
    </ul>
    <hr />
  </li>

  <li>
    <strong  className='text-deepviolet'>Provide Nutritious Meals and Hydration:</strong>
    <ul className="list-disc list-inside">
      <li>Serve balanced meals rich in vegetables, fruits, whole grains, and lean protein.</li>
      <li>Cut food into small, manageable pieces if they have difficulty eating.</li>
      <li>Encourage regular hydration to prevent dehydration.</li>
    </ul>
    <hr />
  </li>

  <li>
    <strong   className='text-deepviolet'>Take Care of Yourself:</strong>
    <ul className="list-disc list-inside">
      <li>Seek support from caregiver groups or counseling services to manage stress.</li>
      <li>Take regular breaks to recharge, ensuring you don’t neglect your own needs.</li>
      <li>Share responsibilities with family members or hire professional help when needed.</li>
    </ul>
    <hr />
  </li>

  <li>
    <strong >Seek Professional Guidance:</strong>
    <ul className="list-disc list-inside">
      <li>Regularly consult with healthcare providers for updates on their condition.</li>
      <li>Learn about medications and therapies that may help manage symptoms.</li>
      <li>Stay informed about the progression of Alzheimer's to prepare for future needs.</li>
    </ul>
    <hr />
  </li>
</ul>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-white mb-2">Emergency Contact</h3>
              <form onSubmit={handleEmergencyContactSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={handleEmergencyContactChange}
                  placeholder="Enter emergency contact number"
                  className="flex-1 p-2 border rounded bg-lavender text-deepviolet"
                  required
                />
                <button type="submit" className="bg-deepviolet text-white px-4 py-2 rounded hover:bg-ultraviolet">
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
