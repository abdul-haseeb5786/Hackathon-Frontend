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

const BeneficiaryRegisterForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    contact: "",
    address: "",
    purpose: "",
    department: "",
    status: "Pending", // Default status
    remarks: "",
    date: "", // New Date Field
  });
  

  // Input change handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    const { cnic, name, contact, address, purpose, department } = formData;

    // CNIC Validation: Must be 13 digits
    const cnicRegex = /^[0-9]{13}$/;
    if (!cnicRegex.test(cnic.trim())) {
      toast({
        title: "Invalid CNIC",
        description: "CNIC must be exactly 13 digits without spaces or special characters.",
        variant: "destructive",
      });
      return false;
    }

    // Ensure all other fields are filled
    if (!name || !contact || !address || !purpose || !department) {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/beneficiary/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        let result;
        try {
          result = await response.json();
        } catch (jsonError) {
          throw new Error("Invalid JSON response from server");
        }
  
        if (response.ok) {
          console.log("Submitting Form Data:", formData);

          toast({
            title: "Beneficiary Added",
            description: result.message || "Successfully registered!",
          });
  
          // Reset form
          setFormData({
            cnic: "",
            name: "",
            contact: "",
            address: "",
            purpose: "",
            department: "",
            status: "Pending",
            remarks: "",
          });
        } else {
          console.log("Submitting Form Data:", formData);
          throw new Error(result.message || "An error occurred");
        }
      } catch (error) {
        console.log("Submitting Form Data:", formData);

        toast({
          title: "Server Error",
          description: error.message || "Something went wrong, please try again later.",
          variant: "destructive",
        });
      }
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
              name="cnic"
              value={formData.cnic}
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
          {/* Date Input */}
<div>
  <label className="block text-sm font-semibold">Date</label>
  <input
    type="date"
    name="date"
    value={formData.date}
    onChange={handleInputChange}
    className="w-full p-2 border border-gray-300 bg-white text-black"
    placeholder="Select Date"
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

          {/* Department Input */}
          <div>
            <label className="block text-sm font-semibold">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter Department"
            />
          </div>

          {/* Status Input */}
          <div>
            <label className="block text-sm font-semibold">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Remarks Input */}
          <div>
            <label className="block text-sm font-semibold">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter Remarks (Optional)"
            />
          </div>

          {/* Submit Button */}
          <CardFooter>
            <button
              type="submit"
              className="w-full p-2 bg-black text-white hover:bg-gray-800"
            >
              Submit
            </button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default BeneficiaryRegisterForm;
