import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeData from "../Employee/EmployeeData";
import Sidebar from "../dashboard/Sidebar";
function Routing() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Sidebar />}>
          <Route path="/" element={<EmployeeData />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default Routing;
