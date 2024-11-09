import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { heading: "Employees", route: "/dashboard" },
    { heading: "Projects", route: "/dashboard/Projects" },
    { heading: "Boarding", route: "/dashboard/Boarding" },
    { heading: "Leave", route: "/dashboard/leave" },
    { heading: "Attendance", route: "/dashboard/attendance" },
    { heading: "Feedback", route: "/dashboard/feedback" },
    { heading: "Overview", route: "/dashboard/overview" },

];

const Navbar = () => {
    const location = useLocation();

    return (
        <div className="flex items-center justify-around bg-gray-100 p-4 font-poppins">
            {/* Employee Management System title */}
            <h1 className="text-xl font-semibold text-black">Employee Management System</h1>

            {/* Navigation Links */}
            <div className="flex space-x-4">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.route}
                        className={`px-4 py-2 rounded-md text-black no-underline ${location.pathname === item.route ? "bg-blue-200" : "hover:bg-gray-200"
                            }`}
                    >
                        {item.heading}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
