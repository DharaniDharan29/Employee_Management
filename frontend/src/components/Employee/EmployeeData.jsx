import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const EmployeeData = () => {
  const [position, setPosition] = useState("bottom");
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setemail] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:4242/Em/employee-fetch"
        );
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = async (e) => {
    const filterName = e.target.value.toLowerCase();

    if (filterName === "") {
      e.preventDefault();
    } else {
      const filteredData = employees.filter((employee) => {
        return employee.name.toLowerCase().includes(filterName);
      });
      setEmployees(filteredData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipient,subject,text);
    try {
      const res = await axios.post("http://localhost:4242/api/send-email", {
        recipient,
        subject,
        text,
      });
      setResponse(res.data.message || "Email sent successfully");
      toast.success("Custom Success Message", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      setResponse("Error sending email");
    }
  };

  return (
    <div>
      <div className="text-left flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-poppins">Employee</h1>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
            <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Frontend Developer
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Backend Developer
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                UI/UX Designer
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Database Manager
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
              Cyber Security   
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      
      <div className="flex justify-between mt-5">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search"
            className="w-72"
            onChange={handleSearchChange}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort by</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="top">
                  Experience
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Age
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button
          className="px-5 py-2 rounded-lg bg-violet-600 text-white font-poppins"
          onClick={() => navigate("/add-employee")}
        >
          Create Employee
        </button>
      </div>      
      <ToastContainer />
    </div>
  );
};

export default EmployeeData;
