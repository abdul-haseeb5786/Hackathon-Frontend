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

const UserForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    CNIC: "",
    name: "",
    contact: "",
    email: "",
    address: "",
    purpose: "",
    role: "",
    city: "",
    country: "",
    dateCreated: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCNICChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,13}$/.test(value)) {
      setFormData({ ...formData, CNIC: value });
      setError("");
    } else {
      setError("CNIC must be exactly 11 digits.");
    }
  };

  const validateForm = () => {
    const { CNIC, name, contact, email, address, purpose, role, city, country, dateCreated } =
      formData;
    if (!CNIC || !name || !contact || !email || !address || !purpose || !role || !city || !country || !dateCreated) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "User Registered",
        description: `Beneficiary ${formData.name} has been successfully registered!`,
      });
      setFormData({
        CNIC: "",
        name: "",
        contact: "",
        email: "",
        address: "",
        purpose: "",
        role: "",
        city: "",
        country: "",
        dateCreated: "",
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white text-black shadow-lg border border-gray-300 w-full mx-auto">
      <CardHeader>
        <CardTitle>Register Users</CardTitle>
        <CardDescription>Fill in the details below to register a new beneficiary.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">CNIC</label>
              <input
                type="number"
                name="CNIC"
                value={formData.CNIC}
                onChange={handleCNICChange}
                className="w-full p-2 border border-gray-300 bg-white text-black"
                placeholder="Enter CNIC"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
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
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold">Contact Details</label>
              <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 bg-white text-black"
                placeholder="Enter Contact Details"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 bg-white text-black"
                placeholder="Enter Email"
              />
            </div>
          </div>
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
          <div>
            <label className="block text-sm font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter City"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
              placeholder="Enter Country"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
            >
              <option value="">Select a role</option>
              <option value="receptionist">Receptionist</option>
              <option value="department-staff">Department Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Date Created</label>
            <input
              type="date"
              name="dateCreated"
              value={formData.dateCreated}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 bg-white text-black"
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

export default UserForm;
