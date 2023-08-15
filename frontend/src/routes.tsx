import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Signin";
import MainLayout from "./layout/Layout";
import Dashboard from "./components/Dashboard";

const RoutesRoot = () => {
  const auth = {
    user: null,
  };
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Login />} />
      {!auth.user && (
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      )}
    </Routes>
  );
};

export default RoutesRoot;
