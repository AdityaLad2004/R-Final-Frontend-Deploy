import './App.css';
import './styles/HomePage.css';
import './styles/parent.css';
import './styles/RegisterPage.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.js';
import React, { useState } from 'react';
import PatientDetails from './components/PatientDetails';
import Parent from './pages/Parent';  // This imports the component
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import NumbersQuiz from './components/NumberQuiz.jsx';
import InteractionQuiz from './components/InteractionQuiz.jsx';
import ObjectsQuiz from './components/ObjectQuiz.jsx';
import Doctor from './pages/Doctor.jsx';

import PatientScores from './components/PatientScores.jsx';
import AddPrescription from './components/AddPrescription.jsx';
import ViewPrescription from './components/ViewPrescription.jsx';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      {/* <- stays on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/parent" element={<Parent user={user} />} />
        <Route path="/doctor" element={<Doctor user={user} />} />
        <Route path="/numbers-quiz" element={<NumbersQuiz user={user} />} />
        <Route path="/interaction-quiz" element={<InteractionQuiz user={user} />} />
        <Route path="/object-quiz" element={<ObjectsQuiz user={user} />} />
      

        <Route path="/dashboard" element={<Parent />} />
        <Route path="/patient/:name" element={<PatientDetails user={user} />} />


        {/* Games routes */}

        <Route path="/patient-scores/:wardName" element={<PatientScores />} />
        <Route path="/add-prescription/:wardName" element={<AddPrescription />} />
        <Route path="/view-prescription/:wardName" element={<ViewPrescription/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;