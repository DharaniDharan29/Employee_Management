import React from "react";
import Startbg from "../../assets/employe_ma.jpg";
import { Button } from "@/components/ui/button";
import Home from "../home/Home";
import { useNavigate } from "react-router-dom";

const HomeStart = () => {
  const navigate = useNavigate();
  const backgroundImageStyle = {
    backgroundImage: `url(${Startbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
  };
  return (
    <>
      <main>
        <div
          className="h-full font-poppins"
          id="bg"
          style={backgroundImageStyle}
        >
          
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-inter text-[8vh] font-bold w-[130vh] text-center leading-[10vh]">
            Employee Management
            </h1>
            {/* <Home /> */}
            <div className="flex justify-center items-center mt-10">
              <div className="bg-gradient-to-r p-2 rounded-lg">
                <Button
                  mode="modal"
                  onClick={()=>navigate('/dashboard')}
                  className="text-white font-semibold px-6 rounded-md transition duration-300 hover:opacity-90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeStart;
