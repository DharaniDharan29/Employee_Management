import React from "react";

const projects = [
  {
    title: "Transport Management",
    description: "A transport management system that optimizes logistics and fleet operations by providing real-time tracking, route planning, and data analytics to enhance efficiency, reduce costs, and improve service delivery in transportation and delivery services.",
    image: "https://media.istockphoto.com/id/1250153450/photo/transport-and-logistic-concept-manager-and-engineer-checking-and-controlling-logistic-network.jpg?s=612x612&w=0&k=20&c=Ud7uauuaiStsQOU8f3Nxz74y6x_h1-4PuyMkAHN0GWE=",
    link: "https://github.com/DharaniDharan29/Transport_Management",
  },
  {
    title: "SUPERMARKET STOCK MANAGEMENT SYSTEM",
    description: "A supermarket stock management system that streamlines inventory tracking, order management, and supplier coordination, enabling efficient restocking, reducing wastage, and ensuring optimal product availability for enhanced customer satisfaction and operational efficiency.",
    image: "https://www.shutterstock.com/image-photo/supermarket-aisle-empty-red-shopping-260nw-1688252332.jpg",
    link: "https://github.com/DharaniDharan29/SUPERMARKET_STOCK_MANAGEMENT_SYSTEM",
  },
  {
    title: "Travel Planner",
    description: "A travel planner app that provides personalized itineraries, real-time updates, and destination insights to streamline and enhance the travel experience.",
    image: "https://practicalwanderlust.com/wp-content/uploads/2017/02/How-to-Plan-a-Trip-Travel-Planning-Tips.jpg",
    link: "#",
  },
];

const Projects = () => {
  return (
    <div >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Company Projects</h2>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
