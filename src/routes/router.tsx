import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";

export const Router = () => {
  return (
    <AuthProvider>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </AuthProvider>
  );
};
