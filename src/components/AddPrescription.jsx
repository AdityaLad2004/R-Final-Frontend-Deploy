import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

function AddPrescription() {
  const { wardName } = useParams();
  const [prescription, setPrescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prescription) return;

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/prescriptions`, {
        patientName: wardName,
        prescription,
      });
      alert('Prescription added!');
      navigate(`/view-prescription/${wardName}`);
    } catch (err) {
      console.error('Error adding prescription:', err);
      alert('Failed to add prescription');
    }
  };

  return (
    <>
    <NavBar />
    <div style={{ padding: '20px' }}>

      <h2>Add Prescription for {wardName}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          placeholder="Enter prescription"
          rows="5"
          cols="50"
          required
        />
        <br /><br />
        <button type="submit">Save Prescription</button>
      </form>
    </div>
    </>
  );
 
}

export default AddPrescription;
