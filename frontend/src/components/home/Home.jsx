import { SignInButton, useClerk } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const { setSession } = useClerk(); 

  const handleSignIn = async () => {
    
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-lg">
        <SignInButton mode="modal" onClick={handleSignIn} className="text-white font-semibold px-6 rounded-md transition duration-300 hover:opacity-90">
          Get Started
        </SignInButton>
      </div>
    </div>
  );
};

export default Home;
