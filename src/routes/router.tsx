import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
};
