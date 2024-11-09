import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    email: "",
    mobileNumber: "",
    address: "",
    role: "",
    experience: "",
    online: false,
    linkedInId: "",
    githubId: "",
    maritalStatus: "",
    employeeId: "",
    gender: "",
    salary: "",
    dateOfBirth: "",
    department: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // State for storing validation errors

  const validateForm = () => {
    const newErrors = {};
    // Simple validation rules
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Prevent form submission if there are validation errors
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "photo") {
        formDataToSend.append("photo", formData.photo);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    // https://employee-management-backend-kjh6.onrender.com/api/users
    try {
      const response = await axios.post("http://localhost:4242/api/users", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User data submitted successfully!");
      // Reset form after submission
      var data = setFormData({
        name: "",
        photo: null,
        email: "",
        mobileNumber: "",
        address: "",
        role: "",
        experience: "",
        online: false,
        linkedInId: "",
        githubId: "",
        maritalStatus: "",
        employeeId: "",
        gender: "",
        salary: "",
        dateOfBirth: "",
        department: "",
        password: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting the form", error.response?.data || error.message);
      
      alert("Failed to submit the form");
      console.writeln(data);
    }
  };

  return (
    <div>
      

      <main>
        <form
          className="mx-auto mt-10 p-6 bg-white rounded shadow-md font-poppins"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1 className="text-2xl font-bold mb-10 text-center">Employee Information</h1>

          <section className="flex justify-center gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border rounded p-2 w-[70vh]"
                />
                {errors.name && <div className="text-red-500">{errors.name}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Employee Id</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
                {errors.employeeId && <div className="text-red-500">{errors.employeeId}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <div className="text-red-500">{errors.gender}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Designation</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
                {errors.role && <div className="text-red-500">{errors.role}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
                {errors.salary && <div className="text-red-500">{errors.salary}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
                {errors.email && <div className="text-red-500">{errors.email}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
                {errors.mobileNumber && <div className="text-red-500">{errors.mobileNumber}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
                {errors.dateOfBirth && <div className="text-red-500">{errors.dateOfBirth}</div>} {/* Error message */}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="border rounded p-2 w-[70vh]"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
                {errors.maritalStatus && <div className="text-red-500">{errors.maritalStatus}</div>} {/* Error message */}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  rows="3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">LinkedIn ID</label>
                <input
                  type="text"
                  name="linkedInId"
                  value={formData.linkedInId}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">GitHub ID</label>
                <input
                  type="text"
                  name="githubId"
                  value={formData.githubId}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-center mb-4">
            <Button type="submit" className="bg-blue-500 text-white">Submit</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddEmployee;