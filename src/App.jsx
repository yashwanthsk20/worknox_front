import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import Home from "./home/Home";
import Admission from "./admission/Admission";
import Admin from "./admin/Admin";


import About from "./about/About";
import Courses from "./courses/Courses";
import AdminDashboard from "./components/AdminDashboard";
import AdmissionsTable from "./components/AdmissionsTable";
import UpdatesManager from "./components/UpdatesManager";

import AdminLayout from "./components/AdminLayout"; // ✅ import layout
import LatestNews from "./latest/LatestUpdate";

const Layout = () => {
  const location = useLocation();

  // Paths where Header and Footer should be hidden
  const hideLayout = [
    "/signin",
    "/admin",
    "/adminupdates",
    "/admindash",
    "/admintable",
    "/adminupdate",
    "/dash",
    "/deadline",
    "/sidebar"
  ];  

  const shouldHide = hideLayout.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Header />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/admin" element={<Admin />} />
        
       
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/latest" element={<LatestNews/>}/>

        {/* Admin routes wrapped in AdminLayout */}
        <Route
          path="/admindash"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admintable"
          element={
            <AdminLayout>
              <AdmissionsTable />
            </AdminLayout>
          }
        />
        <Route
          path="/adminupdate"
          element={
            <AdminLayout>
              <UpdatesManager />
            </AdminLayout>
          }
        />
      
        {/* <Route
          path="/deadline"
          element={
            <AdminLayout>
              <DeadlinesManager />
            </AdminLayout>
          }
        />
        <Route
          path="/sidebar"
          element={
            <AdminLayout>
              <Sidebar />
            </AdminLayout>
          }
        /> */}
      </Routes>

      {!shouldHide && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
