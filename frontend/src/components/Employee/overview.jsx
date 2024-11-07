import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [employeeCount] = useState(0);
  const [departmentCount] = useState(0);
  const [averageAge] = useState(0);
  const [ageRangeData] = useState([]);

  const totalOverviewData = {
    labels: ['Employees', 'Departments'],
    datasets: [
      {
        label: 'Total Count',
        data: [employeeCount, departmentCount],
        backgroundColor: ['#3f51b5', '#ff9800'],
        borderColor: ['#3f51b5', '#ff9800'],
        borderWidth: 1,
      },
    ],
  };

  const ageRangeChartData = {
    labels: Object.keys(ageRangeData),
    datasets: [
      {
        label: 'Employees per Age Range',
        data: Object.values(ageRangeData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const averageAgeChartData = {
    labels: ['Average Age'],
    datasets: [
      {
        label: 'Average Age of Employees',
        data: [parseFloat(averageAge)],
        backgroundColor: ['#8BC34A'],
        borderColor: ['#8BC34A'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>
        Overview Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Total Employees
              </Typography>
              <Typography variant="h4" textAlign="center">
                {employeeCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Average Age
              </Typography>
              <Typography variant="h4" textAlign="center">
                {averageAge}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Departments Count
              </Typography>
              <Typography variant="h4" textAlign="center">
                {departmentCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Total Overview</Typography>
              <Bar data={totalOverviewData} options={{ scales: { y: { beginAtZero: true, suggestedMax: 30 } } }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Employee Count by Age Range</Typography>
              <Bar data={ageRangeChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', backgroundColor: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Average Age of Employees</Typography>
              <Bar data={averageAgeChartData} options={{ scales: { y: { beginAtZero: true, suggestedMax: 100 } } }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
