import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import './Leave.css'; // Import the separate CSS file

const LeaveApplication = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    comments: "",
  });

  const [errors, setErrors] = useState({}); // State for storing validation errors

  const validateForm = () => {
    const newErrors = {};
    // Simple validation rules
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.leaveType) newErrors.leaveType = "Leave type is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (new Date(formData.startDate) > new Date(formData.endDate)) newErrors.dateRange = "End date must be after start date";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent form submission if there are validation errors
    }

    try {
      const response = await axios.post("http://localhost:4242/api/leaves", formData);
      alert("LeaveApplication recorded successfully!");

    // Reset form after submission
      setFormData({
        employeeId: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
        comments: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting the form", error.response?.data || error.message);
      alert("Failed to submit the form");
    }
  };

  return (
    <div>
      

      <main>
        <form
          className="leave-application-form"
          onSubmit={handleSubmit}
        >
          <h1 className="form-title">Leave Application</h1>

          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="form-input"
            />
            {errors.employeeId && <div className="error">{errors.employeeId}</div>}
          </div>

          <div className="form-group">
            <label>Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="" disabled>Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="vacation">Vacation Leave</option>
              <option value="personal">Personal Leave</option>
            </select>
            {errors.leaveType && <div className="error">{errors.leaveType}</div>}
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="form-input"
            />
            {errors.startDate && <div className="error">{errors.startDate}</div>}
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-input"
            />
            {errors.endDate && <div className="error">{errors.endDate}</div>}
            {errors.dateRange && <div className="error">{errors.dateRange}</div>}
          </div>

          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-submit">
            <Button type="submit" className="submit-button">Submit</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LeaveApplication;
