import React from "react";
import logo from "../assets/saylani-logo.png";
import CityManagerTab from "@/components/tabs/ReceptionistTab.jsx";

const Receptionist = () => {
    return (
        <div className="w-full min-h-screen bg-amber-100 flex flex-col items-center py-10">
            {/* Logo with responsive sizing */}
            <img 
                src={logo} 
                alt="Saylani Logo" 
                className="w-32 sm:w-40 lg:w-48 mb-6" 
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Receptionist Dashboard
            </h1>

            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Adding a subtle card background to hold the tab content */}
                <div className="bg-white rounded-lg shadow-2xl p-8">
                    <CityManagerTab />
                </div>
            </div>
        </div>
    );
};

export default Receptionist;
