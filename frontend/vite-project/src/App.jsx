import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Admin from "./pages/Admin";
import CityManager from "./pages/Receptionist";

export default function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/receptionist" element={<CityManager />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}
