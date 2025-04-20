import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // import useNavigate
import NavBar from '../components/NavBar';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    LineChart, Line, ResponsiveContainer
} from 'recharts';

function PatientScores() {
    const { wardName } = useParams();
    const navigate = useNavigate(); // hook for navigation
    const [quizScores, setQuizScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/ward/${wardName}`);
                setQuizScores(res.data.quizScores || []);
            } catch (err) {
                console.error('Error fetching quiz scores:', err);
                setQuizScores([]);
            } finally {
                setLoading(false);
            }
        };
        fetchScores();
    }, [wardName]);

    const chartData = quizScores.map(score => ({
        game: score.game,
        score: score.score,
        date: new Date(score.date).toLocaleDateString()
    }));



    return (
        <>
        <NavBar /> 
        <div style={{ padding: '20px' }}>
            <h2>Quiz Scores for {wardName}</h2>

            <div style={{ marginBottom: '20px' }}>
                <button
                    style={{ marginRight: '10px' }}
                    onClick={() => navigate(`/add-prescription/${wardName}`)}
                >
                    ➕ Add Prescription
                </button>
                <button onClick={() => navigate(`/view-prescription/${wardName}`)}>
                    📄 View Prescription
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : quizScores.length === 0 ? (
                <p>No quiz scores found.</p>
            ) : (
                <>
                    <ul>
                        {quizScores.map((score, i) => (
                            <li key={i}>
                                🧠 <strong>{score.game}</strong>: {score.score} pts — {new Date(score.date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>

                    <h3>📊 Bar Chart of Quiz Scores</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="game" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="score" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>

                    <h3>📈 Line Chart of Scores Over Time</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
        </>
    );
}

export default PatientScores;
