import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Salary.css';

const Salary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/salaries');
        setSalaryData(response.data);
        console.log('Salary Data:', response.data); // Debugging line
      } catch (error) {
        console.error('Error fetching salary data:', error);
        setError('Failed to fetch salary data. Please try again.');
      }
    };

    fetchSalaryData();
  }, []);

  return (
    <div className="salary-page">
      <h1>Employee Salary Details</h1>
      {error && <div className="error-message">{error}</div>}
      {salaryData.length === 0 ? (
        <div>No salary records found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((record, index) => (
              <tr key={index}>
                <td>{record.employeeName}</td>
                <td>{new Date(record.checkInTime).toLocaleString()}</td>
                <td>{new Date(record.checkOutTime).toLocaleString()}</td>
                <td>{record.salary} rupees</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Salary;