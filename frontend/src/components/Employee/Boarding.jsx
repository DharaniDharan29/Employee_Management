import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, Grid } from '@mui/material';
import axios from 'axios';

const EmployeeManagement = () => {
  const [isOnboarding, setIsOnboarding] = useState(null);

  const handleOnboardingClick = () => {
    setIsOnboarding(true);
  };

  const handleOffboardingClick = () => {
    setIsOnboarding(false);
  };

  return (
    <div>
      <Button onClick={handleOnboardingClick} variant="contained" color="primary">
        Onboarding
      </Button>
      <Button onClick={handleOffboardingClick} variant="contained" color="secondary" style={{ marginLeft: '1rem' }}>
        Offboarding
      </Button>

      {isOnboarding === null ? (
        <Typography variant="h6" style={{ marginTop: '2rem' }}>
          Please select an action: Onboarding or Offboarding.
        </Typography>
      ) : isOnboarding ? (
        <Onboarding />
      ) : (
        <Offboarding />
      )}
    </div>
  );
};

const Onboarding = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:4242/api/boarding", formData);
      console.log('Onboarding data submitted:', formData);
      alert("Boarding recorded successfully!");

      setFormData({
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("Failed to record boarding");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Onboarding New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ marginTop: '2rem' }}>
          <Button variant="contained" type="submit">
            Onboard Employee
          </Button>
        </Box>
      </form>
    </Container>
  );
};

const Offboarding = () => {
  const [employeeId, setEmployeeId] = useState('');

  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Offboarding employee with ID:', employeeId);
    setEmployeeId('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Offboarding Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee ID"
          value={employeeId}
          onChange={handleChange}
          fullWidth
          required
        />
        <Box sx={{ marginTop: '2rem' }}>
          <Button variant="contained" type="submit">
            Offboard Employee
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EmployeeManagement;
