import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FindJobPage from "./pages/FindJobPage";
import JobDetails from "./pages/JobDetails";

function App() {
  console.log("App rendered");
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-job" element={<FindJobPage />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
