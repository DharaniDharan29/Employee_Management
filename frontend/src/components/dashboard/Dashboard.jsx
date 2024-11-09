import { UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import Navbar from "./Sidebar"; // Import Navbar component
import { useState, useEffect } from "react";

const Dashboard = () => {
    const { user } = useClerk();
    const [showAchievements, setShowAchievements] = useState(false);

    useEffect(() => {
        const hasShownAchievements = sessionStorage.getItem("hasShownAchievements");
        if (user && !hasShownAchievements) {
            setShowAchievements(true);
            sessionStorage.setItem("hasShownAchievements", "true");
        }
    }, [user]);

    return (
        <div>
            <Navbar />

            <div className="font-poppins pt-6 px-10">
                <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-medium">
                        Welcome {user.firstName}!
                    </h4>
                    <UserButton />
                </div>

                {/* {showAchievements && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
                        <h5 className="text-lg font-semibold">Your Achievements</h5>
                        <p className="text-gray-700">Here are some recent achievements...</p>
                    </div>
                )} */}
            </div>

            <div className="m-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
