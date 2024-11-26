import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, getDoc , setDoc} from 'firebase/firestore';
import ImageUpload from './ImageUpload';
import axios from 'axios';
const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [patientDetails, setPatientDetails] = useState(null);
  const [nextMeet, setNextMeet] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    education: '',
    ethnicity: '',
    race_cat: '',
    apoe_allele_type: '',
    apoe_genotype: '',
    imputed_genotype: '',
    mmse: '',
  });
  
  const [alzPredictionResult, setAlzPredictionResult] = useState(null);
  const [mriPredictionResult, setMriPredictionResult] = useState(null);
  const [showPatientList, setShowPatientList] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showMriClassification, setShowMriClassification] = useState(false);
  const [showNextMeetForm, setShowNextMeetForm] = useState(false);
  const [nextMeetData, setNextMeetData] = useState({
    patient: '',
    date: '',
    reason: ''
  });
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const q = query(
          collection(db, 'users'),
          where('role', '==', 'patient')
        );
        const querySnapshot = await getDocs(q);
        const patientsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPatients(patientsList);

        setNextMeet({
          date: new Date(),
          patient: 'John Doe',
          reason: 'Follow-up Consultation',
        });
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAlzPredictionSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-alz', formData);
      setAlzPredictionResult(response.data);
    } catch (error) {
      console.error('Error making Alzheimer prediction:', error);
    }
  };

  const handleMriPredictionSubmit = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-mri', formData);
      setMriPredictionResult(response.data);
    } catch (error) {
      console.error('Error making MRI prediction:', error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const q = query(
        collection(db, 'users'),
        where('name', '==', searchQuery)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const patientData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPatientDetails(patientData[0]);
      } else {
        setPatientDetails(null);
      }
    } catch (error) {
      console.error('Error searching patient:', error);
    }
  };

  const fetchPatientDetails = async (patientId) => {
    try {
      const docRef = doc(db, 'users', patientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPatientDetails(docSnap.data());
      } else {
        setPatientDetails(null);
      }
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };
  const handleNextMeetChange = (e) => {
    const { name, value } = e.target;
    setNextMeetData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextMeetSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'nextMeet', 'meetDetails'), nextMeetData);
      setNextMeet(nextMeetData);
      setShowNextMeetForm(false);
    } catch (error) {
      console.error('Error saving next meet details:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-lavender min-h-screen p-6 text-white">
      <header className="flex justify-between items-center bg-deepviolet shadow-md p-4 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <button
          onClick={() => auth.signOut()}
          className="bg-ultraviolet text-white px-4 py-2 rounded-md hover:bg-africanviolet"
        >
          Logout
        </button>
      </header>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-africanviolet shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Total Patients</h2>
          <p className="text-2xl text-periwinkle">{patients.length}</p>
        </div>
        {/* <div className="bg-africanviolet shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Next Meet</h2>
          {nextMeet ? (
            <div>
              <p className="text-periwinkle">
                <strong>Patient:</strong> {nextMeet.patient}
              </p>
              <p className="text-periwinkle">
                <strong>Date:</strong>{' '}
                {nextMeet.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-periwinkle">
                <strong>Reason:</strong> {nextMeet.reason}
              </p>
            </div>
          ) : (
            <p className="text-periwinkle">No upcoming meets</p>
          )}
        </div>
      </div> */}
      <div className="bg-africanviolet shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Next Meet</h2>
          {nextMeet ? (
            <div>
              <p className="text-periwinkle">
                <strong>Patient:</strong> {nextMeet.patient}
              </p>
              <p className="text-periwinkle">
                <strong>Date:</strong>{' '}
                {new Date(nextMeet.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-periwinkle">
                <strong>Reason:</strong> {nextMeet.reason}
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowNextMeetForm(true)}
              className="bg-ultraviolet text-white px-4 py-2 rounded hover:bg-africanviolet"
            >
              Schedule Next Meet
            </button>
          )}
          {showNextMeetForm && (
            <form onSubmit={handleNextMeetSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-periwinkle mb-2">Patient:</label>
                <input
                  type="text"
                  name="patient"
                  value={nextMeetData.patient}
                  onChange={handleNextMeetChange}
                  className="w-full p-2 border rounded bg-lavender text-deepviolet"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-periwinkle mb-2">Date:</label>
                <input
                  type="date"
                  name="date"
                  value={nextMeetData.date}
                  onChange={handleNextMeetChange}
                  className="w-full p-2 border rounded bg-lavender text-deepviolet"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-periwinkle mb-2">Reason:</label>
                <input
                  type="text"
                  name="reason"
                  value={nextMeetData.reason}
                  onChange={handleNextMeetChange}
                  className="w-full p-2 border rounded bg-lavender text-deepviolet"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-deepviolet text-white px-4 py-2 rounded hover:bg-ultraviolet"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowNextMeetForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
        </div>
  
      <div className="bg-africanviolet shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Search Patient</h2>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name"
            className="flex-1 p-2 border rounded-l-md bg-lavender text-deepviolet"
          />
          <button type="submit" className="bg-deepviolet text-white px-4 py-2 rounded-r-md hover:bg-ultraviolet">
            Search
          </button>
        </form>
        {patientDetails ? (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Patient Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Name:</strong> {patientDetails.name}</p>
                <p><strong>Email:</strong> {patientDetails.email}</p>
                <p><strong>Contact No:</strong> {patientDetails.contactNo}</p>
                <p><strong>Gender:</strong> {patientDetails.gender}</p>
                <p><strong>Education:</strong> {patientDetails.education}</p>
              </div>
              <div>
                <p><strong>Ethnicity:</strong> {patientDetails.ethnicity}</p>
                <p><strong>Race Category:</strong> {patientDetails.race_cat}</p>
                <p><strong>Apoe Allele Type:</strong> {patientDetails.Apoe_allele_type}</p>
                <p><strong>Imputed Genotype:</strong> {patientDetails.Imputed_genotype}</p>
                <p><strong>MMSE:</strong> {patientDetails.Mmse}</p>
              </div>
            </div>
            {patientDetails.mriScanUrl && (
              <div className="mt-4">
                <p><strong>MRI Scan:</strong></p>
                <a href={patientDetails.mriScanUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  View MRI Scan
                </a>
                <br />
                <a href={patientDetails.mriScanUrl} download className="text-blue-400 underline mt-2 inline-block">
                  Download MRI Scan
                </a>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-4 text-periwinkle">No patient found.</p>
        )}
      </div>
  
      {/* <div className="bg-africanviolet shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Patient List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-deepviolet text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t border-africanviolet">
                  <td className="p-4">{patient.name}</td>
                  <td className="p-4">{patient.email}</td>
                  <td className="p-4">
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => fetchPatientDetails(patient.id)}
                      className="bg-deepviolet text-white px-3 py-1 rounded hover:bg-ultraviolet"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="bg-africanviolet shadow-lg rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center bg-deepviolet p-4 rounded-lg mb-4">
          <div>
            <p className="text-periwinkle">
              View the list of all patients.
            </p>
          </div>
          <button
            onClick={() => setShowPatientList(!showPatientList)}
            className="bg-ultraviolet text-white px-4 py-2 rounded hover:bg-africanviolet"
          >
            {showPatientList ? "Hide List" : "View Patient List"}
          </button>
        </div>
        {showPatientList && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-deepviolet text-white">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-t border-africanviolet">
                    <td className="p-4">{patient.name}</td>
                    <td className="p-4">{patient.email}</td>
                    <td className="p-4">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => fetchPatientDetails(patient.id)}
                        className="bg-deepviolet text-white px-3 py-1 rounded hover:bg-ultraviolet"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  
      {/* <div className="bg-africanviolet shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 text-deepviolet">MRI Classification</h2>
        <ImageUpload onFileUpload={handleMriPredictionSubmit} />
        {mriPredictionResult && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-bold text-deepviolet">MRI Prediction Result:</h3>
            <p className="text-periwinkle">
              <strong>Class:</strong> {mriPredictionResult.class}
            </p>
            <p className="text-periwinkle">
              <strong>Confidence:</strong> {mriPredictionResult.confidence}
            </p>
          </div>
        )}
      </div> */}
      <div className="bg-africanviolet shadow-lg rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center bg-deepviolet p-4 rounded-lg mb-4">
          <div>
            <p className="text-periwinkle">
              Upload an MRI scan for classification. Make your decisions with the help of an AI model. 
            </p>
          </div>
          <button
            onClick={() => setShowMriClassification(!showMriClassification)}
            className="bg-ultraviolet text-white px-4 py-2 rounded hover:bg-africanviolet"
          >
            {showMriClassification ? "Hide Form" : "Classify MRI"}
          </button>
        </div>
        {showMriClassification && (
          <div>
            <ImageUpload onFileUpload={handleMriPredictionSubmit} />
            {mriPredictionResult && (
              <div className="mt-4 bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-bold text-deepviolet">MRI Prediction Result:</h3>
                <p className="text-periwinkle">
                  <strong>Class:</strong> {mriPredictionResult.class}
                </p>
                <p className="text-periwinkle">
                  <strong>Confidence:</strong> {mriPredictionResult.confidence}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
  
      <div className="bg-africanviolet shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 text-deepviolet">Alzheimer Prediction</h2>
        <div className="flex justify-between items-center bg-deepviolet p-4 rounded-lg mb-4">
          <div>
          <p className="text-periwinkle">
  Use this form to predict the likelihood of Alzheimer's based on patient data.
  The MMSE is a widely used tool to assess cognitive function and screen for dementia.
</p>
<ul className="text-periwinkle">
  <li><strong>Normal Cognition (24 and above):</strong> No signs of dementia; cognitive function is intact.</li>
  <li><strong>Mild Dementia (19–23):</strong> Early stage with slight memory and cognitive challenges.</li>
  <li><strong>Moderate Dementia (10–18):</strong> Noticeable impairments affecting daily activities.</li>
  <li><strong>Severe Dementia (9 and below):</strong> Significant cognitive decline requiring full-time care.</li>
</ul>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-ultraviolet text-white px-4 py-2 rounded hover:bg-africanviolet"
          >
            {showForm ? "Hide Form" : "Do Prediction"}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleAlzPredictionSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-periwinkle">Age:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              />
            </div>
            <div>
              <label className="block text-periwinkle">Gender:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              >
                <option value="">Select</option>
                <option value="PTGENDER_Male">Male</option>
                <option value="PTGENDER_Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-periwinkle">Years of Education:</label>
              <input
                type="number"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              />
            </div>
            <div>
              <label className="block text-periwinkle">Ethnicity:</label>
              <select
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              >
                <option value="">Select</option>
                <option value="PTETHCAT_Hisp/Latino">Hisp/Latino</option>
                <option value="PTETHCAT_Not Hisp/Latino">Not Hisp/Latino</option>
                <option value="PTETHCAT_Unknown">Unknown</option>
              </select>
            </div>
            <div>
              <label className="block text-periwinkle">Race Category:</label>
              <select
                name="race_cat"
                value={formData.race_cat}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              >
                <option value="">Select</option>
                <option value="PTRACCAT_White">White</option>
                <option value="PTRACCAT_Black">Black</option>
                <option value="PTRACCAT_Asian">Asian</option>
              </select>
            </div>
            <div>
              <label className="block text-periwinkle">APOE Allele Type:</label>
              <select
                name="apoe_allele_type"
                value={formData.apoe_allele_type}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              >
                <option value="">Select</option>
                <option value="APOE4_0">APOE4_0</option>
                <option value="APOE4_1">APOE4_1</option>
                <option value="APOE4_2">APOE4_2</option>
              </select>
            </div>
            <div>
              <label className="block text-periwinkle">APOE Genotype:</label>
              <select
                name="apoe_genotype"
                value={formData.apoe_genotype}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              >
                <option value="">Select</option>
                <option value="APOE Genotype_2,2">2,2</option>
                <option value="APOE Genotype_2,3">2,3</option>
                <option value="APOE Genotype_2,4">2,4</option>
                <option value="APOE Genotype_3,3">3,3</option>
                <option value="APOE Genotype_3,4">3,4</option>
                <option value="APOE Genotype_4,4">4,4</option>
              </select>
            </div>
            <div>
              <label className="block text-periwinkle">Imputed Genotype:</label>
              <select
                name="imputed_genotype"
                value={formData.imputed_genotype}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              >
                <option value="">Select</option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            </div>
            <div>
              <label className="block text-periwinkle">MMSE Score:</label>
              <input
                type="number"
                name="mmse"
                value={formData.mmse}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-lavender text-deepviolet"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-deepviolet text-white px-4 py-2 rounded hover:bg-ultraviolet"
            >
              Predict
            </button>
          </form>
        )}
        {alzPredictionResult && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-bold text-deepviolet">Prediction Result:</h3>
            <p className="text-periwinkle">
              <strong>Condition:</strong> {alzPredictionResult.condition}
            </p>
            <p className="text-periwinkle">
              <strong>Description:</strong> {alzPredictionResult.condition_description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
  

  // return (
  //   <div className="container mx-auto p-4">
  //     <div className="flex justify-between items-center mb-6">
  //       <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
  //       <button
  //         onClick={() => auth.signOut()}
  //         className="bg-red-500 text-white px-4 py-2 rounded"
  //       >
  //         Logout
  //       </button>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  //       <div className="bg-white p-4 rounded shadow">
  //         <h2 className="font-bold mb-2">Total Patients</h2>
  //         <p className="text-2xl">{patients.length}</p>
  //       </div>
  //     </div>

  //     <div className="bg-white rounded shadow mb-6">
  //       <h2 className="font-bold p-4 border-b">Search Patient</h2>
  //       <form onSubmit={handleSearch} className="p-4">
  //         <input
  //           type="text"
  //           value={searchQuery}
  //           onChange={(e) => setSearchQuery(e.target.value)}
  //           placeholder="Search by name"
  //           className="w-full p-2 border rounded mb-4"
  //         />
  //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
  //           Search
  //         </button>
  //       </form>
  //     </div>

      

  //     {patientDetails && (
  //       <div className="bg-white rounded shadow mb-6 p-4">
  //         <h2 className="font-bold mb-2">Patient Details</h2>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <p><strong>Name:</strong> {patientDetails.name}</p>
  //             <p><strong>Email:</strong> {patientDetails.email}</p>
  //             <p><strong>Contact No:</strong> {patientDetails.contactNo}</p>
  //             <p><strong>Gender:</strong> {patientDetails.gender}</p>
  //             <p><strong>Education:</strong> {patientDetails.education}</p>
  //           </div>
  //           <div>
  //             <p><strong>Ethnicity:</strong> {patientDetails.ethnicity}</p>
  //             <p><strong>Race Category:</strong> {patientDetails.race_cat}</p>
  //             <p><strong>Apoe Allele Type:</strong> {patientDetails.Apoe_allele_type}</p>
  //             <p><strong>Imputed Genotype:</strong> {patientDetails.Imputed_genotype}</p>
  //             <p><strong>MMSE:</strong> {patientDetails.Mmse}</p>
  //           </div>
  //         </div>
  //         {patientDetails.mriScanUrl && (
  //           <div className="mt-4">
  //             <p><strong>MRI Scan:</strong></p>
  //             <a href={patientDetails.mriScanUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
  //               View MRI Scan
  //             </a>
  //             <br />
  //             <a href={patientDetails.mriScanUrl} download className="text-blue-500 underline mt-2 inline-block">
  //               Download MRI Scan
  //             </a>
  //           </div>
  //         )}
  //       </div>
  //     )}

  //     <div className="bg-white rounded shadow">
  //       <h2 className="font-bold p-4 border-b">Patient List</h2>
  //       <div className="overflow-x-auto">
  //         <table className="w-full">
  //           <thead className="bg-gray-50">
  //             <tr>
  //               <th className="p-4 text-left">Name</th>
  //               <th className="p-4 text-left">Email</th>
  //               <th className="p-4 text-left">Joined Date</th>
  //               <th className="p-4 text-left">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {patients.map((patient) => (
  //               <tr key={patient.id} className="border-t">
  //                 <td className="p-4">{patient.name}</td>
  //                 <td className="p-4">{patient.email}</td>
  //                 <td className="p-4">
  //                   {new Date(patient.createdAt).toLocaleDateString()}
  //                 </td>
  //                 <td className="p-4">
  //                   <button
  //                     onClick={() => fetchPatientDetails(patient.id)}
  //                     className="bg-blue-500 text-white px-3 py-1 rounded"
  //                   >
  //                     View Details
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"> 
  //       {/* <div className="bg-white p-4 rounded shadow">
  //         <h2 className="font-bold mb-2">Total Patients</h2>
  //         <p className="text-2xl">{patients.length}</p>
  //        </div>  */}
  //       <div className="bg-white p-4 rounded shadow">
  //         <h2 className="font-bold mb-2">Next Meet</h2>
  //         {nextMeet ? (
  //           <div>
  //             <p>
  //               <strong>Patient:</strong> {nextMeet.patient}
  //             </p>
  //             <p>
  //               <strong>Date:</strong>{' '}
  //               {nextMeet.date.toLocaleDateString('en-US', {
  //                 weekday: 'long',
  //                 year: 'numeric',
  //                 month: 'long',
  //                 day: 'numeric',
  //               })}
  //             </p>
  //             <p>
  //               <strong>Reason:</strong> {nextMeet.reason}
  //             </p>
  //           </div>
  //         ) : (
  //           <p>No upcoming meets</p>
  //         )}
  //       </div>
  //     </div>

      
  //     <div className="bg-white rounded shadow p-6 mt-6">
  //       <h2 className="font-bold text-2xl mb-4 text-gray-800">MRI Classification</h2>
  //       <ImageUpload onFileUpload={handleMriPredictionSubmit} />
  //       {mriPredictionResult && (
  //         <div className="mt-4 bg-gray-50 p-4 rounded">
  //           <h3 className="text-lg font-bold text-gray-800">MRI Prediction Result:</h3>
  //           <p className="text-gray-700">
  //             <strong>Class:</strong> {mriPredictionResult.class}
  //           </p>
  //           <p className="text-gray-700">
  //             <strong>Confidence:</strong> {mriPredictionResult.confidence}
  //           </p>
  //         </div>
  //       )}
  //     </div>
  //     <div className="bg-white rounded shadow p-6 mt-6">
  //       <h2 className="font-bold text-2xl mb-4 text-gray-800">Alzheimer Prediction</h2>
  //       <form onSubmit={handleAlzPredictionSubmit} className="grid grid-cols-1 gap-4">
  //         <div>
  //           <label className="block text-gray-700">Age:</label>
  //           <input
  //             type="number"
  //             name="age"
  //             value={formData.age}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">Gender:</label>
  //           <select
  //             name="gender"
  //             value={formData.gender}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           >
  //             <option value="">Select</option>
  //             <option value="PTGENDER_Male">Male</option>
  //             <option value="PTGENDER_Female">Female</option>
  //           </select>
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">Years of Education:</label>
  //           <input
  //             type="number"
  //             name="education"
  //             value={formData.education}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">Ethnicity:</label>
  //           <select
  //             name="ethnicity"
  //             value={formData.ethnicity}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           >
  //             <option value="">Select</option>
  //             <option value="PTETHCAT_Hisp/Latino">Hisp/Latino</option>
  //             <option value="PTETHCAT_Not Hisp/Latino">Not Hisp/Latino</option>
  //             <option value="PTETHCAT_Unknown">Unknown</option>
  //           </select>
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">Race Category:</label>
  //           <select
  //             name="race_cat"
  //             value={formData.race_cat}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           >
  //             <option value="">Select</option>
  //             <option value="PTRACCAT_White">White</option>
  //             <option value="PTRACCAT_Black">Black</option>
  //             <option value="PTRACCAT_Asian">Asian</option>
  //           </select>
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">APOE Allele Type:</label>
  //           <select
  //             name="apoe_allele_type"
  //             value={formData.apoe_allele_type}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           >
  //             <option value="">Select</option>
  //             <option value="APOE4_0">APOE4_0</option>
  //             <option value="APOE4_1">APOE4_1</option>
  //             <option value="APOE4_2">APOE4_2</option>
  //           </select>
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">APOE Genotype:</label>
  //           <select
  //             name="apoe_genotype"
  //             value={formData.apoe_genotype}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           >
  //             <option value="">Select</option>
  //             <option value="APOE Genotype_2,2">2,2</option>
  //             <option value="APOE Genotype_2,3">2,3</option>
  //             <option value="APOE Genotype_2,4">2,4</option>
  //             <option value="APOE Genotype_3,3">3,3</option>
  //             <option value="APOE Genotype_3,4">3,4</option>
  //             <option value="APOE Genotype_4,4">4,4</option>
  //           </select>
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">Imputed Genotype:</label>
  //           <select
  //             name="imputed_genotype"
  //             value={formData.imputed_genotype}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           >
  //             <option value="">Select</option>
  //             <option value="True">True</option>
  //             <option value="False">False</option>
  //           </select>
  //         </div>

  //         <div>
  //           <label className="block text-gray-700">MMSE Score:</label>
  //           <input
  //             type="number"
  //             name="mmse"
  //             value={formData.mmse}
  //             onChange={handleChange}
  //             className="w-full p-2 border rounded"
  //             required
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           className="bg-blue-500 text-white px-4 py-2 rounded"
  //         >
  //           Predict
  //         </button>
  //       </form>

  //       {alzPredictionResult && (
  //         <div className="mt-4 bg-gray-50 p-4 rounded">
  //           <h3 className="text-lg font-bold text-gray-800">Prediction Result:</h3>
  //           <p className="text-gray-700">
  //             <strong>Condition:</strong> {alzPredictionResult.condition}
  //           </p>
  //           <p className="text-gray-700">
  //             <strong>Description:</strong> {alzPredictionResult.condition_description}
  //           </p>
  //         </div>
  //       )}
  //     </div>
      

  //   </div>

    
  // );
};

export default DoctorDashboard;
