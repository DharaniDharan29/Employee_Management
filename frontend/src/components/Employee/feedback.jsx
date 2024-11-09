import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Rating, Grid } from '@mui/material';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (e, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async(e) => {
    try {
      const response = await axios.post("http://localhost:4242/api/feedback", formData);
      e.preventDefault();
      console.log('Feedback submitted:', formData);
      setFormData({ name: '', email: '', rating: 0, comments: '' });
      alert('Thank you for your feedback!');
    } catch (error) {
      console.error("Error submitting the feedback", error);
      alert("Failed to record feedback");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: 'auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Feedback Form
      </Typography>

      <TextField
        label="Name"
        name="name"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
      />

      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="body1">Rating:</Typography>
        <Rating
          name="rating"
          value={formData.rating}
          onChange={handleRatingChange}
          precision={0.5}
        />
      </Grid>

      <TextField
        label="Comments"
        name="comments"
        variant="outlined"
        value={formData.comments}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Feedback
      </Button>
    </Box>
  );
};

export default FeedbackForm;
