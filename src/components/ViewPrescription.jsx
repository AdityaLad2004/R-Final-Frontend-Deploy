import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

function ViewPrescription() {
  const { wardName } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/prescriptions?patientName=${wardName}`);
        setPrescriptions(res.data);
      } catch (err) {
        console.error('Error fetching prescriptions:', err);
        alert('Error loading prescriptions');
      }
    };
    fetchPrescriptions();
  }, [wardName]);

  return (
    <>
    <NavBar />
    <div style={{ padding: '20px' }}>

      <h2>Prescriptions for {wardName}</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <ul>
          {prescriptions.map((presc, idx) => (
            <li key={idx}>
              💊 {presc.prescription}
            </li>
          ))}
        </ul>
      )}
      <br />
    </div>
    </>
  );
}

export default ViewPrescription;
