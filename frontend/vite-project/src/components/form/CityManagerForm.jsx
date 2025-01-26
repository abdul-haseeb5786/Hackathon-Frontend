import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CityManagerForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    CNIC: "",
    name: "",
    contact: "",
    address: "",
    purpose: "",
  });

  // Input change handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    const { CNIC, name, contact, address, purpose } = formData;

    // CNIC Validation: Must be 13 digits
    const cnicRegex = /^[0-9]{13}$/;
    if (!cnicRegex.test(CNIC.trim())) {
      toast({
        title: "Invalid CNIC",
        description: "CNIC must be exactly 13 digits without spaces or special characters.",
        variant: "destructive",
      });
      return false;
    }

    // Ensure all other fields are filled
    if (!name || !contact || !address || !purpose) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Beneficiary Added",
        description: `Beneficiary ${formData.name} has been successfully registered!`,
      });

      // Reset the form
      setFormData({
        CNIC: "",
        name: "",
        contact: "",
        address: "",
        purpose: "",
      });
    }
  };

  return (
    <Card className="bg-white text-black shadow-lg border border-gray-300 w-full mx-auto">
      <CardHeader>
        <CardTitle>Register Beneficiaries</CardTitle>
        <CardDescription>Fill in the details below to register a new beneficiary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* CNIC Input */}
          <div>
            <label className="block text-sm font-semibold">CNIC</label>
            <input
              type="text"
              name="CNIC"
              value={formData.CNIC}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter CNIC (13 digits)"
            />
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter Name"
            />
          </div>

          {/* Contact Details Input */}
          <div>
            <label className="block text-sm font-semibold">Contact Details</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter Contact Details"
            />
          </div>

          {/* Address Input */}
          <div>
            <label className="block text-sm font-semibold">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter Address"
            />
          </div>

          {/* Purpose Input */}
          <div>
            <label className="block text-sm font-semibold">Purpose</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter Purpose"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-2 bg-black text-white hover:bg-gray-800"
        >
          Submit
        </button>
      </CardFooter>
    </Card>
  );
};

export default CityManagerForm;
