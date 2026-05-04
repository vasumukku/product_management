import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signin from "./pages/Signup";
import Sidebar from "./components/Sidebar"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/MainLayout" element={<MainLayout />}/> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} /> 
        <Route path="/products" element={<Products />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;