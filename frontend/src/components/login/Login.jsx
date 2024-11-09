import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import EmployeeData from '../Employee/EmployeeData';
import Projects from '../Employee/Projects';
import AddEmployee from '../Employee/AddEmployee';
import Leave from '../Employee/leave';
import Attendance from '../Employee/Attendance';
import Overview from '../Employee/overview';
import Feedback from '../Employee/feedback';
import Boarding from '../Employee/Boarding';

// Custom Error Component
function ErrorPage() {
  return <div>Oops! The page you’re looking for doesn’t exist.</div>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
        errorElement={<ErrorPage />} // Set custom error element
      >
        <Route path="/dashboard" element={<EmployeeData />} />
        <Route path="/dashboard/Projects" element={<Projects />} />
        <Route path="/dashboard/leave" element={<Leave />} />
        <Route path="/dashboard/overview" element={<Overview />} />
        <Route path="/dashboard/attendance" element={<Attendance />} />
        <Route path="/dashboard/feedback" element={<Feedback />} />
        <Route path="/dashboard/Boarding" element={<Boarding />} />

      </Route>

      <Route path="/add-employee" element={<AddEmployee />} />
    </>
  )
);

function Login() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Login;
