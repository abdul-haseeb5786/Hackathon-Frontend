import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Admin from "./pages/Admin";
import Receptionist from "./pages/Receptionist";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/receptionist" element={<Receptionist />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}
