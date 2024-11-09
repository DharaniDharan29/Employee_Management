// Attendance.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import './Attendance.css'; // Import your CSS file for styling

const Attendance = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    status: "Present", // Default status
  });
  
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.date) newErrors.date = "Date is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4242/api/attendance", formData);
      alert("Attendance recorded successfully!");
      fetchAttendanceRecords(); // Refresh attendance records
      setFormData({ employeeId: "", date: "", status: "Present" }); // Reset form
      setErrors({});
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("Failed to record attendance");
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get("http://localhost:4242/api/attendance");
      setAttendanceRecords(response.data);
      filterLeaveRecords(response.data); // Filter leaves after fetching
    } catch (error) {
      console.error("Error fetching attendance records", error);
    }
  };

  const filterLeaveRecords = (records) => {
    const filteredLeaves = records.filter(record => 
      record.status === "Leave" && 
      new Date(record.date).getMonth() === new Date(selectedMonth).getMonth() &&
      new Date(record.date).getFullYear() === new Date(selectedMonth).getFullYear()
    );
    setLeaveRecords(filteredLeaves);
  };

  useEffect(() => {
    fetchAttendanceRecords(); // Fetch records when component mounts
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      filterLeaveRecords(attendanceRecords); // Re-filter leaves when month changes
    }
  }, [selectedMonth, attendanceRecords]);

  return (
    <div className="attendance-container">
      <h1>Mark Attendance</h1>
      <form onSubmit={handleSubmit} className="attendance-form">
        <input
          type="text"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
          className="input-field"
        />
        {errors.employeeId && <div className="error">{errors.employeeId}</div>}

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input-field"
        />
        {errors.date && <div className="error">{errors.date}</div>}

        <div className="status-options">
          <label>
            <input
              type="radio"
              name="status"
              value="Present"
              checked={formData.status === "Present"}
              onChange={handleChange}
            />
            <span className="like-button">👍 Present</span>
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="Absent"
              checked={formData.status === "Absent"}
              onChange={handleChange}
            />
            <span className="like-button">👎 Absent</span>
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="Leave"
              checked={formData.status === "Leave"}
              onChange={handleChange}
            />
            <span className="like-button">Permission</span>
          </label>
        </div>

        <button type="submit" className="submit-button">Submit Attendance</button>
      </form>

      
    </div>
  );
};

export default Attendance;
